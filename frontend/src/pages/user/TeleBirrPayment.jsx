import { useState } from "react";
import axios from "axios";
import telebirrLogo from "./../../assets/telebirr.png";

export default function TelebirrPayment() {
  const [screenshot, setScreenshot] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => setScreenshot(e.target.files[0]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!screenshot) {
      setMessage("❗ Please upload the screenshot of your payment.");
      return;
    }

    const formData = new FormData();
    formData.append("screenshot", screenshot);

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user?.email) throw new Error("User information not found");
      formData.append("email", user.email);

      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication token missing");

      const response = await axios.post(
        "http://localhost:3000/payment/telebirr/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          timeout: 30000,
        }
      );

      setMessage(
        `✅ ${
          response.data?.message ||
          "Screenshot uploaded successfully. Awaiting approval."
        }`
      );
      setScreenshot(null);
      if (e.target.reset) e.target.reset();
    } catch (err) {
      console.error("Upload error:", err);

      let errorMessage = "❌ Failed to upload screenshot. Please try again.";
      if (err.response) {
        if (err.response.data?.message)
          errorMessage = `❌ ${err.response.data.message}`;
        else if (err.response.status === 413)
          errorMessage = "❌ File too large (max 5MB allowed)";
        else if (err.response.status === 401)
          errorMessage = "❌ Session expired. Please login again.";
      } else if (err.request)
        errorMessage = "❌ Server not responding. Try again later.";
      else if (err.message.includes("timeout"))
        errorMessage = "❌ Upload timed out. Try again.";

      setMessage(errorMessage);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto mt-12 border border-green-200 font-sans">
      <div className="flex flex-row items-center justify-around text-center flex-wrap">
        <img
          src={telebirrLogo}
          alt="telebirr"
          className="w-36 h-36 mb-4 object-contain"
        />
        <h2 className="text-4xl font-bold text-green-600 mb-4 tracking-tight">
          Telebirr Payment
        </h2>
        <p className="text-gray-600 text-lg max-w-md">
          Complete your membership by sending a payment via{" "}
          <span className="font-semibold text-green-600">Telebirr</span> and
          uploading your screenshot below.
        </p>
      </div>

      <div className="bg-green-50 border border-green-200 p-6 rounded-2xl mt-8 space-y-3">
        <h3 className="text-2xl font-semibold text-green-800">
          Payment Details
        </h3>
        <ul className="text-gray-700 text-base space-y-1">
          <li>
            📛 <strong>Merchant:</strong> Example Merchant Name
          </li>
          <li>
            📞 <strong>Phone Number:</strong> +251XXXXXXXXX
          </li>
          <li>
            🏦 <strong>Account Number:</strong> 123456789
          </li>
          <li>
            🔢 <strong>Short Code:</strong> 12345
          </li>
        </ul>
        <p className="text-sm text-gray-600 pt-2">
          After payment, upload your screenshot to activate your membership.
        </p>
      </div>

      <form onSubmit={handleFormSubmit} className="mt-8 space-y-6">
        <div>
          <label className="block text-lg font-medium text-gray-800 mb-2">
            Upload Payment Screenshot
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-md file:bg-green-100 file:text-green-700 hover:file:bg-green-200 transition"
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white w-full py-3 rounded-full text-lg font-semibold shadow-md transition duration-300"
        >
          📤 Upload Screenshot
        </button>

        {message && (
          <div className="mt-4 text-center">
            <p
              className={`text-base font-medium px-4 py-2 rounded-full inline-block ${
                message.startsWith("✅")
                  ? "text-green-700 bg-green-100"
                  : "text-red-700 bg-red-100"
              }`}
            >
              {message}
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
