import { useState } from "react";
import { submitContact, getProjects, addProject } from "../api";
import "./ApiTest.css";

export default function ApiTest() {
  const [contactRes, setContactRes] = useState("");
  const [projects, setProjects] = useState([]);
  const [projectRes, setProjectRes] = useState("");
  const [loading, setLoading] = useState("");

  const handleContact = async (e) => {
    e.preventDefault();
    const form = e.target;
    setLoading("contact");
    setContactRes("");
    try {
      const data = await submitContact({
        name: form.name.value,
        email: form.email.value,
        message: form.message.value,
      });
      setContactRes(data.msg || "Sent!");
      form.reset();
    } catch (err) {
      setContactRes("Error: " + err.message);
    } finally {
      setLoading("");
    }
  };

  const handleGetProjects = async () => {
    setLoading("get");
    setProjects([]);
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      setProjects([{ error: err.message }]);
    } finally {
      setLoading("");
    }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    const form = e.target;
    setLoading("add");
    setProjectRes("");
    try {
      const data = await addProject({
        title: form.title.value,
        description: form.description.value,
        imageUrl: form.imageUrl.value,
      });
      setProjectRes("Added: " + (data.project?.title || "OK"));
      form.reset();
    } catch (err) {
      setProjectRes("Error: " + err.message);
    } finally {
      setLoading("");
    }
  };

  return (
    <div className="api-test">
      <h2>Backend API Test</h2>
      <p className="api-test-hint">Start the backend first: <code>cd backend && python app.py</code></p>

      <section>
        <h3>Contact form</h3>
        <form onSubmit={handleContact}>
          <input name="name" placeholder="Name" required />
          <input name="email" type="email" placeholder="Email" required />
          <textarea name="message" placeholder="Message" required />
          <button type="submit" disabled={!!loading}>{loading === "contact" ? "Sending…" : "Send"}</button>
        </form>
        {contactRes && <p className="api-test-msg">{contactRes}</p>}
      </section>

      <section>
        <h3>Projects</h3>
        <button type="button" onClick={handleGetProjects} disabled={!!loading}>
          {loading === "get" ? "Loading…" : "Fetch projects"}
        </button>
        {projects.length > 0 && (
          <ul>
            {projects.map((p, i) => (
              <li key={i}>{p.error ? p.error : `${p.title} – ${p.description || "(no description)"}`}</li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h3>Add project</h3>
        <form onSubmit={handleAddProject}>
          <input name="title" placeholder="Title" required />
          <input name="description" placeholder="Description" />
          <input name="imageUrl" placeholder="Image URL" />
          <button type="submit" disabled={!!loading}>{loading === "add" ? "Adding…" : "Add project"}</button>
        </form>
        {projectRes && <p className="api-test-msg">{projectRes}</p>}
      </section>
    </div>
  );
}
