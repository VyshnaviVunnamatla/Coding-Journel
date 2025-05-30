import React, { useState } from "react";
import axios from "axios";

function ProblemForm() {
  const [form, setForm] = useState({ title: "", platform: "", topic: "", code: "", notes: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/problems", form);
    setForm({ title: "", platform: "", topic: "", code: "", notes: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="problem-form">
      <input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
      <input placeholder="Platform" value={form.platform} onChange={e => setForm({ ...form, platform: e.target.value })} />
      <input placeholder="Topic" value={form.topic} onChange={e => setForm({ ...form, topic: e.target.value })} />
      <textarea placeholder="Code" value={form.code} onChange={e => setForm({ ...form, code: e.target.value })} />
      <textarea placeholder="Notes" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
      <button type="submit">Add Problem</button>
    </form>
  );
}

export default ProblemForm;
