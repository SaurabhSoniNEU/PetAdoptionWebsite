import React, { useState } from 'react';
import axios from 'axios';
interface UserData {
    token: string;
    user: {
        username: string;
        role: string;
        // Add other user fields as needed
    };
}

interface LoginProps {
    onLogin: (userData: UserData) => void;
}
const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://your-backend-url/login', { username, password });
            onLogin(response.data); // Send the user data back to the parent component
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
