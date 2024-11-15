import useUserStore from "../../store/UserStore";

function Message({ message }) {
  const { user } = useUserStore();
  const msgByCurrUser = user._id === message.senderId;
  const currDate = new Date();

  let time = new Date(message.timeStamp).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  //   console.log(message)

  //   console.log(currDate.getDate())

  return (
    <div
      className={`${
        msgByCurrUser ? "bg-lightBlue ml-auto" : "bg-slate-800"
      } w-fit p-2 rounded-md`}
    >
      <p>{message.text}</p>
      <p className="text-[12px] ml-full">{time}</p>
    </div>
  );
}

export default Message;
