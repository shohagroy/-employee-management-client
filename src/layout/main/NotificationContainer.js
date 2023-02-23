import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GrClose } from "react-icons/gr";
import { openNotification } from "../../features/NotificationMessage/NotificationMessageSlice";
import { useSeenNotificationMutation } from "../../features/NotificationMessage/notifyApi";

const NotificationContainer = () => {
  const dispatch = useDispatch();
  const { notifications } = useSelector((state) => state.getNotify);

  const [seenNotification] = useSeenNotificationMutation();

  return (
    <div className="border-2 rounded-xl border-primary h-full w-full">
      <div className="relative">
        <h2 className="text-xl p-3 bg-gray-100 mb-1 rounded-t-xl font-semibold text-center">
          All Notification
        </h2>
        <div className="absolute top-0 right-3">
          <button
            onClick={() => dispatch(openNotification())}
            className="p-2 text-2xl text-red-600 cursor-pointer"
          >
            <GrClose className="text-red-600" />
          </button>
        </div>
      </div>

      <hr />
      <div className="h-full mt- bg-gray-50">
        <div className="">
          {notifications?.map((notify) => (
            <Link
              onClick={() => seenNotification(notify._id)}
              to={`/job-details/${notify.jobId}`}
            >
              <div
                className={`duration-300 my-1 p-2 flex justify-between cursor-pointer hover:bg-gray-100 h-[10vh] ${
                  !notify?.isSeen && "bg-blue-100"
                }`}
              >
                <div className="flex flex-row">
                  <div className="ml-2">
                    <h2 className="text-xl ">
                      <span className="font-semibold">{notify?.user}</span>{" "}
                      Applied a{" "}
                      <span className="font-semibold">{notify?.position}</span>{" "}
                      Position on Your Job.
                    </h2>
                    <small>Click to Job details</small>
                  </div>
                </div>
              </div>
            </Link>
          ))}

          <hr />
        </div>
      </div>
    </div>
  );
};

export default NotificationContainer;
