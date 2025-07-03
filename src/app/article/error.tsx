"use client";
import Link from "next/link";

interface ErrorPageProps{
    error:Error;
    reset:()=> void;
}

const ArticleErrorPage = ({error,reset}:ErrorPageProps) => {
  return (
    <div className="fix-height pt-7 text-center ">
        <p className="mb-2 ">This is cutom Error Page for Articles Route/Page</p>
      <div className="text-3xl text-red-600 font-semibold">
        Something went wrong
      </div>
      <h2 className="text-gray-700 my-3 text-xl">
        Error Message:{error.message}
      </h2>
      <button onClick={()=>reset()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
        Try Again 
      </button>
      <Link className="text-xl underline text-blue-700 block mt-6" href="/">
        Go To Home Page
      </Link>
    </div>
  );
};

export default ArticleErrorPage;
