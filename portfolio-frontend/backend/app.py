"""
Flask backend for portfolio-frontend.
Run: python app.py  (from backend folder)
"""
import json
import os
from pathlib import Path

from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

DATA_DIR = Path(__file__).resolve().parent / "data"
CONTACTS_FILE = DATA_DIR / "contacts.json"
PROJECTS_FILE = DATA_DIR / "projects.json"


def ensure_data_dir():
    DATA_DIR.mkdir(exist_ok=True)
    for f in (CONTACTS_FILE, PROJECTS_FILE):
        if not f.exists():
            f.write_text("[]", encoding="utf-8")


def read_json(path):
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def write_json(path, data):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)


@app.route("/")
@app.route("/api")
def api_list():
    return jsonify({
        "message": "Portfolio Backend API",
        "endpoints": [
            {"url": "/api", "method": "GET", "description": "List all APIs"},
            {"url": "/api/contact", "method": "POST", "body": "name, email, message"},
            {"url": "/api/projects", "method": "GET", "description": "Fetch all projects"},
            {"url": "/api/projects", "method": "POST", "body": "title, description, imageUrl"},
        ],
    })


@app.route("/api/contact", methods=["GET", "POST"])
def contact():
    if request.method == "GET":
        return jsonify({
            "message": "Contact API – use POST to submit (name, email, message). Opening in browser sends GET, so use the React form or Postman to test POST.",
        })
    ensure_data_dir()
    data = request.get_json(silent=True) or {}
    name = data.get("name", "")
    email = data.get("email", "")
    message = data.get("message", "")
    entry = {"name": name, "email": email, "message": message}
    print(f"Contact: {name} | {email} | {message}")
    contacts = read_json(CONTACTS_FILE)
    contacts.append(entry)
    write_json(CONTACTS_FILE, contacts)
    return jsonify({"status": "success", "msg": "Form received!"})


@app.route("/api/projects", methods=["GET"])
def get_projects():
    ensure_data_dir()
    projects = read_json(PROJECTS_FILE)
    return jsonify(projects)


@app.route("/api/projects", methods=["POST"])
def add_project():
    ensure_data_dir()
    data = request.get_json(silent=True) or {}
    title = data.get("title", "")
    description = data.get("description", "")
    imageUrl = data.get("imageUrl", "")
    if not title:
        return jsonify({"error": "title is required"}), 400
    entry = {"title": title, "description": description, "imageUrl": imageUrl}
    print(f"New project: {title}")
    projects = read_json(PROJECTS_FILE)
    projects.append(entry)
    write_json(PROJECTS_FILE, projects)
    return jsonify({"status": "success", "project": entry}, 201)


if __name__ == "__main__":
    ensure_data_dir()
    app.run(debug=True, port=5000)
