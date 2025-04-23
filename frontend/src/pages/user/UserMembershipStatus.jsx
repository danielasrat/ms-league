import { useEffect, useState } from 'react';
import axios from 'axios';

export default function UserMembershipStatus() {
  const [membershipData, setMembershipData] = useState({
    hasPaid: false,
    daysLeft: 0,
    membershipExpires: null,
    paymentMethod: '',
    status: 'pending'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMembershipStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/users/membership-status', {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        // Ensure we're getting the expected data structure
        if (response.data) {
          setMembershipData({
            hasPaid: response.data.hasPaid || false,
            daysLeft: response.data.daysLeft || 0,
            membershipExpires: response.data.membershipExpires || null,
            paymentMethod: response.data.paymentMethod || '',
            status: response.data.status || 'pending'
          });
        }
      } catch (err) {
        console.error('Error fetching membership status:', err);
        setError('Failed to load membership status. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchMembershipStatus();
  }, []);

  if (loading) return <div className="text-center py-4">Loading membership status...</div>;
  if (error) return <div className="text-red-500 text-center py-4">{error}</div>;

  // Calculate if membership is active (both paid and approved)
  const isActive = membershipData.hasPaid && membershipData.status === 'approved';

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Membership Status</h2>
      
      <div className="space-y-4">
        {/* Account Status */}
        <div className="flex justify-between items-center border-b pb-2">
          <span className="font-medium">Account Status:</span>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
            membershipData.status === 'approved' ? 'bg-green-100 text-green-800' :
            membershipData.status === 'rejected' ? 'bg-red-100 text-red-800' :
            'bg-yellow-100 text-yellow-800'
          }`}>
            {membershipData.status.charAt(0).toUpperCase() + membershipData.status.slice(1)}
          </span>
        </div>

        {/* Payment Status */}
        <div className="flex justify-between items-center border-b pb-2">
          <span className="font-medium">Payment Status:</span>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
            membershipData.hasPaid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {membershipData.hasPaid ? 'Paid(Active)' : 'Unpaid(Inactive)'}
          </span>
        </div>

        {/* Active Membership Details */}
        {isActive && (
          <>
            <div className="flex justify-between items-center border-b pb-2">
              <span className="font-medium">Days Remaining:</span>
              <span className="font-semibold">
                {membershipData.daysLeft > 0 ? membershipData.daysLeft : 'Expired'}
              </span>
            </div>

            <div className="flex justify-between items-center border-b pb-2">
              <span className="font-medium">Expiration Date:</span>
              <span className="font-semibold">
                {membershipData.membershipExpires 
                  ? new Date(membershipData.membershipExpires).toLocaleDateString() 
                  : 'N/A'}
              </span>
            </div>

            <div className="flex justify-between items-center border-b pb-2">
              <span className="font-medium">Payment Method:</span>
              <span className="font-semibold">
                {membershipData.paymentMethod || 'Not specified'}
              </span>
            </div>
          </>
        )}

        {/* Inactive Membership Message */}
        {!isActive && (
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <h3 className="font-bold text-lg mb-2 text-yellow-800">
              {membershipData.status !== 'approved' 
                ? 'Account Approval Required' 
                : 'Payment Required'}
            </h3>
            <p className="text-yellow-700 mb-4">
              {membershipData.status !== 'approved'
                ? 'Your account is pending approval. Please wait for admin approval before making payment.'
                : 'Your membership is inactive. Please complete payment to activate your membership.'}
            </p>
            
            {membershipData.status === 'approved' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition">
                  Credit Card
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition">
                  Bank Transfer
                </button>
                <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded transition">
                  Mobile Payment
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}