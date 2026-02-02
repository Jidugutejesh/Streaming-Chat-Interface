import { useState } from "react";
import InputBox from "./InputBox";
import Message from "./Message";

export default function ChatWindow() {
  const [messages, setMessages] = useState([]); //stores all messages

  function sendMessage(text) { //Add new message to the list
    setMessages(prev => [
      ...prev,
      { id: Date.now(), role: "user", content: text }
    ]);
  }

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <div className="bg-gray-900 text-white p-4 text-center font-bold">
        Streaming Chat
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map(msg => (  // looping through all messages
          <Message key={msg.id} msg={msg} />  // creating new message component every time 
        ))}
        
      </div>

      <InputBox onSend={sendMessage}  />   
    
    </div>

  );
}
