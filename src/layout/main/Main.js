import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import MassageBox from "../../features/NotificationMessage/MassageBox";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";

const Main = () => {
  const { pathname } = useLocation();

  const { massegeBox } = useSelector((state) => state.getNotify);

  return (
    <div className="relative">
      <Navbar />
      <div
        className={` ${
          pathname === "/" ? "max-w-[1600px] px-5" : "max-w-7xl"
        } max-w-[1600px] mx-auto`}
      >
        <Outlet />
      </div>
      <div className="absolute bottom-0 right-20 z-50">
        {massegeBox?.isOpen && <MassageBox />}
      </div>
    </div>
  );
};

export default Main;
