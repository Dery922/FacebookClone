import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Profile from "./pages/profiles";
import Home from "./pages/home";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";

function App() {
  return (
    <div>
      <Routes>
        {/* when user is not loggin and try to access the profile or home page redirect the user to the login */}
        <Route element={<LoggedInRoutes />}>
          <Route path="/profile" element={<Profile />} exact />
          <Route path="/" element={<Home />} exact />
        </Route>
        {/* when user is loggein and try to access the login page redirect back */}
        <Route element={<NotLoggedInRoutes />}>
          <Route path="/login" element={<Login />} exact />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
