//  "use client";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import io from "socket.io-client";

// const socket = io("http://localhost:5010"); // Replace with your server's URL

// const Dashboardpage = () => {
//     const [rider, setRider] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [requests, setRequests] = useState([]);
//     const [acceptedUser, setAcceptedUser] = useState(null);
//     const router = useRouter();

//     useEffect(() => {
//         const token = localStorage.getItem("token");
//         if (!token) {
//             router.push("/pages/AttendedSignin");
//         } else {
//             axios
//                 .get("http://localhost:5010/api/auth/user", {
//                     headers: { Authorization: `Bearer ${token}` },
//                 })
//                 .then((response) => {
//                     setRider(response.data);
//                     setLoading(false);
//                 })
//                 .catch((err) => {
//                     console.error("Failed to fetch rider data:", err);
//                     localStorage.removeItem("token");
//                     router.push("/pages/AttendedSignin");
//                 });
//         }

//         socket.on("newRideRequest", (userData) => {
//             setRequests((prevRequests) => [...prevRequests, userData]);
//         });

//         socket.on("removeRideRequest", (userSocketId) => {
//             setRequests((prevRequests) =>
//                 prevRequests.filter((req) => req.socketId !== userSocketId)
//             );
//         });

//         socket.on("acceptedUserDetails", (userDetails) => {
//             setAcceptedUser(userDetails);
//         });

//         return () => {
//             socket.off("newRideRequest");
//             socket.off("removeRideRequest");
//             socket.off("acceptedUserDetails");
//         };
//     }, [router]);

//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         router.push("/pages/AttendedSignin");
//     };

//     const handleAcceptRide = (request) => {
//         socket.emit("acceptRide", {
//             riderName: rider.name,
//             riderEmail: rider.email,
//             riderPhone: rider.phone,
//             userSocketId: request.socketId,
//             userDetails: {
//                 name: request.name,
//                 email: request.email,
//                 phone: request.phone,
//             },
//         });
//     };

//     if (loading) {
//         return (
//             <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
//                 <p className="text-white text-lg font-semibold">Loading...</p>
//             </div>
//         );
//     }

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-100">
//             <div className="w-full max-w-lg p-8 bg-white rounded-xl shadow-lg transition duration-500 ease-in-out transform hover:scale-105">
//                 <h1 className="text-4xl font-bold text-gray-900 text-center mb-6">
//                     Rider Dashboard
//                 </h1>
//                 {rider ? (
//                     <div className="space-y-6">
//                         <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
//                             <p className="text-lg text-gray-800">
//                                 <strong className="font-semibold">Name:</strong> {rider.name}
//                             </p>
//                             <p className="text-lg text-gray-800">
//                                 <strong className="font-semibold">Email:</strong> {rider.email}
//                             </p>
//                             <p className="text-lg text-gray-800">
//                                 <strong className="font-semibold">Phone:</strong> {rider.phone}
//                             </p>
//                         </div>
//                         <button
//                             onClick={handleLogout}
//                             className="w-full py-3 px-6 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
//                         >
//                             Logout
//                         </button>

//                         <div className="mt-8">
//                             <h2 className="text-2xl font-semibold text-gray-900 mb-4">
//                                 Ride Requests
//                             </h2>
//                             {requests.length > 0 ? (
//                                 requests.map((request, index) => (
//                                     <div
//                                         key={index}
//                                         className="p-4 mb-4 bg-white border-l-4 border-blue-500 rounded-lg shadow-md hover:bg-gray-50 transition duration-300"
//                                     >
//                                         <p className="text-gray-800">
//                                             <strong>User Name:</strong> {request.name}
//                                         </p>
//                                         <p className="text-gray-800">
//                                             <strong>User Email:</strong> {request.email}
//                                         </p>
//                                         <button
//                                             onClick={() => handleAcceptRide(request)}
//                                             className="mt-2 w-full py-2 px-4 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
//                                         >
//                                             Accept Ride
//                                         </button>
//                                     </div>
//                                 ))
//                             ) : (
//                                 <p className="text-gray-500">No ride requests at the moment.</p>
//                             )}
//                         </div>

