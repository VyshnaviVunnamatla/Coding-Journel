import React, { useEffect, useState } from "react";
import axios from "axios";

function ProblemList() {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    const fetchProblems = async () => {
      const res = await axios.get("https://coding-journel-backend.onrender.com/api/problems");
      setProblems(res.data);
    };
    fetchProblems();
  }, []);

  return (
    <div className="problem-list">
      {problems.map((p) => (
        <div key={p._id} className="problem-card">
          <h3>{p.title} ({p.platform})</h3>
          <p><strong>Topic:</strong> {p.topic}</p>
          <pre>{p.code}</pre>
          <p>{p.notes}</p>
        </div>
      ))}
    </div>
  );
}

export default ProblemList;
