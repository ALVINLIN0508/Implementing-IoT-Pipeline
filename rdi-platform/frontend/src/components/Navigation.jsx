import "../styles.css";

export default function Navigation({ currentPage, onNavigate }) {
  const pages = [
    { id: "home", label: "Home" },
    { id: "student", label: "For Students" },
    { id: "company", label: "For Companies" },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => onNavigate("home")}>
        RDI Platform
      </div>
      <div className="navbar-nav">
        {pages.map((page) => (
          <a
            key={page.id}
            onClick={() => onNavigate(page.id)}
            className={currentPage === page.id ? "active" : ""}
          >
            {page.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