//                         {acceptedUser && (
//                             <div className="mt-8 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg shadow-md">
//                                 <h3 className="text-lg font-semibold text-blue-700 mb-2">
//                                     Accepted User Details:
//                                 </h3>
//                                 <p className="text-gray-800">
//                                     <strong>Name:</strong> {acceptedUser.name}
//                                 </p>
//                                 <p className="text-gray-800">
//                                     <strong>Email:</strong> {acceptedUser.email}
//                                 </p>
//                                 <p className="text-gray-800">
//                                     <strong>Phone:</strong> {acceptedUser.phone}
//                                 </p>
//                             </div>
//                         )}
//                     </div>
//                 ) : (
//                     <p className="text-gray-700 text-center">
//                         No rider data available
//                     </p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Dashboardpage;


// // frontend/pages/RiderDashboard.js
// "use client";
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import Cookies from 'js-cookie';
// import io from 'socket.io-client'; // Import Socket.IO client

// const socket = io('http://localhost:5010'); // Replace with your server's URL

// const Dashboardpage = () => {
//     const [rider, setRider] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [requests, setRequests] = useState([]);
//     const router = useRouter();

//     useEffect(() => {
//         const token = Cookies.get('token');
//         if (!token) {
//             router.push('/pages/AttendedSignin');
//         } else {
//             axios
//                 .get('http://localhost:5010/api/auth/user', {
//                     headers: { Authorization: `Bearer ${token}` },
//                 })
//                 .then((response) => {
//                     setRider(response.data);
//                     setLoading(false);
//                 })
//                 .catch((err) => {
//                     console.error('Failed to fetch rider data:', err);
//                     Cookies.remove('token');
//                     router.push('/pages/AttendedSignin');
//                 });
//         }

//         // Listen for new ride requests
//         socket.on('newRideRequest', (userData) => {
//             setRequests((prevRequests) => [...prevRequests, userData]);
//         });

//         // Cleanup
//         return () => {
//             socket.off('newRideRequest');
//         };
//     }, [router]);

//     const handleLogout = () => {
//         Cookies.remove('token');
//         router.push('/pages/AttendedSignin');
//     };

//     const handleAcceptRide = (request) => {
//         socket.emit('acceptRide', {
//             riderName: rider.name,
//             riderEmail: rider.email,
//             riderPhone: rider.phone,
//             userSocketId: request.socketId,
//         });
//         setRequests(requests.filter((req) => req.userId !== request.userId)); // Remove accepted request from list
//     };

//     if (loading) {
//         return <div className="flex items-center justify-center min-h-screen bg-gray-100"><p className="text-gray-500">Loading...</p></div>;
//     }

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-100">
//             <div className="w-full max-w-md p-6 space-y-4 bg-white rounded-lg shadow-lg">
//                 <h1 className="text-3xl font-bold text-gray-900 text-center">Rider Dashboard</h1>
//                 {rider ? (
//                     <div className="space-y-4">
//                         <p className="text-lg text-gray-700"><strong className="font-semibold">Name:</strong> {rider.name}</p>
//                         <p className="text-lg text-gray-700"><strong className="font-semibold">Email:</strong> {rider.email}</p>
//                         <p className="text-lg text-gray-700"><strong className="font-semibold">Phone:</strong> {rider.phone}</p>
//                         <button
//                             onClick={handleLogout}
//                             className="w-full py-2 px-4 bg-red-600 text-white rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
//                         >
//                             Logout
//                         </button>

//                         <div className="mt-4">
//                             <h2 className="text-xl font-semibold text-gray-900">Ride Requests</h2>
//                             {requests.length > 0 ? (
//                                 requests.map((request, index) => (
//                                     <div key={index} className="mt-2 p-4 bg-gray-100 rounded-md">
//                                         <p className="text-gray-700"><strong>User Name:</strong> {request.name}</p>
//                                         <p className="text-gray-700"><strong>User Email:</strong> {request.email}</p>
//                                         <button
//                                             onClick={() => handleAcceptRide(request)}
//                                             className="mt-2 w-full py-2 px-4 bg-green-600 text-white rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
//                                         >
//                                             Accept Ride
//                                         </button>
//                                     </div>
//                                 ))
//                             ) : (
//                                 <p className="text-gray-500">No ride requests at the moment.</p>
//                             )}
//                         </div>
//                     </div>
//                 ) : (
//                     <p className="text-gray-700 text-center">No rider data available</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Dashboardpage;



