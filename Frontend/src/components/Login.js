import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await axios.post('http://localhost:5000/api/users/login', { email, password });
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
        } catch (error) {
            setError('Invalid email or password');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-blue-900 h-screen flex items-center justify-center">
            <div className="bg-white rounded-lg p-8 shadow-md w-full max-w-sm">
                <h2 className="text-center text-2xl font-semibold mb-4 text-blue-500">SIGN IN</h2>
                <div className="relative flex justify-center mb-4">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541" alt="User" className="w-24 h-24 rounded-full" />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="flex items-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-500 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.687a2 2 0 112.828 2.828L16.862 7.313m0 0L21 12m-4.138 4.138L21 16.862M16.862 4.487l-1.687-1.687a2 2 0 10-2.828 2.828L16.862 7.313m0 0L12 12m-4.138-4.138L12 7.313m0 0L7.172 2.828a2 2 0 00-2.828 2.828L7.172 7.313m0 0L12 12m-4.138 4.138L12 16.862m0 0L7.172 21.313a2 2 0 002.828 2.828L7.172 21.313m0 0L12 16.862m4.138 4.138L12 21.313m0 0L16.862 16.862m-4.138-4.138L16.862 12m4.138 4.138L21 12m-4.138-4.138L12 7.313m0 0L7.172 2.828m0 0L12 7.313m4.138 4.138L12 12m-4.138 4.138L7.172 16.862m0 0L12 12m-4.138-4.138L12 7.313" />
                        </svg>
                        <input 
                            type="email" 
                            id="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder="Email"
                            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            required 
                        />
                    </div>
                    <div className="flex items-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-500 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-7.833-5.167c-1.609-1.609-1.609-4.215 0-5.824 1.609-1.609 4.215-1.609 5.824 0 1.609 1.609 1.609 4.215 0 5.824-1.609 1.609-4.215 1.609-5.824 0z" />
                        </svg>
                        <input 
                            type="password" 
                            id="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="Password"
                            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            required 
                        />
                    </div>
                    <div className="flex justify-between mb-4">
                        <label htmlFor="remember" className="flex items-center">
                            <input type="checkbox" id="remember" className="mr-2" />
                            Remember me
                        </label>
                        <a href="#" className="text-blue-500">Forgot your password?</a>
                    </div>
                    <button 
                        type="submit" 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md w-full"
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'LOGIN'}
                    </button>
                </form>
                {error && (
                    <p className="mt-4 text-red-500 text-center" role="alert">
                        {error}
                    </p>
                )}
                <p className="mt-4 text-center">
                    Don't have an account? <Link to="/register" className="text-blue-500">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;