import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function OAuthSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);

      alert("Google Login Successful!");

      // Small delay so localStorage is available before routing
      setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 100);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">
        Signing you in...
      </h1>
    </div>
  );
}

export default OAuthSuccess;