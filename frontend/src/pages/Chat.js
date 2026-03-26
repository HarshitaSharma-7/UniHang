import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

import Navbar from "../components/Navbar";
import Avatar from "../components/Avatar";
import { getMessages } from "../api/message";
import { getPlanById } from "../api/plan";


const socket = io("http://localhost:5000");


function Chat() {

  const { id } = useParams();

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([]);

  const [plan, setPlan] = useState(null);


  const user = JSON.parse(localStorage.getItem("user"));


  useEffect(() => {

  loadPlan();
  loadOldMessages();

  socket.emit("joinRoom", id);

// eslint-disable-next-line react-hooks/exhaustive-deps

}, [id]);


  const loadPlan = async () => {

    const res = await getPlanById(id);

    setPlan(res.data);

  };


  const loadOldMessages = async () => {

    const res = await getMessages(id);

    setMessages(res.data);

  };


  const sendMessage = () => {

    if (!message.trim()) return;


    socket.emit("sendMessage", {

      text: message,

      sender: user.name,

      planId: id

    });


    setMessage("");

  };


  const handleKeyPress = (e) => {

    if (e.key === "Enter") {

      sendMessage();

    }

  };


  return (

    <div className="bg-gray-100 min-h-screen flex flex-col">

      <Navbar />


      {/* CHAT HEADER */}

      <div className="bg-white shadow px-6 py-3">

        <h2 className="font-semibold text-lg">

          {plan?.title}

        </h2>


        <p className="text-sm text-gray-500">

          {plan?.participants?.length} members

        </p>


        <div className="flex gap-2 flex-wrap mt-1">

          {plan?.participants?.map(p => (

            <span

              key={p._id}

              className="text-xs bg-gray-200 px-2 py-1 rounded-full"

            >

              {p.name}

            </span>

          ))}

        </div>

      </div>


      {/* MESSAGES */}

      <div className="flex-1 overflow-y-auto px-4 py-4 max-w-xl mx-auto w-full">

    {messages.map((msg, i) => (

  <div
    key={i}
    className={`flex gap-2 mb-3 ${
      msg.sender === user.name
        ? "justify-end"
        : "justify-start"
    }`}
  >

    {msg.sender !== user.name && (
      <Avatar name={msg.sender} />
    )}

    <div
      className={`px-4 py-2 rounded-xl shadow ${
        msg.sender === user.name
          ? "bg-blue-500 text-white"
          : "bg-white"
      }`}
    >

      {msg.text}

    </div>

  </div>

))}

      </div>


      {/* INPUT */}

      <div className="bg-white border-t p-3 flex gap-2">

        <input

          value={message}

          onChange={(e) => setMessage(e.target.value)}

          onKeyDown={handleKeyPress}

          placeholder="Type message..."

          className="flex-1 border p-2 rounded-lg outline-none"

        />


        <button

          onClick={sendMessage}

          className="bg-blue-500 text-white px-4 rounded-lg"

        >

          Send

        </button>

      </div>

    </div>

  );

}


export default Chat;