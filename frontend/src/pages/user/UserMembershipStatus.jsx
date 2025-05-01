import { useEffect, useState } from "react";
import axios from "axios";

export default function UserMembershipStatus() {
  const [membershipData, setMembershipData] = useState({
    hasPaid: false,
    daysLeft: 0,
    membershipExpires: null,
    paymentMethod: "",
    status: "pending",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  useEffect(() => {
    const fetchMembershipStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:3000/users/membership-status",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Ensure we're getting the expected data structure
        if (response.data) {
          setMembershipData({
            hasPaid: response.data.hasPaid || false,
            daysLeft: response.data.daysLeft || 0,
            membershipExpires: response.data.membershipExpires || null,
            paymentMethod: response.data.paymentMethod || "",
            status: response.data.status || "pending",
          });
        }
      } catch (err) {
        console.error("Error fetching membership status:", err);
        setError("Failed to load membership status. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMembershipStatus();
  }, []);

  if (loading)
    return <div className="text-center py-4">Loading membership status...</div>;
  if (error)
    return <div className="text-red-500 text-center py-4">{error}</div>;

  // Calculate if membership is active (both paid and approved)
  const isActive =
    membershipData.hasPaid && membershipData.status === "approved";

  const handlePayment = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const res = await axios.post("http://localhost:3000/payment/checkout", {
      amount: "200.00",
      email: user.email,
      first_name: user.firstName,
      last_name: user.lastName,
    });
    window.location.href = res.data.url;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Membership Status</h2>

      <div className="space-y-4">
        {/* Account Status */}
        <div className="flex justify-between items-center border-b pb-2">
          <span className="font-medium">Account Status:</span>
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              membershipData.status === "approved"
                ? "bg-green-100 text-green-800"
                : membershipData.status === "rejected"
                ? "bg-red-100 text-red-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {membershipData.status.charAt(0).toUpperCase() +
              membershipData.status.slice(1)}
          </span>
        </div>

        {/* Payment Status */}
        <div className="flex justify-between items-center border-b pb-2">
          <span className="font-medium">Payment Status:</span>
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              membershipData.hasPaid
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {membershipData.hasPaid ? "Paid(Active)" : "Unpaid(Inactive)"}
          </span>
        </div>

        {/* Active Membership Details */}
        {isActive && (
          <>
            <div className="flex justify-between items-center border-b pb-2">
              <span className="font-medium">Days Remaining:</span>
              <span className="font-semibold">
                {membershipData.daysLeft > 0
                  ? membershipData.daysLeft
                  : "Expired"}
              </span>
            </div>

            <div className="flex justify-between items-center border-b pb-2">
              <span className="font-medium">Expiration Date:</span>
              <span className="font-semibold">
                {membershipData.membershipExpires
                  ? new Date(
                      membershipData.membershipExpires
                    ).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>

            <div className="flex justify-between items-center border-b pb-2">
              <span className="font-medium">Payment Method:</span>
              <span className="font-semibold">
                {membershipData.paymentMethod || "Not specified"}
              </span>
            </div>
          </>
        )}

        {!isActive && (
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <h3 className="font-bold text-lg mb-2 text-yellow-800">
              {membershipData.status !== "approved"
                ? "Account Approval Required"
                : "Payment Required"}
            </h3>
            <p className="text-yellow-700 mb-4">
              {membershipData.status !== "approved"
                ? "Your account is pending approval. Please wait for admin approval before making payment."
                : "Please choose a payment method to activate your membership."}
            </p>

            {membershipData.status === "approved" && (
              //               <div className="flex flex-col md:flex-row gap-4">
              //                 {/* Chapa Payment */}
              //                 <button
              //                   onClick={async () => {
              //                     const user = JSON.parse(localStorage.getItem("user"));
              //                     const res = await axios.post(
              //                       "http://localhost:3000/payment/chapa",
              //                       {
              //                         amount: "200",
              //                         email: user.email,
              //                         Name: user.name,
              //                       }
              //                     );
              //                     console.log(res.data.url);
              //                     // window.location.href = res.data.url;
              //                   }}
              //                   className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full"
              //                 >
              //                   Pay Using Chapa
              //                 </button>

              //                 {/* Telebirr Payment Flow */}
              //                 <button
              //                   onClick={async () => {
              //                     const user = JSON.parse(localStorage.getItem("user"));
              //                     const res = await axios.post(
              //                       "http://localhost:3000/payment/telebirr",
              //                       {
              //                         email: user.email,
              //                       }
              //                     );
              //                     alert(`
              // Telebirr Payment Info:
              // - Merchant: ${res.data.merchant}
              // - Short Code: ${res.data.short_code}
              // - Account Number: ${res.data.account_number}

              // ${res.data.instructions}
              //             `);
              //                   }}
              //                   className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded w-full"
              //                 >
              //                   Pay Using Telebirr
              //                 </button>

              //                 {/* Screenshot Upload for Telebirr */}
              //                 <div className="flex flex-col w-full">
              //                   <label className="block text-sm font-medium text-gray-700">
              //                     Upload Telebirr Screenshot
              //                   </label>
              //                   <input
              //                     type="file"
              //                     accept="image/*"
              //                     onChange={async (e) => {
              //                       const file = e.target.files[0];
              //                       const user = JSON.parse(localStorage.getItem("user"));
              //                       const formData = new FormData();
              //                       formData.append("screenshot", file);
              //                       formData.append("email", user.email);
              //                       formData.append("payment_method", "telebirr");

              //                       try {
              //                         await axios.post(
              //                           "http://localhost:3000/payment/telebirr/upload",
              //                           formData,
              //                           {
              //                             headers: { "Content-Type": "multipart/form-data" },
              //                           }
              //                         );
              //                         alert(
              //                           "Telebirr screenshot uploaded. Awaiting admin approval."
              //                         );
              //                       } catch (error) {
              //                         console.error("Upload failed", error);
              //                         alert("Failed to upload screenshot.");
              //                       }
              //                     }}
              //                     className="block mt-1 text-sm border border-gray-300 rounded py-2 px-3"
              //                   />
              //                 </div>
              //               </div>
              //             )}
              //           </div>
              //         )}
              //       </div>
              //     </div>
              //   );
              // }
              <div className="flex flex-col md:flex-row gap-4">
                {/* Chapa Payment */}
                <button
                  onClick={async () => {
                    const user = JSON.parse(localStorage.getItem("user"));
                    try {
                      const res = await axios.post(
                        "http://localhost:3000/payment/chapa",
                        {
                          amount: "200",
                          email: user.email,
                          Name: user.name,
                        }
                      );

                      const checkoutUrl = res.data?.data?.checkout_url;
                      console.log(checkoutUrl);

                      if (checkoutUrl) {
                        window.location.href = checkoutUrl;
                      } else {
                        console.error("Checkout URL not found in response.");
                      }
                    } catch (error) {
                      console.error("Error initiating payment:", error);
                    }
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full shadow-md transition-all duration-300 font-semibold text-sm"
                >
                  Pay with Chapa
                </button>

                {/* Telebirr Payment Flow */}
                <button
                  onClick={async () => {
                    const user = JSON.parse(localStorage.getItem("user"));
                    const res = await axios.post(
                      "http://localhost:3000/payment/telebirr",
                      {
                        email: user.email,
                      }
                    );
                    // Redirect user to the Telebirr payment page with necessary info
                    window.location.href = "/telebirr-payment"; // Adjust this URL as needed
                  }}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-full shadow-md transition-all duration-300 font-semibold text-sm"
                >
                  Pay Using Telebirr
                </button>
              </div>
            )}
            {/* Screenshot Upload Section */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                Upload Payment Screenshot
              </h3>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-300 transition"
              />
              <button
                onClick={handleFormSubmit}
                className="mt-3 bg-green-600 hover:bg-green-700 text-white w-full py-3 rounded-full text-lg font-medium shadow-md transition-all duration-300"
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
        )}
      </div>
    </div>
  );
}
