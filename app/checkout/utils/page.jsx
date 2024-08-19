'use client';

import { useRouter } from 'next/router'; // Import useRouter from next/router
import { useEffect, useState } from 'react';
import getStripe from './get-stripe';

const CheckoutPage = () => {
  const router = useRouter();
  const session_id = new URLSearchParams(window.location.search).get('session_id');

  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCheckoutSession = async () => {
      if (!session_id) return;
      try {
        const res = await fetch(`/api/checkout_session?session_id=${session_id}`);
        const sessionData = await res.json();

        if (res.ok) {
          setSession(sessionData);
        } else {
          setError(sessionData.error);
        }
      } catch (error) {
        setError('An error occurred');
      } finally {
        setLoading(false);
      }
    };
    fetchCheckoutSession();
  }, [session_id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-t-4 border-gray-200 border-solid rounded-full animate-spin border-t-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="p-4 bg-red-100 text-red-700 rounded-lg border border-red-300">
          <p className="text-lg font-semibold">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen p-4">
      {session.payment_status === 'paid' ? (
        <div className="p-6 bg-green-100 text-green-700 rounded-lg border border-green-300">
          <p className="text-lg font-semibold">Thank you for your purchase!</p>
          <p>Your payment was successful.</p>
        </div>
      ) : (
        <div className="p-6 bg-red-100 text-red-700 rounded-lg border border-red-300">
          <p className="text-lg font-semibold">Payment Unsuccessful</p>
          <p>Unfortunately, your payment could not be processed.</p>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
