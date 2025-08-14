'use client';
import React , { useState } from 'react';
import  { toast } from 'react-toastify';


const AddArticlesForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const formSubmitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        if(title ==="") return toast.error("Title is required");
        if(description ==="") return toast.error("Description is required");
        // You can add more validation here if needed
        console.log({title,description});
        // Here you can add your login logic, like calling an API
        // For now, we will just log the email and password
        
    };
  return (
    <form onSubmit={formSubmitHandler} className="flex flex-col">
        <input className="mb-4 border rounded p-2 text-xl bg-white"
        type="text"
        placeholder='Enter Article Title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        />

<textarea className="mb-4 p-2 lg:text-xl rounded resize-none bg-white"
        rows={5}
        placeholder='Enter Article Description'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>

        <button type='submit' className="text-2xl text-white bg-blue-700 hover:bg-blue-900 p-2 rounded-lg font-bold">
          Add
        </button>
    </form>
  );
};

export default AddArticlesForm;
