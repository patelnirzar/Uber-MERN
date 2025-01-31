import React, { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import axios from "axios";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import { SocketContext } from "../context/SocketContext";
import { useContext } from "react";
import { UserDataContext } from "../context/UserContext";
import { use } from "react";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";

function Home() {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
  const [ride, setRide] = useState(null);
  const [distanceAndTime, setDistanceAndTime] = useState({});

  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  
  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);

  const navigate = useNavigate();

  //connect with socket 
  useEffect(() => { 
    console.log(user._id)
    socket.emit("join", { userType: "user", userId: user._id });
  }, [user]);
  
  //trigger when captain confirm the ride 
  socket.on("ride-confirmed", (ride) => {
    setVehicleFound(false);
    setWaitingForDriver(true);
    setRide(ride);
  });

  //trigger when ride is started
  socket.on("ride-started", (ride) => {
    console.log("ride");
    setWaitingForDriver(false);
    navigate("/riding", { state: { ride } }); // Updated navigate to include ride data
  });

  const fetchSuggestions = async (input, type) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions?input=${input}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (type === "pickup") {
        setPickupSuggestions(response.data);
      } else {
        setDestinationSuggestions(response.data);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setPickupSuggestions([]);
      setDestinationSuggestions([]);
    }
  };

  const handleInputChange = async (e, type) => {
    const value = e.target.value;
    if (type === "pickup") {
      setPickup(value);
      if (value.length >= 3) {
        await fetchSuggestions(value, "pickup");
      } else {
        setPickupSuggestions([]);
      }
    } else {
      setDestination(value);
      if (value.length >= 3) {
        await fetchSuggestions(value, "destination");
      } else {
        setDestinationSuggestions([]);
      }
    }
  };

  // panelRef
  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "70%",
          padding: 24,
          opacity: 1,
        });
        gsap.to(panelCloseRef.current, {
          opacity: 1,
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
          padding: 0,
          opacity: 0,
        });
        gsap.to(panelCloseRef.current, {
          opacity: 0,
        });
      }
    },
    [panelOpen]
  );

  // vehiclePanelRef
  useGSAP(
    function () {
      if (vehiclePanel) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclePanel]
  );

  // confirmRidePanelRef
  useGSAP(
    function () {
      if (confirmRidePanel) {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePanel]
  );

  // vehicleFoundRef
  useGSAP(
    function () {
      if (vehicleFound) {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehicleFound]
  );

  // waitingForDriverRef
  useGSAP(
    function () {
      if (waitingForDriver) {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [waitingForDriver]
  );

  //findtrip function
  const findTrip = async (e) => {
    e.preventDefault();
    setVehiclePanel(true);
    setPanelOpen(false);

    const fare = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/get-ride-fare`,
      {
        params: { pickup, destination },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const distanceAndTime = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/maps/get-distance-time`,
      {
        params: { origin: pickup, destination },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setFare(fare.data);
    if (distanceAndTime.data.status === "OK") {
      setDistanceAndTime(distanceAndTime.data);
    } else {
      setDistanceAndTime({});
      console.log("Error fetching distance and time:", distanceAndTime.data);
    }
  };

  //create ride function
  const createRide = async () => {
    const rideData = {
      pickup: pickup,
      destination: destination,
      vehicleType: vehicleType,
    };

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    await axios
      .post(`${import.meta.env.VITE_BASE_URL}/rides/create`, rideData, {
        headers: headers,
      })
      .then((res) => {
        setRide(res.data)
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="h-screen relative overflow-hidden">
      <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
        <img
          className="w-16"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
      </div>

      <div className="h-[70%] w-screen ">
        {/* image for temporary use  */}
        {/* <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        /> */}

        {/* Live location tracking component */}
        <LiveTracking />
      </div>
      <div className=" flex flex-col justify-end h-screen absolute top-0 w-full">
        <Link
          to="/user/logout"
          className=" h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>

        <div className="h-[30%] p-6 bg-white relative">
          <h5
            ref={panelCloseRef}
            onClick={() => {
              setPanelOpen(false);
            }}
            className="absolute opacity-0 right-6 top-6 text-2xl"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form
            className="relative py-3"
            onSubmit={(e) => {
              findTrip(e);
            }}
          >
            <div className="line absolute h-16 w-1 top-[50%] -translate-y-1/2 left-5 bg-gray-700 rounded-full"></div>
            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField("pickup");
              }}
              value={pickup}
              onChange={(e) => handleInputChange(e, "pickup")}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full"
              type="text"
              placeholder="Add a pick-up location"
            />
            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField("destination");
              }}
              value={destination}
              onChange={(e) => handleInputChange(e, "destination")}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full  mt-3"
              type="text"
              placeholder="Enter your destination"
            />
            {/* <button
              // onClick={findTrip}
              type="submit"
              className="bg-black text-white px-4 py-2 rounded-lg mt-3 w-full"
            >
              Find Trip
            </button> */}
          </form>
        </div>
        <div ref={panelRef} className="bg-white h-0">
          <LocationSearchPanel
            suggestions={
              activeField === "pickup"
                ? pickupSuggestions
                : destinationSuggestions
            }
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanel}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
          />
        </div>
      </div>

      {/* Vehical Panel */}
      <div
        ref={vehiclePanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        <VehiclePanel
          setVehicleType={setVehicleType}
          fare={fare}
          distanceAndTime={distanceAndTime}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanel={setVehiclePanel}
        />
      </div>

      {/* Confirm Ride Panel */}
      <div
        ref={confirmRidePanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12"
      >
        <ConfirmRide
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
          distanceAndTime={distanceAndTime}
        />
      </div>

      {/* LookingForDriver Panel */}
      <div
        ref={vehicleFoundRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12"
      >
        <LookingForDriver
          // createRide={createRide}
          ride={ride}
          setVehicleFound={setVehicleFound}
          setWaitingForDriver={setWaitingForDriver}
          distanceAndTime={distanceAndTime}
        />
      </div>

      {/* WaitingForDriver Panel */}
      <div
        ref={waitingForDriverRef}
        className="fixed w-full  z-10 bottom-0  bg-white px-3 py-6 pt-12"
      >
        <WaitingForDriver
          ride={ride}
          setVehicleFound={setVehicleFound}
          setWaitingForDriver={setWaitingForDriver}
          waitingForDriver={waitingForDriver}
        />
      </div>
    </div>
  );
}

export default Home;
