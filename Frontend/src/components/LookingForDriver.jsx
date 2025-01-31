import React from "react";

const LookingForDriver = (props) => {
  return (
    <div>
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => {
          props.setVehicleFound(false);
        }}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl text-center font-semibold mb-5">
        Looking for a Driver
      </h3>

      <div className="flex gap-2 justify-between flex-col items-center">
        <img
          className="h-20"
          src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
          alt=""
        />
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">
                {props.ride?.pickup?.split(",")[0]}
              </h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.ride?.pickup?.split(",").slice(1).join(",")}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">
                {props.ride?.destination?.split(",")[0]}
              </h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.ride?.destination?.split(",").slice(1).join(",")}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">₹{props?.ride?.fare}</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash</p>
            </div>
          </div>
        </div>

        {/* temp for checking next panel */}
        {/* <button
          onClick={() => {
            props.setVehicleFound(false);
            props.setWaitingForDriver(true);
          }}
          className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg"
        >
          Confirm
        </button> */}
      </div>
    </div>
  );
};

export default LookingForDriver;
