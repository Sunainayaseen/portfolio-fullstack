import json
import logging
import os
import re
import smtplib
from email.message import EmailMessage
from logging.handlers import RotatingFileHandler
from pathlib import Path

from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"
CONTACTS_FILE = DATA_DIR / "contacts.json"
LOG_DIR = BASE_DIR / "logs"

LOG_DIR.mkdir(exist_ok=True)
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[
        RotatingFileHandler(LOG_DIR / "app.log", maxBytes=1_000_000, backupCount=3),
        logging.StreamHandler(),
    ],
)
logger = logging.getLogger("portfolio-backend")

app = Flask(__name__)

ALLOWED_ORIGINS = [
    o.strip() for o in os.environ.get("ALLOWED_ORIGINS", "").split(",") if o.strip()
] or "*"
CORS(app, origins=ALLOWED_ORIGINS)

limiter = Limiter(get_remote_address, app=app, storage_uri="memory://")

CONTACT_RATE_LIMIT = os.environ.get("CONTACT_RATE_LIMIT", "5 per hour")

# --- MySQL (optional) ---
MYSQL_HOST = os.environ.get("MYSQL_HOST")
MYSQL_USER = os.environ.get("MYSQL_USER")
MYSQL_PASSWORD = os.environ.get("MYSQL_PASSWORD")
MYSQL_DB = os.environ.get("MYSQL_DB")

mysql = None
if MYSQL_HOST and MYSQL_USER and MYSQL_DB:
    try:
        from flask_mysqldb import MySQL

        app.config["MYSQL_HOST"] = MYSQL_HOST
        app.config["MYSQL_USER"] = MYSQL_USER
        app.config["MYSQL_PASSWORD"] = MYSQL_PASSWORD or ""
        app.config["MYSQL_DB"] = MYSQL_DB
        mysql = MySQL(app)
    except Exception:
        logger.exception("MySQL configured but failed to initialize; will use JSON fallback")

# --- SMTP / email ---
SMTP_HOST = os.environ.get("SMTP_HOST")
SMTP_PORT = int(os.environ.get("SMTP_PORT", "587"))
SMTP_USER = os.environ.get("SMTP_USER")
SMTP_PASSWORD = os.environ.get("SMTP_PASSWORD")
OWNER_EMAIL = os.environ.get("OWNER_EMAIL", SMTP_USER)
MAIL_FROM_NAME = os.environ.get("MAIL_FROM_NAME", "Portfolio Contact Form")

EMAIL_ENABLED = bool(SMTP_HOST and SMTP_USER and SMTP_PASSWORD and OWNER_EMAIL)
if not EMAIL_ENABLED:
    logger.warning("SMTP not fully configured — emails will NOT be sent (submissions still stored).")

EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")

NAME_MAX = 100
SUBJECT_MAX = 150
MESSAGE_MIN = 10
MESSAGE_MAX = 5000


def validate_contact_payload(data):
    """Return (errors dict, cleaned dict). errors is empty if valid."""
    errors = {}

    name = (data.get("name") or "").strip()
    email = (data.get("email") or "").strip()
    subject = (data.get("subject") or "").strip()
    message = (data.get("message") or "").strip()

    if not name:
        errors["name"] = "Name is required."
    elif len(name) > NAME_MAX:
        errors["name"] = f"Name must be {NAME_MAX} characters or fewer."

    if not email:
        errors["email"] = "Email is required."
    elif not EMAIL_RE.match(email):
        errors["email"] = "Enter a valid email address."

    if subject and len(subject) > SUBJECT_MAX:
        errors["subject"] = f"Subject must be {SUBJECT_MAX} characters or fewer."

    if not message:
        errors["message"] = "Message is required."
    elif len(message) < MESSAGE_MIN:
        errors["message"] = f"Message must be at least {MESSAGE_MIN} characters."
    elif len(message) > MESSAGE_MAX:
        errors["message"] = f"Message must be {MESSAGE_MAX} characters or fewer."

    cleaned = {
        "name": name,
        "email": email,
        "subject": subject or f"New message from {name or 'website visitor'}",
        "message": message,
    }
    return errors, cleaned


def save_contact_to_json(entry):
    DATA_DIR.mkdir(exist_ok=True)
    data = []
    if CONTACTS_FILE.exists():
        try:
            with open(CONTACTS_FILE, encoding="utf-8") as f:
                data = json.load(f)
        except (json.JSONDecodeError, OSError):
            logger.exception("Could not read existing contacts.json, starting fresh")
            data = []
    data.append(entry)
    with open(CONTACTS_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)


