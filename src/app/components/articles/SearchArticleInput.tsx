'use client';
import React , { useState } from 'react';
import {useRouter} from 'next/navigation';



const SearchArticleInput = () => {
    const [searchText, setSearchText] = useState('');
    const router = useRouter();

    const formSubmitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        
        // You can add more validation here if needed
        console.log({searchText});
        // Here you can add your login logic, like calling an API
        // For now, we will just log the email and password
        router.push(`/article/search?searchText=${searchText}`);
    };
  return (
    <div className='flex justify-center items-center  w-full md:w-2/2 m-auto'>
    <form onSubmit={formSubmitHandler} className=" justify-center items-center my-5 w-full md:w-2/3 m-auto">
        <input 
        className="w-full p-3 rounded text-xl border-none text-gray-900 bg-white"
        type="search"
        placeholder='Search For Articles'
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        />



        
    </form>
    </div>
  );
};

export default SearchArticleInput;