"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import io from "socket.io-client";

const socket = io("http://localhost:5010"); // Replace with your server's URL

const Dashboardpage = () => {
    const [rider, setRider] = useState(null);
    const [loading, setLoading] = useState(true);
    const [requests, setRequests] = useState([]);
    const [acceptedUser, setAcceptedUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/pages/AttendedSignin");
        } else {
            axios
                .get("http://localhost:5010/api/auth/user", {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    setRider(response.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Failed to fetch rider data:", err);
                    localStorage.removeItem("token");
                    router.push("/pages/AttendedSignin");
                });
        }

        socket.on("newRideRequest", (userData) => {
            setRequests((prevRequests) => [...prevRequests, userData]);
        });

        socket.on("removeRideRequest", (userSocketId) => {
            setRequests((prevRequests) =>
                prevRequests.filter((req) => req.socketId !== userSocketId)
            );
        });

        socket.on("acceptedUserDetails", (userDetails) => {
            setAcceptedUser(userDetails);
        });

        return () => {
            socket.off("newRideRequest");
            socket.off("removeRideRequest");
            socket.off("acceptedUserDetails");
        };
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/pages/AttendedSignin");
    };

    const handleAcceptRide = (request) => {
        socket.emit("acceptRide", {
            riderName: rider.name,
            riderEmail: rider.email,
            riderPhone: rider.phone,
            userSocketId: request.socketId,
            userDetails: {
                name: request.name,
                email: request.email,
                phone: request.phone,
            },
        });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
                <p className="text-white text-lg font-semibold">Loading...</p>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-lg p-8 bg-white rounded-xl shadow-lg transition duration-500 ease-in-out transform hover:scale-105">
                <h1 className="text-4xl font-bold text-gray-900 text-center mb-6">
                    Rider Dashboard
                </h1>
                {rider ? (
                    <div className="space-y-6">
                        <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                            <p className="text-lg text-gray-800">
                                <strong className="font-semibold">Name:</strong> {rider.name}
                            </p>
                            <p className="text-lg text-gray-800">
                                <strong className="font-semibold">Email:</strong> {rider.email}
                            </p>
                            <p className="text-lg text-gray-800">
                                <strong className="font-semibold">Phone:</strong> {rider.phone}
                            </p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="w-full py-3 px-6 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                        >
                            Logout
                        </button>

                        <div className="mt-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                Ride Requests
                            </h2>
                            {requests.length > 0 ? (
                                requests.map((request, index) => (
                                    <div
                                        key={index}
                                        className="p-4 mb-4 bg-white border-l-4 border-blue-500 rounded-lg shadow-md hover:bg-gray-50 transition duration-300"
                                    >
                                        <p className="text-gray-800">
                                            <strong>User Name:</strong> {request.name}
                                        </p>
                                        <p className="text-gray-800">
                                            <strong>User Email:</strong> {request.email}
                                        </p>
                                        <button
                                            onClick={() => handleAcceptRide(request)}
                                            className="mt-2 w-full py-2 px-4 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                                        >
                                            Accept Ride
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500">No ride requests at the moment.</p>
                            )}
                        </div>

                        {acceptedUser && (
                            <div className="mt-8 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg shadow-md">
                                <h3 className="text-lg font-semibold text-blue-700 mb-2">
                                    Accepted User Details:
                                </h3>
                                <p className="text-gray-800">
                                    <strong>Name:</strong> {acceptedUser.name}
                                </p>
                                <p className="text-gray-800">
                                    <strong>Email:</strong> {acceptedUser.email}
                                </p>
                                <p className="text-gray-800">
                                    <strong>Phone:</strong> {acceptedUser.phone}
                                </p>
                            </div>
                        )}
                    </div>
                ) : (
                    <p className="text-gray-700 text-center">
                        No rider data available
                    </p>
                )}
            </div>
        </div>
    );
};

export default Dashboardpage;