def save_contact_to_db(entry):
    if mysql is None:
        return False
    cur = mysql.connection.cursor()
    try:
        cur.execute(
            """
            INSERT INTO contact_messages (name, email, subject, message)
            VALUES (%s, %s, %s, %s)
            """,
            (entry["name"], entry["email"], entry["subject"], entry["message"]),
        )
        mysql.connection.commit()
        return True
    finally:
        cur.close()


def send_email(to_addr, subject, body, reply_to=None):
    msg = EmailMessage()
    msg["Subject"] = subject
    msg["From"] = f"{MAIL_FROM_NAME} <{SMTP_USER}>"
    msg["To"] = to_addr
    if reply_to:
        msg["Reply-To"] = reply_to
    msg.set_content(body)

    with smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=15) as server:
        server.starttls()
        server.login(SMTP_USER, SMTP_PASSWORD)
        server.send_message(msg)


def send_contact_emails(entry):
    """Send notification to owner + confirmation to visitor. Returns True if both attempts didn't raise."""
    owner_body = (
        f"New contact form submission\n\n"
        f"Name: {entry['name']}\n"
        f"Email: {entry['email']}\n"
        f"Subject: {entry['subject']}\n\n"
        f"Message:\n{entry['message']}\n"
    )
    send_email(
        OWNER_EMAIL,
        f"[Portfolio Contact] {entry['subject']}",
        owner_body,
        reply_to=entry["email"],
    )

    visitor_body = (
        f"Hi {entry['name']},\n\n"
        f"Thanks for reaching out! I've received your message and will get back to you as soon as possible.\n\n"
        f"For your records, here's what you sent:\n"
        f"Subject: {entry['subject']}\n"
        f"Message: {entry['message']}\n\n"
        f"Best,\nSunaina Yaseen"
    )
    send_email(
        entry["email"],
        "Thanks for reaching out — Sunaina Yaseen",
        visitor_body,
    )


@app.route("/")
@app.route("/api")
def api_list():
    return jsonify({
        "message": "Portfolio Backend API",
        "endpoints": [
            {"url": "/api/contact", "method": "POST", "description": "Submit contact form"},
        ],
    })


@app.route("/api/contact", methods=["GET", "POST"])
@limiter.limit(lambda: CONTACT_RATE_LIMIT, methods=["POST"])
def contact():
    if request.method == "GET":
        return jsonify({"message": "Use POST with JSON: name, email, message (optional: subject)"})

    data = request.get_json(silent=True) or {}

    # Honeypot: bots fill hidden fields, humans never see them.
    if (data.get("website") or "").strip():
        logger.info("Honeypot triggered — silently dropping submission from %s", get_remote_address())
        return jsonify({"status": "success", "msg": "Message received!"}), 201

    errors, cleaned = validate_contact_payload(data)
    if errors:
        return jsonify({"status": "error", "errors": errors}), 400

    stored_in_db = False
    try:
        stored_in_db = save_contact_to_db(cleaned)
    except Exception:
        logger.exception("Failed to save contact submission to MySQL; falling back to JSON")

    if not stored_in_db:
        try:
            save_contact_to_json(cleaned)
        except Exception:
            logger.exception("Failed to save contact submission to JSON fallback")
            return jsonify({"status": "error", "errors": {"_global": "Could not save your message. Please try again later."}}), 500

    email_sent = False
    if EMAIL_ENABLED:
        try:
            send_contact_emails(cleaned)
            email_sent = True
        except Exception:
            logger.exception("Failed to send contact emails for submission from %s", cleaned["email"])

    logger.info(
        "Contact form submitted: name=%r email=%r stored_in_db=%s email_sent=%s",
        cleaned["name"], cleaned["email"], stored_in_db, email_sent,
    )

    return jsonify({
        "status": "success",
        "msg": "Message received! I'll get back to you soon." if email_sent else "Message received and saved!",
    }), 201


@app.errorhandler(429)
def ratelimit_handler(e):
    return jsonify({
        "status": "error",
        "errors": {"_global": "Too many requests. Please try again later."},
    }), 429


if __name__ == "__main__":
    app.run(debug=os.environ.get("FLASK_DEBUG", "false").lower() == "true", port=int(os.environ.get("PORT", "5000")))
