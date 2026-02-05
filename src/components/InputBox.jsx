import { useState } from "react";

export default function InputBox({ onSend }) {
  const [text, setText] = useState(""); // stores what user types

  function handleSend() {
    if (!text.trim()) return; //avoiding empty message 
    onSend(text); //sending text to parent ChatWindow
    setText(""); // clearing input box
  }

  return (
    <div className="p-3 flex bg-white border-t">
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        className="flex-1 border rounded px-3 py-2 outline-none"
        placeholder="Type a message..."
      />
      <button
        onClick={handleSend}
        className="ml-2 bg-blue-500 text-white px-4 rounded hover:bg-blue-600 cursor-pointer" 
      >
        Send
      </button>
    </div>
  );
}
