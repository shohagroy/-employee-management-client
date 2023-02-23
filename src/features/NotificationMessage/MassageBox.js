import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { GrClose } from "react-icons/gr";
import { closeMassegeBox } from "./NotificationMessageSlice";
import { useConversationQuery, useSendMassegeMutation } from "./notifyApi";

const MassageBox = () => {
  const dispatch = useDispatch();
  const [sendMassege] = useSendMassegeMutation();
  const {
    auth: { user },
    getNotify: { massegeBox },
  } = useSelector((state) => state);

  const { data } = useConversationQuery(user._id);

  console.log(data.data);

  const { firstName, lastName, _id } = massegeBox.receivedBy;

  const massageHandelar = (e) => {
    e.preventDefault();
    const massege = e.target.text.value;

    const data = {
      sendBy: user.firstName + " " + user.lastName,
      receivedBy: firstName + " " + lastName,
      senderId: user._id,
      receviderId: _id,
      massege,
      conversation: [{}],
    };
    sendMassege(data);

    e.target.text.value = "";
  };
  return (
    <div className=" relative h-[500px] w-[400px] bg-white rounded-md border-2 border-primary">
      <div className="absolute top-2 right-5">
        <button
          onClick={() => dispatch(closeMassegeBox())}
          className="p-2 text-2xl text-red-600"
        >
          <GrClose className="text-red-600" />
        </button>
      </div>
      <div>
        <h1 className="text-2xl text-primary text-center p-4">
          {firstName} {lastName}
        </h1>
      </div>
      <div className="h-[380px] bg-gray-400 overflow-auto">
        <div className="m-2 bg-white rounded-md w-[300px] my-2">
          <h2 className="text-xl font-bold p-2">Shohag Roy</h2>
          <p className="ml-4 leading-none pb-2">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit enim
            tenetur iste dolores quidem, blanditiis eos harum saepe dicta.
            Eligendi!
          </p>
        </div>
      </div>
      <form onSubmit={massageHandelar} className="flex justify-center">
        <input
          className="w-full"
          name="text"
          type="text"
          placeholder="Type Hare..."
        />
      </form>
    </div>
  );
};

export default MassageBox;
