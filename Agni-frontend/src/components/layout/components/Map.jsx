import React from "react";

const Map = () => {
  return (
    <>
      <div className="map-container bg-gradient-to-r from-[#6a11cb] to-[#2575fc] min-h-screen flex items-center justify-center">
        <img
          src={`${process.env.PUBLIC_URL}/image/Mart map.png`}
          alt="Smart Mart Map"
          style={{
            alignItems: "center",
            width: "100%",
            height: "100%",
            justifyContent: "center",
          }}
        />
      </div>
    </>
  );
};

export default Map;
