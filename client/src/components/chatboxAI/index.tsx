/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import ChatBoxAIModal from "./ChatBoxAIModal";

const ChatBoxAI = () => {
  const [isOpenBox, setIsOpenBox] = useState(false);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "30px",
        right: "10px",
        backgroundColor: "#89CA9C",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        padding: "8px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        zIndex: 900,
      }}
    >
      <div
        onClick={() => {
          setIsOpenBox(true);
        }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "48px",
          borderRadius: "6px",
          color: "#ffffff",
          fontSize: "14px",
          cursor: "pointer",
          transition: "all 0.2s ease",
        }}
      >
        <span style={{ marginRight: "8px" }}>👤</span> Trợ lý
      </div>
      <ChatBoxAIModal isOpenBox={isOpenBox} setIsOpenBox={setIsOpenBox} />
    </div>
  );
};

export default ChatBoxAI;
