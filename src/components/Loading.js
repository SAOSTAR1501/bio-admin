import React from "react";

function Loading() {
  return (
    <img
      alt="admin"
      style={{
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
      }}
      width={50}
      height={50}
      src={require("../images/logo.png")}
    />
  );
}

export default Loading;
