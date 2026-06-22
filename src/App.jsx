import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Generate from "./pages/Generate";
import Assistant from "./pages/Assistant";
import History from "./pages/History";
import Login from "./pages/Login";
import ComponentsDemo from "./pages/ComponentsDemo";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/generate" element={<Generate />} />
      <Route path="/assistant" element={<Assistant />} />
      <Route path="/history" element={<History />} />
      <Route path="/login" element={<Login />} />
      <Route path="/components-demo" element={<ComponentsDemo />} />
    </Routes>
    
  );
}

export default App;