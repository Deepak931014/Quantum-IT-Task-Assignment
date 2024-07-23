import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const res = await axios.get('http://localhost:5000/api/users', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUsers(res.data);
            } catch (error) {
                console.error(error);
                navigate('/login');
            }
        };

        fetchUsers();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleDelete = async (userId) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://localhost:5000/api/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(users.filter(user => user._id !== userId));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };


    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
            <div className="w-full max-w-4xl">
                <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                    <h2 className="text-3xl font-semibold text-blue-600 mb-4 text-center">User Dashboard</h2>
                    <div className="flex justify-end mb-4">
                        <button 
                            onClick={handleLogout} 
                            className="bg-red-500 text-white p-2 rounded-md hover:bg-red-700 transition duration-300"
                        >
                            Logout
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                            <thead className="bg-blue-500 text-white">
                                <tr>
                                    <th className="py-3 px-4 border-b text-left">#</th>
                                    <th className="py-3 px-4 border-b text-left">Name</th>
                                    <th className="py-3 px-4 border-b text-left">Date of Birth</th>
                                    <th className="py-3 px-4 border-b text-left">Email</th>
                                    <th className="py-3 px-4 border-b text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={user._id} className="hover:bg-gray-100">
                                        <td className="py-2 px-4 border-b text-center">{index + 1}</td>
                                        <td className="py-2 px-4 border-b">{user.name}</td>
                                        <td className="py-2 px-4 border-b">{new Date(user.dateOfBirth).toLocaleDateString()}</td>
                                        <td className="py-2 px-4 border-b">{user.email}</td>
                                        <td className="py-2 px-4 border-b text-center">
                                            <button 
                                                onClick={() => handleDelete(user._id)}
                                                className="text-red-500 hover:text-red-700 transition duration-300"
                                                aria-label="Delete"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
