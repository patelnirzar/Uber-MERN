import React from "react"
import {Link} from "react-router-dom"

const Start = (props) => {
  return (
    <div>
      <div className="bg-cover bg-[url(https://media.istockphoto.com/id/474341914/photo/semaphore.jpg?s=612x612&w=0&k=20&c=JdTJ_38PrdcT6HMePBLM8WlMsTl98OopUfjR-R3YRjQ=)] h-screen pt-8 flex justify-between flex-col w-full bg-red-400">
        <img
          className="w-16 ml-8"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <div className="bg-white pb-7 py-4 px-4">
          <h2 className="text-3xl font-bold">Get started with Uber</h2>
          <Link to='/login' className="inline-block text-center w-full bg-black text-white py-3 rounded mt-5">
            Continue
          </Link>
              
        </div>
      </div>
    </div>
  );
};

export default Start;
