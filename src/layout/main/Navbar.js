import { signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../features/authSlice/authSlice";

import { Link, useLocation } from "react-router-dom";
import auth from "../../firebase.config";
import NotificationMessage from "./NotificationMessage";
import NotificationContainer from "./NotificationContainer";
import MassegeContainer from "./MassegeContainer";
import { useGetNotificationQuery } from "../../features/NotificationMessage/notifyApi";
import { getNotifications } from "../../features/NotificationMessage/NotificationMessageSlice";

const Navbar = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const {
    auth: { user },
    getNotify,
  } = useSelector((state) => state);

  let dashbord;

  if (user.role === "employer") {
    dashbord = "/dashboard/employee";
  } else {
    dashbord = "/dashboard/candidate";
  }

  const userLogOutHandelar = () => {
    signOut(auth)
      .then(() => {
        dispatch(logoutUser());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const { data } = useGetNotificationQuery(user?.email, {
    pollingInterval: 2000,
  });

  useEffect(() => {
    if (data?.status) {
      dispatch(getNotifications(data?.data));
    }
  }, [data, dispatch]);

  return (
    <nav
      className={`h-14 fixed w-full z-[999] ${
        pathname === "/" ? null : "bg-white"
      }`}
    >
      <ul className="max-w-7xl mx-auto flex gap-3 h-full items-center">
        <li className="flex-auto font-semibold text-2xl">
          <Link to="/">JobBox</Link>
        </li>
        <li>
          <Link className="hover:text-primary" to="/jobs">
            Jobs
          </Link>
        </li>
        <li>
          {user?.email ? (
            <button
              onClick={() => userLogOutHandelar()}
              className="border border-black px-2 py-1 rounded-full hover:border-primary hover:text-white hover:bg-primary hover:px-4 transition-all "
              to="/login"
            >
              Logout
            </button>
          ) : (
            <Link
              className="border border-black px-2 py-1 rounded-full hover:border-primary hover:text-white hover:bg-primary hover:px-4 transition-all "
              to="/login"
            >
              Login
            </Link>
          )}
        </li>

        <li>
          {user?.email && user?.role && (
            <Link
              className="border border-black px-2 py-1 rounded-full hover:border-primary hover:text-white hover:bg-primary hover:px-4 transition-all "
              to={dashbord}
            >
              Dashboard
            </Link>
          )}
        </li>
        {user?.email && user?.role && <NotificationMessage />}
        <li>
          {user?.email && !user?.role && (
            <Link
              className="border border-black px-2 py-1 rounded-full hover:border-primary hover:text-white hover:bg-primary hover:px-4 transition-all "
              to="/register"
            >
              Get Started
            </Link>
          )}
        </li>
      </ul>

      {getNotify.openNotification && (
        <div
          className={`absolute  z-50 right-0 bg-white  md:w-[420px] duration-300 h-screen shadow-2xl `}
        >
          <NotificationContainer />
        </div>
      )}
      {getNotify.openMassege && (
        <div
          className={`absolute  z-50 right-0 bg-white  md:w-[420px] duration-300 h-screen shadow-2xl  `}
        >
          <MassegeContainer />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
