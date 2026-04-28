import { useState } from "react";
import "../styles.css";

export default function ResultsPage({ searchQuery, role = "student" }) {
  const [results] = useState([
    {
      id: 1,
      name: role === "student" ? "Software Engineer Intern" : "Alice Johnson",
      company: role === "student" ? "TechCorp" : "Computer Science",
      description: role === "student" ? "Work on modern web technologies" : "Passionate about full-stack development",
      location: "San Francisco, CA",
      salary: role === "student" ? "$18/hr" : null,
      skills: ["React", "Node.js", "Python"],
      year: role === "student" ? null : "2025"
    },
    {
      id: 2,
      name: role === "student" ? "Product Design Internship" : "Bob Chen",
      company: role === "student" ? "DesignHub" : "Design",
      description: role === "student" ? "Create beautiful user experiences" : "UX/UI design enthusiast with portfolio",
      location: "New York, NY",
      salary: role === "student" ? "$16/hr" : null,
      skills: ["Figma", "UI/UX", "CSS"],
      year: role === "student" ? null : "2024"
    },
    {
      id: 3,
      name: role === "student" ? "Data Science Internship" : "Carol Lee",
      company: role === "student" ? "DataScience Inc" : "Data Science",
      description: role === "student" ? "Analyze real-world datasets" : "ML enthusiast with strong Python skills",
      location: "Boston, MA",
      salary: role === "student" ? "$17/hr" : null,
      skills: ["Python", "ML", "SQL"],
      year: role === "student" ? null : "2025"
    },
  ]);

  return (
    <div className="app-container">
      <section className="section light">
        <div className="section-content">
          <h1 className="h-section">
            {searchQuery ? `Results for "${searchQuery}"` : "All Opportunities"}
          </h1>
          <p className="body" style={{ color: "rgba(0, 0, 0, 0.6)", marginBottom: "40px" }}>
            We found {results.length} {role === "student" ? "jobs" : "students"} matching your search.
          </p>

          <div className="results-grid">
            {results.map((item) => (
              <div key={item.id} className="result-card">
                <div className="result-card-header">
                  <h3 className="result-card-title">{item.name}</h3>
                  <p className="result-card-subtitle">{item.company}</p>
                </div>
                <div className="result-card-body">
                  <p className="body" style={{ margin: "0 0 12px 0", color: "rgba(0, 0, 0, 0.7)" }}>
                    {item.description}
                  </p>
                  {item.location && (
                    <p className="caption" style={{ margin: "0 0 8px 0", color: "rgba(0, 0, 0, 0.5)" }}>
                       {item.location.replace(/📍\s*/g, '')}
                    </p>
                  )}
                  {item.salary && (
                    <p className="caption-bold" style={{ margin: "0 0 8px 0", color: "var(--color-apple-blue)" }}>
                      {item.salary}
                    </p>
                  )}
                  {item.skills && (
                    <div style={{ display: "flex", gap: "4px", flexWrap: "wrap", marginTop: "12px" }}>
                      {item.skills.map((skill) => (
                        <span key={skill} className="caption" style={{ background: "rgba(0, 113, 227, 0.1)", color: "var(--color-apple-blue)", padding: "4px 8px", borderRadius: "4px" }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="result-card-footer">
                  <button className="btn btn-primary" style={{ flex: 1 }}>
                    {role === "student" ? "Apply" : "Contact"}
                  </button>
                  <button className="btn btn-pill" style={{ flex: 1 }}>Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
