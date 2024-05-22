import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Patient from "./pages/Patient";
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";
import ProtectRoute from "./components/ProtectRoute";
import PublicRoute from "./components/PublicRoute";
function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <>
      <BrowserRouter>
        {loading ? (
          <Spinner />
        ) : (
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route
              path="/patient"
              element={
                <ProtectRoute>
                  <Patient />
                </ProtectRoute>
              }
            />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
