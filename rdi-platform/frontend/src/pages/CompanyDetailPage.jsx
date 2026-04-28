import { useState, useEffect } from "react";
import "../styles.css";

export default function CompanyDetailPage({ companyId, onBack }) {
  const [companyDetails, setCompanyDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCompanyDetails = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:3001/api/companies/${companyId}`);
        if (!res.ok) throw new Error("Failed to fetch company details");
        const data = await res.json();
        setCompanyDetails(data);
      } catch (err) {
        setError("Failed to load company details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadCompanyDetails();
  }, [companyId]);

  if (loading) {
    return (
      <div style={{
        background: "#000000",
        color: "white",
        padding: "200px 20px",
        textAlign: "center",
        minHeight: "100vh",
        marginTop: "48px"
      }}>
        <p>Loading company details...</p>
      </div>
    );
  }

  if (error || !companyDetails) {
    return (
      <div style={{
        background: "#000000",
        color: "white",
        padding: "200px 20px",
        textAlign: "center",
        minHeight: "100vh",
        marginTop: "48px"
      }}>
        <p style={{ color: "#d70015" }}> {error}</p>
        <button
          onClick={onBack}
          style={{
            marginTop: "20px",
            padding: "12px 28px",
            backgroundColor: "#0071e3",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontWeight: 400,
            fontSize: "17px",
            cursor: "pointer",
            fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif"
          }}
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Back Button Section */}
      <section style={{
        background: "#000000",
        color: "white",
        padding: "20px",
        marginTop: "48px",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)"
      }}>
        <div className="section-content" style={{ maxWidth: "980px", margin: "0 auto" }}>
          <button
            onClick={onBack}
            style={{
              backgroundColor: "transparent",
              color: "#2997ff",
              border: "1px solid #2997ff",
              padding: "8px 16px",
              borderRadius: "8px",
              fontSize: "16px",
              cursor: "pointer",
              fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
              transition: "all 0.2s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#2997ff";
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#2997ff";
            }}
          >
            ← Back to Companies
          </button>
        </div>
      </section>

      {/* Company Detail Section - Dark */}
      <section style={{
        background: "#000000",
        color: "white",
        padding: "80px 20px"
      }}>
        <div className="section-content" style={{ maxWidth: "980px", margin: "0 auto" }}>
          <h1 style={{
            fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
            fontSize: "56px",
            fontWeight: 600,
            margin: "0 0 24px 0",
            letterSpacing: "-0.28px",
            lineHeight: 1.07
          }}>
            {companyDetails.name}
          </h1>

          {/* Company Info Cards */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "24px",
            marginBottom: "48px"
          }}>
            {companyDetails.location && (
              <div style={{
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                borderRadius: "12px",
                padding: "20px",
                border: "1px solid rgba(255, 255, 255, 0.1)"
              }}>
                <p style={{
                  fontSize: "13px",
                  color: "rgba(255, 255, 255, 0.6)",
                  margin: "0 0 8px 0",
                  fontWeight: 600,
                  letterSpacing: "-0.224px"
                }}>
                  Location
                </p>
                <p style={{
                  fontSize: "16px",
                  color: "#ffffff",
                  margin: 0,
                  fontWeight: 500
                }}>
                  {companyDetails.location?.replace(/📍\s*/g, '')}
                </p>
              </div>
            )}
            {companyDetails.email && (
              <div style={{
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                borderRadius: "12px",
                padding: "20px",
                border: "1px solid rgba(255, 255, 255, 0.1)"
              }}>
                <p style={{
                  fontSize: "13px",
                  color: "rgba(255, 255, 255, 0.6)",
                  margin: "0 0 8px 0",
                  fontWeight: 600,
                  letterSpacing: "-0.224px"
                }}>
                  Email
                </p>
                <a href={`mailto:${companyDetails.email}`} style={{
                  fontSize: "16px",
                  color: "#2997ff",
                  margin: 0,
                  fontWeight: 500,
                  textDecoration: "none"
                }}>
                  {companyDetails.email}
                </a>
              </div>
            )}
            {companyDetails.website && (
              <div style={{
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                borderRadius: "12px",
                padding: "20px",
                border: "1px solid rgba(255, 255, 255, 0.1)"
              }}>
                <p style={{
                  fontSize: "13px",
                  color: "rgba(255, 255, 255, 0.6)",
                  margin: "0 0 8px 0",
                  fontWeight: 600,
                  letterSpacing: "-0.224px"
                }}>
                  Website
                </p>
                <a href={companyDetails.website} target="_blank" rel="noopener noreferrer" style={{
                  fontSize: "16px",
                  color: "#2997ff",
                  margin: 0,
                  fontWeight: 500,
                  textDecoration: "none",
                  wordBreak: "break-all"
                }}>
                  Visit 
                </a>
              </div>
            )}
          </div>

          {/* About Section */}
          {companyDetails.about && (
            <div style={{
              marginBottom: "60px"
            }}>
              <h2 style={{
                fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
                fontSize: "40px",
                fontWeight: 600,
                margin: "0 0 24px 0",
                letterSpacing: "normal",
                lineHeight: 1.10
              }}>
                About
              </h2>
              <p style={{
                fontSize: "17px",
                lineHeight: 1.47,
                opacity: 0.9,
                letterSpacing: "-0.374px",
                margin: 0
              }}>
                {companyDetails.about}
              </p>
            </div>
          )}

          {/* Culture Section */}
          {companyDetails.culture && (
            <div style={{
              marginBottom: "60px"
            }}>
              <h2 style={{
                fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
                fontSize: "40px",
                fontWeight: 600,
                margin: "0 0 24px 0",
                letterSpacing: "normal",
                lineHeight: 1.10
              }}>
                Culture & Values
              </h2>
              <p style={{
                fontSize: "17px",
                lineHeight: 1.47,
                opacity: 0.9,
                letterSpacing: "-0.374px",
                margin: 0
              }}>
                {companyDetails.culture}
              </p>
            </div>
          )}

          {/* Open Positions */}
          {companyDetails.positions && companyDetails.positions.length > 0 && (
            <div>
              <h2 style={{
                fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
                fontSize: "40px",
                fontWeight: 600,
                margin: "0 0 36px 0",
                letterSpacing: "normal",
                lineHeight: 1.10
              }}>
                Open Positions ({companyDetails.positions.length})
              </h2>

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "24px"
              }}>
                {companyDetails.positions.map((position) => (
                  <div
                    key={position.id}
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      borderRadius: "12px",
                      padding: "28px",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      transition: "all 0.3s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "rgba(0, 113, 227, 0.15)";
                      e.currentTarget.style.borderColor = "rgba(0, 113, 227, 0.4)";
                      e.currentTarget.style.transform = "translateY(-4px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <h3 style={{
                      fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
                      fontSize: "21px",
                      fontWeight: 600,
                      margin: "0 0 12px 0",
                      color: "#ffffff",
                      letterSpacing: "0.231px"
                    }}>
                      {position.title}
                    </h3>
                    <p style={{
                      fontSize: "15px",
                      color: "rgba(255, 255, 255, 0.7)",
                      margin: 0,
                      lineHeight: 1.47,
                      letterSpacing: "-0.224px"
                    }}>
                      {position.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
