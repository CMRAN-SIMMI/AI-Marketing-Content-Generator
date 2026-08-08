import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function OAuthSuccess() {
  const navigate = useNavigate();

useEffect(() => {
  const params = new URLSearchParams(window.location.search);

  const token = params.get("token");
  const name = params.get("name");
  const email = params.get("email");

  if (token) {
    localStorage.setItem("token", token);

    localStorage.setItem(
      "user",
      JSON.stringify({
        name,
        email,
      })
    );

    alert("Google Login Successful!");

    setTimeout(() => {
      navigate("/dashboard", {
        replace: true,
        state: {
          loginSuccess: true,
        },
      });
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