import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Alert: React.FC = () => {
  return (
    <>
      <ToastContainer autoClose={1500} position={toast.POSITION.TOP_RIGHT} />
    </>
  );
};

export default Alert;
