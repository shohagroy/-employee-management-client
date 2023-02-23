import React from "react";
import { GrClose } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import {
  openMassege,
  openMassegeBox,
} from "../../features/NotificationMessage/NotificationMessageSlice";
import { useGetMessageUserQuery } from "../../features/NotificationMessage/notifyApi";

const MassegeContainer = () => {
  const dispatch = useDispatch();
  const { data } = useGetMessageUserQuery();

  const { user } = useSelector((state) => state.auth);

  const massegeUsers = data?.data?.filter(
    (massage) => massage._id !== user._id
  );

  return (
    <div className=" border-2 rounded-xl border-primary h-full w-full">
      <div className="relative">
        <h2 className="text-xl p-3 bg-gray-100 mb-1 rounded-t-xl font-semibold text-center">
          All Message
        </h2>
        <div className="absolute top-0 right-3">
          <button
            onClick={() => dispatch(openMassege())}
            className="p-2 text-2xl text-red-600"
          >
            <GrClose className="text-red-600" />
          </button>
        </div>
      </div>

      <hr />

      <div className="grid grid-cols-2 text-xl">
        <button className="px-4 py-1 text-center bg-green-600 text-white">
          All User
        </button>
        <button className="px-4 py-1">Massage</button>
      </div>

      <hr />
      <div className="h-full mt- bg-gray-50">
        {massegeUsers?.map((user) => (
          <div
            onClick={() => dispatch(openMassegeBox(user))}
            key={user._id}
            className="p-2 cursor-pointer my-3 border border-black flex justify-between"
          >
            <h2 className="text-xl font-bold text-primary">
              {user.firstName} {user.lastName}
            </h2>{" "}
            <div>
              <div className="relative flex-shrink-0">
                <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-600 border rounded-full text-gray-100 border-gray-900"></span>
              </div>
              <p>Active Now</p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-2 rounded-xl border-primary h-full w-full">
        <div className="relative">
          <h2 className="text-xl p-3 bg-gray-100 mb-1 rounded-t-xl font-semibold text-center">
            All Message
          </h2>
          <div className="absolute top-0 right-3">
            <button
              onClick={() => dispatch(openMassege())}
              className="p-2 text-2xl text-red-600"
            >
              <GrClose className="text-red-600" />
            </button>
          </div>
        </div>

        <hr />
      </div>
    </div>
  );
};

export default MassegeContainer;
