// src/components/common/PageHeader.jsx
import React from "react";

const PageHeader = ({ title }) => {
  return (
    <div style={{ padding: "16px", borderBottom: "1px solid #ccc" }}>
      <h2>{title || "Page Title"}</h2>
    </div>
  );
};

export default PageHeader;
