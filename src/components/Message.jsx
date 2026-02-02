export default function Message({ msg }) {
let isUser;

if (msg.role === "user") { // this check the is msg came from user or bot
  isUser = true;
} else {
  isUser = false;
}

  return (
    <div
      className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
        isUser
          ? "bg-blue-500 text-white ml-auto" // if user means apply this style and color
          : "bg-gray-300 text-black mr-auto" // if bot means apply this style and color
      }`}
    >
      {msg.content}
    </div>
  );
}
