import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "./LoginPage";
import Home from "./Home";
import Profile from "./ProfilePage";
import UserProfile from "./UserProfile";
import SearchResults from "./SearchResults";
function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/:userId"
        element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/searchresults"
        element={
          <ProtectedRoute>
            <SearchResults />
          </ProtectedRoute>
        }
      />
    </Routes>
    
  );
}

export default App;
