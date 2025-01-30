import React from "react";

const ConfirmRide = (props) => {
  return (
    <div>
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => {
          props.setConfirmRidePanel(false);
        }}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl text-center font-semibold mb-5">Confirm your Ride</h3>

      <div className="flex gap-2 justify-between flex-col items-center">
        {props.vehicleType === "car" ? (
          <img
            className="h-20"
            src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
            alt=""
          />
        ) : props.vehicleType === "motorcycle" ? (
          <img
            className="h-20"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
            alt=""
          />
        ) : props.vehicleType === "auto" ? (
          <img
            className="h-20"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
            alt=""
          />
        ) : null}

        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">
                {props?.pickup?.split(",")[0]}
              </h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props?.pickup?.split(",").slice(1).join(",")}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">
                {props?.destination?.split(",")[0]}
              </h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props?.destination?.split(",").slice(1).join(",")}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between p-3">
            <i className="ri-currency-line"></i>

            <div className="text-center">
              <h3 className="text-lg font-medium">
                ₹{props.fare[props.vehicleType]}
              </h3>
              <p className="text-sm -mt-1 text-gray-600">Cash</p>
            </div>

            <div className="text-center">
              <h3 className="text-lg font-medium">Distance</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props?.distanceAndTime?.distance?.text}
              </p>
            </div>

            <div className="text-center">
              <h3 className="text-lg font-medium">Time</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props?.distanceAndTime?.duration?.text}
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            props.setVehicleFound(true);
            props.setConfirmRidePanel(false);
            props.createRide();
          }}
          className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmRide;
