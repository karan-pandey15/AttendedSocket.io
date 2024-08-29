// "use client";
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import io from 'socket.io-client';

// const socket = io('http://localhost:5010'); 

// const DashboardTwoPage = () => {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [rideAccepted, setRideAccepted] = useState(null);
//     const [pickupLocation, setPickupLocation] = useState('');
//     const [dropLocation, setDropLocation] = useState('');
//     const [showRequestForm, setShowRequestForm] = useState(false);
//     const router = useRouter();

//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         const storedUser = JSON.parse(localStorage.getItem('user'));

//         if (!token) {
//             router.push('/pages/userSignin');
//         } else if (storedUser) {
//             setUser(storedUser);
//             setLoading(false);
//         } else {
//             axios
//                 .get('http://localhost:5010/api/auth/user', {
//                     headers: { Authorization: `Bearer ${token}` },
//                 })
//                 .then((response) => {
//                     setUser(response.data);
//                     localStorage.setItem('user', JSON.stringify(response.data));
//                     setLoading(false);
//                 })
//                 .catch((err) => {
//                     console.error('Failed to fetch user data:', err);
//                     localStorage.removeItem('token');
//                     localStorage.removeItem('user');
//                     router.push('/pages/userSignin');
//                 });
//         }

//         const storedRideAccepted = JSON.parse(localStorage.getItem('rideAccepted')) || null;
//         setRideAccepted(storedRideAccepted);

//         socket.on('rideAccepted', (rideDetails) => {
//             setRideAccepted(rideDetails);
//             localStorage.setItem('rideAccepted', JSON.stringify(rideDetails));
//         });

//         return () => {
//             socket.off('rideAccepted');
//         };
//     }, [router]);

//     const handleLogout = () => {
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         localStorage.removeItem('rideAccepted');
//         router.push('/pages/userSignin');
//     };

//     const handleRequestRide = () => {
//         if (user) {
//             setShowRequestForm(true);
//         }
//     };

//     const handleSubmitRequest = () => {
//         if (user && pickupLocation && dropLocation) {
//             socket.emit('rideRequest', {
//                 userId: user._id,
//                 name: user.name,
//                 email: user.email,
//                 phone: user.phone,
//                 pickupLocation,
//                 dropLocation,
//                 socketId: socket.id
//             });
//             setShowRequestForm(false);
//             setPickupLocation('');
//             setDropLocation('');
//         }
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
//             <div className="w-full max-w-xl p-8 bg-white rounded-xl shadow-lg transition duration-500 ease-in-out transform hover:scale-105">
//                 <h1 className="text-4xl font-bold text-gray-900 text-center mb-6">User Dashboard</h1>
//                 {user ? (
//                     <div className="space-y-6">
//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                             <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
//                                 <p className="text-gray-800"><strong className="font-semibold">Name:</strong> {user.name}</p>
//                             </div>
//                             <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
//                                 <p className="text-gray-800"><strong className="font-semibold">Email:</strong> {user.email}</p>
//                             </div>
//                             <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
//                                 <p className="text-gray-800"><strong className="font-semibold">Phone:</strong> {user.phone}</p>
//                             </div>
//                             <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
//                                 <p className="text-gray-800"><strong className="font-semibold">Address:</strong> {user.address}</p>
//                             </div>
//                             <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
//                                 <p className="text-gray-800"><strong className="font-semibold">City:</strong> {user.city}</p>
//                             </div>
//                             <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
//                                 <p className="text-gray-800"><strong className="font-semibold">PIN:</strong> {user.pin}</p>
//                             </div>
//                         </div>

//                         <button
//                             onClick={handleLogout}
//                             className="w-full py-3 px-6 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
//                         >
//                             Logout
//                         </button>

//                         <button
//                             onClick={handleRequestRide}
//                             className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
//                         >
//                             Request Ride
//                         </button>

//                         {showRequestForm && (
//                             <div className="mt-8 p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-md">
//                                 <h2 className="text-2xl font-semibold text-gray-900 mb-4">Ride Request</h2>
//                                 <div className="space-y-4">
//                                     <div>
//                                         <label className="block text-gray-700 font-semibold mb-2" htmlFor="pickup">Your Pickup Location:</label>
//                                         <input
//                                             type="text"
//                                             id="pickup"
//                                             value={pickupLocation}
//                                             onChange={(e) => setPickupLocation(e.target.value)}
//                                             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                         />
//                                     </div>
//                                     <div>
//                                         <label className="block text-gray-700 font-semibold mb-2" htmlFor="drop">Your Drop Location:</label>
//                                         <input
//                                             type="text"
//                                             id="drop"
//                                             value={dropLocation}
//                                             onChange={(e) => setDropLocation(e.target.value)}
//                                             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                         />
//                                     </div>
//                                     <button
//                                         onClick={handleSubmitRequest}
//                                         className="w-full py-3 px-6 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
//                                     >
//                                         Submit Request
//                                     </button>
//                                 </div>
//                             </div>
//                         )}

//                         {rideAccepted && (
//                             <div className="mt-8 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg shadow-md">
//                                 <h3 className="text-lg font-semibold text-green-700 mb-2">Ride Accepted by:</h3>
//                                 <p className="text-gray-800"><strong>Name:</strong> {rideAccepted.riderName}</p>
//                                 <p className="text-gray-800"><strong>Email:</strong> {rideAccepted.riderEmail}</p>
//                                 <p className="text-gray-800"><strong>Phone:</strong> {rideAccepted.riderPhone}</p>
//                                 <p className="text-gray-800"><strong>Pickup Location:</strong> {rideAccepted.pickupLocation}</p>
//                                 <p className="text-gray-800"><strong>Drop Location:</strong> {rideAccepted.dropLocation}</p>
//                             </div>
//                         )}
//                     </div>
//                 ) : (
//                     <p className="text-gray-700 text-center">No user data available</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default DashboardTwoPage;



