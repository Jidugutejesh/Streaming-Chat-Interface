import { detectType } from "../utils/detectType";

export default function Message({ msg }) {
  const type = detectType(msg.content || "");      // find message type
  const isUser = msg.role === "user";              // check who sended that message 

  const base =
    "px-3 py-2 rounded-lg max-w-md text-sm whitespace-pre-wrap";    //common style for all messages 

  const bubble = isUser
    ? "bg-blue-500 text-white ml-auto"
    : "bg-gray-300 text-black mr-auto";         // give the style and position depending upon who sended the msg

  if (type === "json") {               // if type is json  show on screen with this style
    return (
      <pre className={`${base} ${bubble}`}>
        {JSON.stringify(JSON.parse(msg.content), null, 2)}
      </pre>
    );
  }

  if (type === "number") {             // if type is number  show on screen with this style
    return (
      <div className={`${base} ${bubble} bg-purple-500 text-white`}>
        {msg.content}
      </div>
    );
  }

  if (type === "table") {           // if type is table  show on screen with this style
    const rows = msg.content
      .trim()
      .split("\n")
      .map((r) => r.split("|"));

    return (
      <div className={`${isUser ? "ml-auto" : "mr-auto"}`}>
        <table className="border border-gray-400 text-sm bg-white">
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j} className="border px-2 py-1">
                    {cell.trim()}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (                // if it is normal show text
    <div className={`${base} ${bubble}`}>   
      {msg.content}
    </div>
  );
}
