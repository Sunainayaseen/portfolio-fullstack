import json
from pathlib import Path

from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_mysqldb import MySQL

app = Flask(__name__)
CORS(app)

# MySQL Configuration – sahi password daalo, warna fallback me JSON me save hoga
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'Yaseen123@'
app.config['MYSQL_DB'] = 'portfolio_db'

mysql = MySQL(app)

DATA_DIR = Path(__file__).resolve().parent / "data"
CONTACTS_FILE = DATA_DIR / "contacts.json"


def save_contact_to_json(name, email, subject, message):
    DATA_DIR.mkdir(exist_ok=True)
    data = []
    if CONTACTS_FILE.exists():
        with open(CONTACTS_FILE, encoding="utf-8") as f:
            data = json.load(f)
    data.append({"name": name, "email": email, "subject": subject, "message": message})
    with open(CONTACTS_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)


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
def contact():
    if request.method == "GET":
        return jsonify({"message": "Use POST with JSON: name, email, message (optional: subject)"})

    data = request.get_json(silent=True) or {}
    name = data.get("name", "")
    email = data.get("email", "")
    subject = data.get("subject", "")
    message = data.get("message", "")

    if not name or not email or not message:
        return jsonify({"error": "Name, email and message are required"}), 400

    try:
        cur = mysql.connection.cursor()
        cur.execute(
            """
            INSERT INTO contact_messages (name, email, subject, message)
            VALUES (%s, %s, %s, %s)
            """,
            (name, email, subject, message),
        )
        mysql.connection.commit()
        cur.close()
        return jsonify({"status": "success", "msg": "Saved to database!"}), 201
    except Exception:
        save_contact_to_json(name, email, subject, message)
        return jsonify({"status": "success", "msg": "Message received! (Saved locally – MySQL not connected)"}), 201


if __name__ == "__main__":
    app.run(debug=True, port=5000)
