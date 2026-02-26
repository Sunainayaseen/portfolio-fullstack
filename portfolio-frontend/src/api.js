/**
 * Example API calls to the Flask backend.
 * Backend must be running: cd backend && python app.py
 */

const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

export async function submitContact({ name, email, message }) {
  const res = await fetch(`${API_BASE}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, message }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Failed to send");
  return data;
}

export async function getProjects() {
  const res = await fetch(`${API_BASE}/api/projects`);
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
}

export async function addProject({ title, description, imageUrl }) {
  const res = await fetch(`${API_BASE}/api/projects`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description: description || "", imageUrl: imageUrl || "" }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Failed to add project");
  return data;
}
