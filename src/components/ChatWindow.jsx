import { useState } from "react";
import InputBox from "./InputBox";
import Message from "./Message";
import { streamChat } from "../utils/streamChat";
import { useRef } from "react";

export default function ChatWindow() {
  const [messages, setMessages] = useState([]); // stores all messages
  const [typing, setTyping] = useState(false); //show assistant typing text
  const controllerRef = useRef(null); // it stores the valuse which does not re-renders 

  const sendMessage = async (text) => {
    const user = {
      id: Date.now(),
      role: "user",
      content: text,
    };

    const botId = Date.now() + 1;

    const bot = {
      id: botId,
      role: "assistant",
      content: "",
    };

    setMessages((prev) => [...prev, user, bot]);
    setTyping(true);

    controllerRef.current = new AbortController();

    await streamChat({     // this send the data and callbacks and streamChat receives and uses them
      prompt: text,
      controller: controllerRef.current,
      onToken: (token) => {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === botId ? { ...m, content: m.content + token } : m,
          ),
        );
      },
      onDone: () => setTyping(false),
      onError: (err) => {
        console.error(err);
        setTyping(false);
      },
    });
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <div className="bg-gray-900 text-white p-4 text-center font-bold">
        Streaming Chat
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map(
          (
            msg, // looping through all messages
          ) => (
            <Message key={msg.id} msg={msg} /> // creating new component every time
          ),
        )}

        {typing && ( // condition  to show bot is typing for better user experience
          <div className="text-sm text-gray-500 italic">
            Assistant is typing...
          </div>
        )}
           {typing && (    // button to  cancle the streaming fetch and  stop token generating
        <button
          onClick={() => controllerRef.current.abort()}
          className="text-red-500 text-sm cursor-pointer"
        >
          Stop
        </button>

      )}
      </div>
      <InputBox onSend={sendMessage} />
    </div>
  );
}
