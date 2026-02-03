import { useState } from "react";
import InputBox from "./InputBox";
import Message from "./Message";

export default function ChatWindow() {
  const [messages, setMessages] = useState([]); // stores all messages
  const [typing, setTyping] = useState(false); //show assistant typing text 


  const sendMessage = (text) => { //add new message to the list 
    const user = {
      id: Date.now(),
      role: "user",
      content: text,
    };

    const bot = {
      id: Date.now() + 1,
      role: "assistant",
      content: "",
    };

    setMessages((prev) => [...prev, user, bot]);
    fakeStream(bot.id);
  };

  const fakeStream = (botId) => {  //checking the stream 
    setTyping(true);

    const response = "Hello Tejas this is a streaming response demo";
    const words = response.split(" ");
    let i = 0;

    const timer = setInterval(() => {
      setMessages((prev) =>    // checking message is from bot or not 
        prev.map((m) =>
          m.id === botId ? { ...m, content: m.content + words[i] + " " } : m,
        ),
      );

      i++;
      if (i === words.length) {
        clearInterval(timer);
        setTyping(false);
      }
    }, 200);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <div className="bg-gray-900 text-white p-4 text-center font-bold">
        Streaming Chat
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg) => ( // looping through all messages 
          <Message key={msg.id} msg={msg} />  // creating new component every time 
        ))}

        {typing && (   // condition  to show bot is typing for better user experience
          <div className="text-sm text-gray-500 italic">
            Assistant is typing...
          </div>
        )}
      </div>

      <InputBox onSend={sendMessage} />
    </div>
  );
}
