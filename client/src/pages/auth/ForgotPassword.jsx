import { useState } from "react";
import { forgotPassword } from "../../api/userApi";
import { showNotification } from "../../components/showNotification";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const response = await forgotPassword(email);
      showNotification(response.data.message, response.data.status);
      if (response.data.status) {
        navigate("/");
      }
    } catch (error) {
      setMessage(error.message || "Something went wrong!");
    }

    setLoading(false);
  };

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 z-[1000] flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Forgot Password
        </h2>
        <form className="mt-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full mt-4 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        {message && <p className="text-center mt-4 text-gray-700">{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
