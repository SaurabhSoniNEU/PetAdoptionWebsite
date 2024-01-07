// Signup.js
import React, { useState } from 'react';
import axios from 'axios';

interface UserData {
    token: string;
    user: {
        username: string;
        role: string;
        // other user fields
    };
}

interface SignupProps {
    onSignup: (userData: UserData) => void;
}

const Signup: React.FC<SignupProps> = ({ onSignup }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://your-backend-url/signup', { username, password });
            onSignup(response.data); // Send the user data back to the parent component
        } catch (error) {
            console.error('Signup error:', error);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
            <button type="submit">Signup</button>
        </form>
    );
};

export default Signup;
