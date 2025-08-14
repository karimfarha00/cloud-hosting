'use client';
import React , { useState } from 'react';
import {toast} from 'react-toastify';



const AddCommentForm = () => {
    const [text, setText] = useState('');

    const formSubmitHandler = (e: React.FormEvent) => {
        e.preventDefault();
       if(text === "") return toast.error("Please Write Something")
        // You can add more validation here if needed
        console.log({text});
        // Here you can add your login logic, like calling an API
        // For now, we will just log the email and password
        
    };
  return (
    <form onSubmit={formSubmitHandler} className="">
        <input 
        className="rounded-lg text-xl p-2 w-full bg-white focus:shadow-md"
        type="text"
        placeholder='Enter Your Comments ...'
        value={text}
        onChange={(e) => setText(e.target.value)}
        />
<button
className='bg-green-700 text-white mt-2 p-1 w-min text-xl rounded-lg hover:bg-green-900 transition'
type="submit"
>
Comments
</button>

    </form>
  );
};

export default AddCommentForm;
