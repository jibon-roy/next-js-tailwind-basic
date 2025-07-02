import { Spin } from "antd";
import React from "react";

const Loading = () => {
  return (
    <div className="h-[calc(100vh-170px)] w-full flex items-center justify-center z-50">
      <Spin size="large" />
    </div>
  );
};

export default Loading;
