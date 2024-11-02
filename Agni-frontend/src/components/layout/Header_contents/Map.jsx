import React from "react";

const Map = () => {
  return (
    <>
      <div className="map-container">
        <img
          src={`${process.env.PUBLIC_URL}/image/mart map.png`}
          alt="Smart Mart Map"
          style={{ alignItems: "center", width: "100%", height: '100%'}}
        />
      </div>
    </>
  );
};

export default Map;
