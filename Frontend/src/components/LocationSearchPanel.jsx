import React from "react";

function LocationSearchPanel({
  suggestions,
  setVehiclePanel,
  setPanelOpen,
  setPickup,
  setDestination,
  activeField,
}) {
  const handleSuggestionClick = (suggestion) => {
    if (activeField === "pickup") {
      console.log(`setPickup ${suggestion}`);
      setPickup(suggestion);
    } else if (activeField === "destination") {
      console.log(`setDestination ${suggestion}`);
      setDestination(suggestion);
    }
    // setVehiclePanel(true);
    // setPanelOpen(false);
  };

  return (
    <div>
      {suggestions && suggestions.map((suggestion, id) => (
        <div
          key={id}
          onClick={() => handleSuggestionClick(suggestion)}
          className="flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start"
        >
          <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full">
            <i className="ri-map-pin-fill"></i>
          </h2>
          <h4 className="font-medium">{suggestion}</h4>
        </div>
      ))}
    </div>
  );
}

export default LocationSearchPanel;
