import React from "react";
// import appwriteService from "../appwrite/setup";
import { Link } from "react-router-dom";

function PostCard({$id, title}) {
    
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full hover:p-3.5 bg-gray-100 rounded-xl p-4'>
            <h2 className='text-xl font-bold'>{title}</h2>
        </div>
    </Link>
  )
}


export default PostCard;