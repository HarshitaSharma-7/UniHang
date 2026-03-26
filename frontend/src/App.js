import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import CreatePlan from "./pages/CreatePlan";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";

function App() {
  return (
    <Router>

      <div className="min-h-screen bg-gray-100">

        <Routes>

          <Route path="/" element={<Login />} />

          <Route path="/signup" element={<Signup />} />

          <Route path="/home" element={<Home />} />

          <Route path="/create" element={<CreatePlan />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/chat/:id" element={<Chat />} />

        </Routes>

      </div>

    </Router>
  );
}

export default App;