import { useState, useEffect } from "react";
import "../styles.css";

export default function StudentPage({ onNavigateToDetail }) {
  const [query, setQuery] = useState("");
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Load all companies on mount
  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:3001/api/companies");
      if (!res.ok) throw new Error("Failed to fetch companies");
      const data = await res.json();
      setCompanies(data);
    } catch (err) {
      setError("Failed to load companies. Make sure backend is running on port 3001");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const search = async () => {
    if (!query.trim()) {
      loadCompanies();
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await fetch(`http://localhost:3001/api/search?q=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error("Search failed");
      const data = await res.json();
      setCompanies(data);
    } catch (err) {
      setError("Search failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  return (
    <div className="app-container">
      {/* Hero Section - Dark with RDI Branding */}
      <section style={{
        background: "#000000",
        color: "#ffffff",
        padding: "80px 20px",
        marginTop: "48px"
      }}>
        <div className="section-content" style={{ maxWidth: "980px", margin: "0 auto" }}>
          <h1 style={{
            fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
            fontSize: "56px",
            fontWeight: 600,
            margin: "0 0 16px 0",
            letterSpacing: "-0.28px",
            lineHeight: 1.07
          }}>
            Find Your Perfect Match
          </h1>
          <p style={{
            fontSize: "17px",
            fontWeight: 400,
            margin: "0 0 40px 0",
            opacity: 0.8,
            lineHeight: 1.47,
            maxWidth: "600px",
            letterSpacing: "-0.374px"
          }}>
            Discover internships and entry-level positions at leading companies. Connect with opportunities tailored for your career.
          </p>

          {/* Search Box */}
          <div style={{
            display: "flex",
            gap: "12px",
            marginBottom: "40px"
          }}>
            <input
              type="text"
              placeholder="Search companies, positions or skills..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              style={{
                flex: 1,
                padding: "12px 16px",
                fontSize: "17px",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                borderRadius: "8px",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                color: "white",
                boxSizing: "border-box",
                outline: "none"
              }}
            />
            <button
              onClick={search}
              disabled={loading}
              style={{
                padding: "12px 28px",
                backgroundColor: "#0071e3",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontWeight: 400,
                fontSize: "17px",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.6 : 1,
                fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif"
              }}
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>
      </section>

      {/* Error Message */}
      {error && (
        <section style={{
          background: "#f5f5f7",
          padding: "20px"
        }}>
          <div className="section-content" style={{ maxWidth: "980px", margin: "0 auto" }}>
            <p style={{
              color: "#d70015",
              margin: 0,
              fontSize: "16px"
            }}>
               {error}
            </p>
          </div>
        </section>
      )}

      {/* Companies Grid Section - Light Gray */}
      <section style={{
        background: "#f5f5f7",
        padding: "80px 20px",
        minHeight: "calc(100vh - 48px)"
      }}>
        <div className="section-content" style={{ maxWidth: "980px", margin: "0 auto" }}>
          <h2 style={{
            fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
            fontSize: "40px",
            fontWeight: 600,
            margin: "0 0 60px 0",
            letterSpacing: "normal",
            lineHeight: 1.10,
            color: "#1d1d1f"
          }}>
            Explore {companies.length} {companies.length === 1 ? "Company" : "Companies"}
          </h2>

          {companies.length === 0 && !loading && (
            <p style={{ color: "#1d1d1f", fontSize: "17px" }}>
              No companies found. Try a different search.
            </p>
          )}

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "24px"
          }}>
            {companies.map((company) => (
              <div
                key={company.id}
                onClick={() => onNavigateToDetail(company.id)}
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "12px",
                  padding: "28px",
                  cursor: "pointer",
                  border: "1px solid rgba(0, 0, 0, 0.08)",
                  transition: "all 0.3s ease",
                  boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 16px"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "rgba(0, 0, 0, 0.16) 0px 12px 32px";
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.borderColor = "rgba(0, 113, 227, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "rgba(0, 0, 0, 0.08) 0px 4px 16px";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.08)";
                }}
              >
                <div style={{ marginBottom: "16px" }}>
                  <h3 style={{
                    fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
                    fontSize: "22px",
                    fontWeight: 700,
                    margin: "0 0 8px 0",
                    color: "#1d1d1f",
                    lineHeight: 1.19,
                    letterSpacing: "0.231px"
                  }}>
                    {company.name}
                  </h3>
                  <p style={{
                    fontSize: "14px",
                    color: "rgba(0, 0, 0, 0.6)",
                    margin: "0",
                    lineHeight: 1.43,
                    letterSpacing: "-0.224px"
                  }}>
                    {company.location?.replace(/📍\s*/g, '')}
                  </p>
                </div>

                <div style={{
                  paddingTop: "16px",
                  borderTop: "1px solid rgba(0, 0, 0, 0.06)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  <span style={{
                    fontSize: "13px",
                    color: "rgba(0, 0, 0, 0.48)",
                    fontWeight: 600,
                    letterSpacing: "-0.224px"
                  }}>
                    {company.positionCount} open {company.positionCount === 1 ? "position" : "positions"}
                  </span>
                  <span style={{
                    fontSize: "20px",
                    color: "#0071e3",
                    fontWeight: 600
                  }}>
                    →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
