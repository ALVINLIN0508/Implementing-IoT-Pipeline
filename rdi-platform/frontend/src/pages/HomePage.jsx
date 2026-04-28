import { useState } from "react";
import "../styles.css";

export default function HomePage({ onNavigate, onNavigateToDetail }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [role, setRole] = useState("student");
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState("");
  const [aiResult, setAiResult] = useState(null);
  const [matchedPositions, setMatchedPositions] = useState([]);

  const handleAISearch = async () => {
    if (!searchQuery.trim()) {
      setError("Please enter a search query");
      return;
    }

    setIsSearching(true);
    setError("");
    setAiResult(null);
    setMatchedPositions([]);

    try {
      console.log(`[AI Search] Sending query: "${searchQuery}" with role: ${role}`);

      const response = await fetch("http://localhost:3001/api/ai-search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: searchQuery,
          role: role,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Search failed");
      }

      const data = await response.json();
      console.log("[AI Search] Result:", data);
      
      setAiResult(data.analysis);
      setMatchedPositions(data.positions || []);

    } catch (err) {
      console.error("[AI Search] Error:", err);
      setError(err.message || "Failed to perform search. Make sure services are running.");
    } finally {
      setIsSearching(false);
    }
  };

  const handlePositionClick = (position) => {
    // Navigate to company detail page with company ID
    if (onNavigateToDetail) {
      onNavigateToDetail(position.company_id);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !isSearching) {
      handleAISearch();
    }
  };

  return (
    <div className="app-container">
      {/* Hero Section */}
      <section style={{
        background: "#000000",
        color: "#ffffff",
        padding: "100px 20px",
        marginTop: "48px"
      }}>
        <div style={{ maxWidth: "980px", margin: "0 auto" }}>
          <h1 style={{
            fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
            fontSize: "56px",
            fontWeight: 600,
            margin: "0 0 24px 0",
            letterSpacing: "-0.28px",
            lineHeight: 1.07
          }}>
            Find Your Opportunity
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
            Use RDI search to find the perfect internship or talent match.
          </p>

          {/* Role Selector */}
          <div style={{
            display: "flex",
            gap: "12px",
            marginBottom: "24px",
            alignItems: "center"
          }}>
            <label style={{
              fontSize: "16px",
              fontWeight: 500,
              color: "rgba(220, 215, 215, 0.8)"
            }}>
              I am a:
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{
                padding: "8px 12px",
                backgroundColor: "#1a1a1a",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                borderRadius: "8px",
                color: "white",
                fontSize: "16px",
                fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
                cursor: "pointer",
                outline: "none"
              }}
            >
              <option value="student">Student</option>
              <option value="company">Company</option>
            </select>
          </div>

          {/* Search Box */}
          <div style={{
            display: "flex",
            gap: "12px",
            marginBottom: "20px"
          }}>
            <input
              type="text"
              placeholder={
                role === "student"
                  ? "e.g., 'I need an IT internship in Helsinki'"
                  : "e.g., 'Looking for Python developers'"
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isSearching}
              style={{
                flex: 1,
                padding: "12px 16px",
                fontSize: "17px",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                borderRadius: "8px",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                color: "white",
                boxSizing: "border-box",
                outline: "none",
                opacity: isSearching ? 0.6 : 1
              }}
            />
            <button
              onClick={handleAISearch}
              disabled={isSearching}
              style={{
                padding: "12px 28px",
                backgroundColor: "#0071e3",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontWeight: 600,
                fontSize: "17px",
                cursor: isSearching ? "not-allowed" : "pointer",
                opacity: isSearching ? 0.6 : 1,
                fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
                transition: "all 0.2s ease"
              }}
              onMouseEnter={(e) => {
                if (!isSearching) e.currentTarget.style.backgroundColor = "#0066cc";
              }}
              onMouseLeave={(e) => {
                if (!isSearching) e.currentTarget.style.backgroundColor = "#0071e3";
              }}
            >
              {isSearching ? "Searching..." : "Search"}
            </button>
          </div>

          {isSearching && (
            <p style={{
              fontSize: "14px",
              color: "#0071e3",
              margin: "16px 0",
              fontStyle: "italic"
            }}>
              RDI is matching your request...
            </p>
          )}

          {error && (
            <div style={{
              backgroundColor: "rgba(255, 0, 0, 0.1)",
              border: "1px solid rgba(255, 0, 0, 0.3)",
              borderRadius: "8px",
              padding: "12px 16px",
              marginTop: "16px",
              color: "#ff6b6b"
            }}>
               {error}
            </div>
          )}
        </div>
      </section>

      {/* Results Section */}
      {aiResult && (
        <section style={{
          background: "#f5f5f7",
          padding: "80px 20px"
        }}>
          <div style={{ maxWidth: "980px", margin: "0 auto" }}>
            {/* AI Analysis */}
            <div style={{
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              padding: "28px",
              marginBottom: "40px",
              border: "1px solid rgba(0, 0, 0, 0.08)"
            }}>
              <h2 style={{
                fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
                fontSize: "28px",
                fontWeight: 600,
                margin: "0 0 20px 0",
                color: "#1d1d1f"
              }}>
                Key Topics Found
              </h2>
              <div style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
                marginBottom: "24px"
              }}>
                {aiResult.expanded_keywords && aiResult.expanded_keywords.length > 0 ? (
                  aiResult.expanded_keywords.map((keyword, idx) => (
                    <span
                      key={idx}
                      style={{
                        backgroundColor: "#0071e3",
                        color: "white",
                        padding: "8px 16px",
                        borderRadius: "20px",
                        fontSize: "14px",
                        fontWeight: 500
                      }}
                    >
                      {keyword}
                    </span>
                  ))
                ) : (
                  <p style={{ color: "rgba(0, 0, 0, 0.6)", margin: 0 }}>No keywords found</p>
                )}
              </div>

              {aiResult.recommendation && (
                <div>
                  <h3 style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#1d1d1f",
                    margin: "0 0 8px 0"
                  }}>
                    Found Opportunities:
                  </h3>
                  <p style={{
                    fontSize: "15px",
                    color: "#555555",
                    margin: 0,
                    lineHeight: 1.6
                  }}>
                    {aiResult.recommendation}
                  </p>
                </div>
              )}
            </div>

            {/* Positions Grid */}
            {matchedPositions.length > 0 ? (
              <div>
                <h2 style={{
                  fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontSize: "32px",
                  fontWeight: 600,
                  margin: "0 0 24px 0",
                  color: "#1d1d1f"
                }}>
                  Available Positions
                </h2>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                  gap: "20px"
                }}>
                  {matchedPositions.map((position) => (
                    <div
                      key={position.id}
                      onClick={() => handlePositionClick(position)}
                      style={{
                        backgroundColor: "#ffffff",
                        borderRadius: "12px",
                        padding: "24px",
                        border: "1px solid rgba(0, 0, 0, 0.08)",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.15)";
                        e.currentTarget.style.transform = "translateY(-4px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)";
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    >
                      <p style={{
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "#0071e3",
                        margin: "0 0 8px 0",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px"
                      }}>
                        {position.company_name}
                      </p>

                      <h3 style={{
                        fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
                        fontSize: "18px",
                        fontWeight: 600,
                        margin: "0 0 12px 0",
                        color: "#1d1d1f",
                        lineHeight: 1.3
                      }}>
                        {position.title}
                      </h3>

                      <p style={{
                        fontSize: "14px",
                        color: "#666666",
                        margin: "0 0 12px 0"
                      }}>
                        {position.location}
                      </p>

                      <p style={{
                        fontSize: "13px",
                        color: "#555555",
                        margin: "0 0 16px 0",
                        lineHeight: 1.5,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden"
                      }}>
                        {position.description}
                      </p>

                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        color: "#0071e3",
                        fontSize: "14px",
                        fontWeight: 500,
                        marginTop: "16px",
                        paddingTop: "16px",
                        borderTop: "1px solid rgba(0, 0, 0, 0.06)"
                      }}>
                        View Details →
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{
                backgroundColor: "#ffffff",
                borderRadius: "12px",
                padding: "40px",
                textAlign: "center",
                border: "1px solid rgba(0, 0, 0, 0.08)"
              }}>
                <p style={{
                  fontSize: "16px",
                  color: "#666666",
                  margin: 0
                }}>
                  No matching positions found. Try adjusting your search.
                </p>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
