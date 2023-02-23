import React from "react";
import { AiFillBell } from "react-icons/ai";
import { IoIosText } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  openMassege,
  openNotification,
} from "../../features/NotificationMessage/NotificationMessageSlice";

const NotificationMessage = () => {
  const { notifications } = useSelector((state) => state.getNotify);

  const unSeen = notifications?.filter((notify) => notify.isSeen === false);
  const dispatch = useDispatch();
  return (
    <div className="flex">
      <div className="relative">
        <button
          onClick={() => dispatch(openMassege())}
          className="border border-black p-1 rounded-full hover:border-primary text-white bg-primary  transition-all "
        >
          <IoIosText size={25} />
        </button>
        <div className="absolute -top-2 left-6 text-white p-  ">
          <div className="w-6 h-6 flex justify-center items-center bg-red-600 rounded-full">
            <small>100</small>
          </div>
        </div>
      </div>

      <div className="relative mx-4 ">
        <button
          onClick={() => dispatch(openNotification())}
          className="border border-black p-1 rounded-full hover:border-primary text-white bg-primary  transition-all "
        >
          <AiFillBell size={25} />
        </button>
        <div className="absolute -top-2 left-6 text-white p-  ">
          <div className="w-6 h-6 flex justify-center items-center bg-red-600 rounded-full">
            <small>{unSeen?.length}</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationMessage;
