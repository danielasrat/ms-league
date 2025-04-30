import { useState } from "react";
import axios from "axios";

export default function TelebirrPayment() {
  const [screenshot, setScreenshot] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setScreenshot(e.target.files[0]);
  };

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
      if (!user?.email) {
        throw new Error("User information not found");
      }
      formData.append("email", user.email);

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token missing");
      }

      const response = await axios.post(
        "http://localhost:3000/payment/telebirr/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          timeout: 30000, // 30 seconds timeout
        }
      );

      if (response.data?.message) {
        setMessage(`✅ ${response.data.message}`);
      } else {
        setMessage("✅ Screenshot uploaded successfully. Awaiting approval.");
      }

      // Clear the file input after successful upload
      setScreenshot(null);
      if (e.target.reset) e.target.reset();
    } catch (err) {
      console.error("Upload error:", err);

      let errorMessage = "❌ Failed to upload screenshot. Please try again.";

      if (err.response) {
        // Server responded with error status
        if (err.response.data?.message) {
          errorMessage = `❌ ${err.response.data.message}`;
        } else if (err.response.status === 413) {
          errorMessage = "❌ File too large (max 5MB allowed)";
        } else if (err.response.status === 401) {
          errorMessage = "❌ Session expired. Please login again.";
        }
      } else if (err.request) {
        // Request was made but no response
        errorMessage = "❌ Server not responding. Try again later.";
      } else if (err.message.includes("timeout")) {
        errorMessage = "❌ Upload timed out. Try again.";
      }

      setMessage(errorMessage);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto mt-10 border border-green-100">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-700">
        Telebirr Payment
      </h2>

      <div className="space-y-5">
        <p className="text-gray-700 text-lg leading-relaxed">
          To complete your membership payment, please make a payment via{" "}
          <span className="font-semibold text-green-700">Telebirr</span> using
          the following details:
        </p>

        <div className="bg-green-50 border border-green-200 p-5 rounded-xl">
          <h3 className="font-semibold text-xl text-green-800 mb-2">
            Telebirr Payment Details
          </h3>
          <ul className="text-gray-800 space-y-1">
            <li>
              📛 Merchant: <strong>Example Merchant Name</strong>
            </li>
            <li>
              📞 Phone Number: <strong>+251XXXXXXXXX</strong>
            </li>
            <li>
              🏦 Account Number: <strong>123456789</strong>
            </li>
            <li>
              🔢 Short Code: <strong>12345</strong>
            </li>
          </ul>
          <p className="mt-3 text-sm text-gray-600">
            After making the payment, please upload your payment screenshot
            below to complete your membership activation.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            Upload Payment Screenshot
          </h3>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-300 transition"
          />
        </div>

        <button
          onClick={handleFormSubmit}
          className="bg-green-600 hover:bg-green-700 text-white w-full py-3 rounded-full text-lg font-medium shadow-md transition-all duration-300"
        >
          📤 Upload Screenshot
        </button>

        {message && (
          <div className="mt-4 text-center">
            <p className="text-base font-medium text-green-700 bg-green-100 px-4 py-2 rounded-full inline-block">
              {message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
