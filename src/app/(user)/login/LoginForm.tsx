'use client';
import React , { useState } from 'react';
import  { toast } from 'react-toastify';
import {useRouter} from 'next/navigation';


const LoginForm = () => {
  const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const formSubmitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        if(email ==="") return toast.error("Email is required");
        if(password ==="") return toast.error("Password is required");
        // You can add more validation here if needed
        console.log({email,password});
        // Here you can add your login logic, like calling an API
        // For now, we will just log the email and password
        router.replace('/');
    };
  return (
    <form onSubmit={formSubmitHandler} className="flex flex-col">
        <input className="mb-4 border rounded p-2 text-xl"
        type="email"
        placeholder='Enter Your Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />

<input className="mb-4 border rounded p-2 text-xl"
        type="password"
        placeholder='Enter Your Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />

        <button type='submit' className="bg-blue-500 text-white rounded p-2 mt-4">
          Login
        </button>
    </form>
  );
};

export default LoginForm;
