import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

function Login() {
    const handleLogin = () => {
  alert("Login functionality will be implemented later.");
};
  return (
    <>
      <Navbar />

      <div className="min-h-screen flex flex-col items-center pt-10 px-4">
        <div className="w-full max-w-md border rounded-lg p-6 shadow-md">
          <h1 className="text-3xl font-bold text-center mb-6">
            Login
          </h1>

          <div className="mb-4">
            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
            />
          </div>

          <div className="mb-4">
            <Input
              label="Password"
              placeholder="Enter your password"
              type="password"
            />
          </div>

          <div className="flex justify-center">
            <Button onClick={handleLogin}>Login</Button>
          </div>

          <p className="text-center mt-4 text-gray-600">
            Don't have an account? Sign Up
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Login;