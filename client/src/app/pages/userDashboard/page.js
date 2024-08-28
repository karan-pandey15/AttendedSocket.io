"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import io from 'socket.io-client';

const socket = io('http://localhost:5010'); // Replace with your server's URL

const DashboardTwoPage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [rideAccepted, setRideAccepted] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (!token) {
            router.push('/pages/userSignin');
        } else if (storedUser) {
            setUser(storedUser);
            setLoading(false);
        } else {
            axios
                .get('http://localhost:5010/api/auth/userdata', {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    setUser(response.data);
                    localStorage.setItem('user', JSON.stringify(response.data));
                    setLoading(false);
                })
                .catch((err) => {
                    console.error('Failed to fetch user data:', err);
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    router.push('/pages/userSignin');
                });
        }

        socket.on('rideAccepted', (rideDetails) => {
            setRideAccepted(rideDetails);
        });

        return () => {
            socket.off('rideAccepted');
        };
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/pages/userSignin');
    };

    const handleRequestRide = () => {
        if (user) {
            socket.emit('rideRequest', { userId: user._id, name: user.name, email: user.email, socketId: socket.id });
        }
    };

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600"><p className="text-white text-lg font-semibold">Loading...</p></div>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-xl p-8 bg-white rounded-xl shadow-lg transition duration-500 ease-in-out transform hover:scale-105">
                <h1 className="text-4xl font-bold text-gray-900 text-center mb-6">
                    User Dashboard
                </h1>
                {user ? (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                                <p className="text-gray-800"><strong className="font-semibold">Name:</strong> {user.name}</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                                <p className="text-gray-800"><strong className="font-semibold">Email:</strong> {user.email}</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                                <p className="text-gray-800"><strong className="font-semibold">Phone:</strong> {user.phone}</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                                <p className="text-gray-800"><strong className="font-semibold">Address:</strong> {user.address}</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                                <p className="text-gray-800"><strong className="font-semibold">City:</strong> {user.city}</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                                <p className="text-gray-800"><strong className="font-semibold">PIN:</strong> {user.pin}</p>
                            </div>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="w-full py-3 px-6 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                        >
                            Logout
                        </button>

                        <button
                            onClick={handleRequestRide}
                            className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            Request Ride
                        </button>

                        {rideAccepted && (
                            <div className="mt-8 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg shadow-md">
                                <h3 className="text-lg font-semibold text-green-700 mb-2">Ride Accepted by:</h3>
                                <p className="text-gray-800"><strong>Name:</strong> {rideAccepted.riderName}</p>
                                <p className="text-gray-800"><strong>Email:</strong> {rideAccepted.riderEmail}</p>
                                <p className="text-gray-800"><strong>Phone:</strong> {rideAccepted.riderPhone}</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <p className="text-gray-700 text-center">No user data available</p>
                )}
            </div>
        </div>
    );
};

export default DashboardTwoPage;
