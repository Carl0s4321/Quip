import '../Panel.css'
function Chat({openPanel}) {
  return (
    <div className={`${openPanel? "open" : ""} panel text-white p-5`}>
      Chat
    </div>
  );
}

export default Chat;