"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import io from 'socket.io-client';
import classNames from 'classnames';
import TopNavbar from '@/app/components/topnavbar/page';

const socket = io('http://localhost:5010');

const DashboardTwoPage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [rideAccepted, setRideAccepted] = useState(null);
    const [pickupLocation, setPickupLocation] = useState('');
    const [dropLocation, setDropLocation] = useState('');
    const [showRequestForm, setShowRequestForm] = useState(false);
    const [activeTab, setActiveTab] = useState('profile');
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

        const storedRideAccepted = JSON.parse(localStorage.getItem('rideAccepted')) || null;
        setRideAccepted(storedRideAccepted);

        socket.on('rideAccepted', (rideDetails) => {
            setRideAccepted(rideDetails);
            localStorage.setItem('rideAccepted', JSON.stringify(rideDetails));
        });

        return () => {
            socket.off('rideAccepted');
        };
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('rideAccepted');
        router.push('/pages/userSignin');
    };

    const handleRequestRide = () => {
        if (user) {
            setShowRequestForm(true);
        }
    };

    const handleSubmitRequest = () => {
        if (user && pickupLocation && dropLocation) {
            socket.emit('rideRequest', {
                userId: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                pickupLocation,
                dropLocation,
                socketId: socket.id
            });
            setShowRequestForm(false);
            setPickupLocation('');
            setDropLocation('');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
                <p className="text-white text-lg font-semibold">Loading...</p>
            </div>
        );
    }

    return (
       <>
       <TopNavbar />
       <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 text-white flex-shrink-0">
                <div className="p-6">
                    <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
                    <nav className="space-y-4">
                        <button
                            onClick={() => setActiveTab('profile')}
                            className={classNames("w-full py-2 px-4 text-left", {
                                'bg-gray-700': activeTab === 'profile',
                                'hover:bg-gray-700': activeTab !== 'profile'
                            })}
                        >
                            My Profile
                        </button>
                        <button
                            onClick={() => setActiveTab('booking')}
                            className={classNames("w-full py-2 px-4 text-left", {
                                'bg-gray-700': activeTab === 'booking',
                                'hover:bg-gray-700': activeTab !== 'booking'
                            })}
                        >
                            My Booking
                        </button>
                        <button
                            onClick={() => setActiveTab('totalBookings')}
                            className={classNames("w-full py-2 px-4 text-left", {
                                'bg-gray-700': activeTab === 'totalBookings',
                                'hover:bg-gray-700': activeTab !== 'totalBookings'
                            })}
                        >
                            Total Bookings
                        </button>
                        <button
                            onClick={handleLogout}
                            className="w-full py-2 px-4 text-left bg-red-600 hover:bg-red-700"
                        >
                            Logout
                        </button>
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                {activeTab === 'profile' && (
                    <div className="w-full max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                        <h2 className="text-3xl font-bold mb-6">My Profile</h2>
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
                            </div>
                        ) : (
                            <p className="text-gray-700 text-center">No user data available</p>
                        )}
                    </div>
                )}

                {activeTab === 'booking' && (
                    <div className="w-full max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                        <h2 className="text-3xl font-bold mb-6">My Booking</h2>
                        <button
                            onClick={handleRequestRide}
                            className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                        >
                            Request Ride
                        </button>

                        {showRequestForm && (
                            <div className="mt-8 p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-md">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Ride Request</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="pickup">Your Pickup Location:</label>
                                        <input
                                            type="text"
                                            id="pickup"
                                            value={pickupLocation}
                                            onChange={(e) => setPickupLocation(e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="drop">Your Drop Location:</label>
                                        <input
                                            type="text"
                                            id="drop"
                                            value={dropLocation}
                                            onChange={(e) => setDropLocation(e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <button
                                        onClick={handleSubmitRequest}
                                        className="w-full py-3 px-6 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition duration-300"
                                    >
                                        Submit Request
                                    </button>
                                </div>
                            </div>
                        )}

                        {rideAccepted && (
                            <div className="mt-8 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg shadow-md">
                                <h3 className="text-lg font-semibold text-green-700 mb-2">Ride Accepted by:</h3>
                                <p className="text-gray-800"><strong>Name:</strong> {rideAccepted.riderName}</p>
                                <p className="text-gray-800"><strong>Email:</strong> {rideAccepted.riderEmail}</p>
                                <p className="text-gray-800"><strong>Phone:</strong> {rideAccepted.riderPhone}</p>
                                <p className="text-gray-800"><strong>Pickup Location:</strong> {rideAccepted.pickupLocation}</p>
                                <p className="text-gray-800"><strong>Drop Location:</strong> {rideAccepted.dropLocation}</p>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'totalBookings' && (
                    <div className="w-full max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                        <h2 className="text-3xl font-bold mb-6">Total Bookings</h2>
                        {/* Here you would display a list of total bookings */}
                        <p className="text-gray-700">Total bookings will be displayed here.</p>
                    </div>
                )}
            </main>
        </div>
       </>
    );
};

export default DashboardTwoPage;
