import React, { useEffect, useState } from 'react';
import axios from '../../api/getUser';

const Test = () => {
    const [isVideoVisible, setIsVideoVisible] = useState(false);
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/api/all-users');
                setUsers(response.data.users || []);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        
        fetchUsers();
    }, []);

    return (
        <>
        
        <div className="container mx-auto p-4">
            {/* Video Button */}
            <div className="mb-6 flex justify-end">
                <button
                    onClick={() => setIsVideoVisible(true)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
                >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                    </svg>
                    Watch Presentation Video
                </button>
            </div>

            {/* Video Modal */}
            {isVideoVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="relative w-full max-w-4xl">
                        <button
                            onClick={() => setIsVideoVisible(false)}
                            className="absolute -top-10 right-0 text-white hover:text-gray-300"
                        >
                            <span className="text-2xl">&times;</span>
                        </button>
                        <div className="aspect-w-16 aspect-h-9 bg-black">
                            <video 
                                controls 
                                autoPlay 
                                className="w-full"
                            >
                                <source src="/video-presentatif.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                </div>
            )}

            {/* Rest of your existing JSX */}
            <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Users List</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                <thead>
    <tr className="bg-gray-100">
        <th className="py-2 px-4 border-b text-center">ID</th>
        <th className="py-2 px-4 border-b text-center">Name</th>
        <th className="py-2 px-4 border-b text-center">Email</th>
        <th className="py-2 px-4 border-b text-center">Role</th>
        <th className="py-2 px-4 border-b text-center">Status</th>
    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                            <td className="py-2 px-4 border-b text-center">{user.id}</td>
                            <td className="py-2 px-4 border-b text-center">{user.name}</td>
                            <td className="py-2 px-4 border-b text-center">{user.email}</td>
                            <td className="py-2 px-4 border-b text-center">
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                    user.role === 'admin' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                                }`}>
                                    {user.role}
                                </span>
                            </td>
                            <td className="py-2 px-4 border-b text-center">
                                {user.status}
                            </td>
                        </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>
            {/* ... rest of your component ... */}
        </div>
        </>
    );
};

export default Test;