# Run Frontend + Backend Together

## Step 1: Install backend dependencies

Open a terminal and run:

```bash
cd portfolio-frontend/backend
pip install -r requirements.txt
```

(Use `python -m venv venv` first if you prefer a virtual environment, then activate it and run the command above.)

---

## Step 2: Start the Flask backend

In the **same** terminal (from `portfolio-frontend/backend`):

```bash
python app.py
```

You should see something like:

```
* Running on http://127.0.0.1:5000
```

Leave this terminal open. The backend is now running on **port 5000**.

---

## Step 3: Start the React frontend

Open a **second** terminal. From the project root:

```bash
cd portfolio-frontend
npm install
npm run dev
```

You should see:

```
➜  Local:   http://localhost:5173/
```

Open **http://localhost:5173/** in your browser. You’ll see the app with an "Backend API Test" section.

---

## Step 4: Test the APIs

1. **Contact form** – Fill name, email, message and click **Send**.  
   - Backend will print the data in the terminal and save it in `backend/data/contacts.json`.

2. **Fetch projects** – Click **Fetch projects**.  
   - Backend reads from `backend/data/projects.json` (empty at first).

3. **Add project** – Fill title (required), description, image URL and click **Add project**.  
   - Backend appends to `backend/data/projects.json`.  
   - Click **Fetch projects** again to see the new project.

---

## Folder structure

```
portfolio-frontend/
├── backend/
│   ├── app.py              # Flask app (contact + projects APIs)
│   ├── requirements.txt
│   └── data/
│       ├── contacts.json   # Contact form submissions
│       └── projects.json   # Projects list
├── src/
│   ├── api.js              # Example API calls (submitContact, getProjects, addProject)
│   ├── components/
│   │   ├── ApiTest.jsx     # UI to test the APIs
│   │   └── ApiTest.css
│   └── App.jsx
└── RUN.md                  # This file
```

---

## Troubleshooting

- **CORS errors in browser** – Make sure the backend is running on port 5000 and that `flask-cors` is installed (`pip install flask-cors`).
- **Connection refused** – Start the backend first (`python app.py` in `backend`), then start the frontend (`npm run dev`).
- **Different backend port** – In the frontend, set `VITE_API_URL=http://127.0.0.1:YOUR_PORT` in a `.env` file if you change the Flask port.
