import React, { useContext } from "react";
import { CaptainDataContext } from "../context/CapatainContext";

const CaptainDetails = () => {
  const { captain } = useContext(CaptainDataContext);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start gap-3">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src="https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"
            alt=""
          />
          <h4 className="text-lg font-medium capitalize">
            {/* {captain.fullname.firstname + " " + captain.fullname.lastname} */}
            {`Nirzar Patel`}
          </h4>
        </div>
        <div>
          <h4 className="text-xl font-semibold">₹295.20</h4>
          <p className="text-sm text-gray-600">Earned</p>
        </div>
      </div>
      <div className="flex p-3 mt-8 bg-gray-100 rounded-xl justify-center gap-5 items-start">
        <div className="text-center">
          <i className="text-3xl mb-2 font-thin ri-time-line"></i>
          <h5 className="text-lg font-medium">10.20</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
        <div className="text-center">
          <i className="text-3xl mb-2 font-thin ri-pin-distance-line"></i>
          <h5 className="text-lg font-medium">92.60</h5>
          <p className="text-sm text-gray-600">Total Distance</p>
        </div>
        <div className="text-center">
          <i className="text-3xl mb-2 font-thin ri-money-rupee-circle-line"></i>
          <h5 className="text-lg font-medium">764.23</h5>
          <p className="text-sm text-gray-600">Today's Earning</p>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;
