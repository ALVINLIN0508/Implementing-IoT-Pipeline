import { useState } from "react";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import StudentPage from "./pages/StudentPage";
import CompanyPage from "./pages/CompanyPage";
import CompanyDetailPage from "./pages/CompanyDetailPage";
import ResultsPage from "./pages/ResultsPage";
import "./styles.css";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);

  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleNavigateToDetail = (companyId) => {
    setSelectedCompanyId(companyId);
    setCurrentPage("company-detail");
    window.scrollTo(0, 0);
  };

  const handleBackFromDetail = () => {
    setCurrentPage("student");
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={handleNavigate} onNavigateToDetail={handleNavigateToDetail} />;
      case "student":
        return <StudentPage onNavigateToDetail={handleNavigateToDetail} />;
      case "company":
        return <CompanyPage />;
      case "company-detail":
        return (
          <CompanyDetailPage 
            companyId={selectedCompanyId} 
            onBack={handleBackFromDetail} 
          />
        );
      case "results":
        return <ResultsPage searchQuery={searchQuery} />;
      default:
        return <HomePage onNavigate={handleNavigate} onNavigateToDetail={handleNavigateToDetail} />;
    }
  };

  return (
    <div>
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
      {renderPage()}
    </div>
  );
}

export default App;