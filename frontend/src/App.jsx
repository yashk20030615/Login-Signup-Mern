import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Screen/login";
import Signup from "./Screen/signup";
import Dashboard from "./Screen/dashboard";
import ProtectedRoute from "./Screen/ProtectedRoute";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
