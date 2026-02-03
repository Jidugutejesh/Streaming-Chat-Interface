export async function streamChat({
  prompt,
  onToken,
  onDone,
  onError,            
  controller,
}) {
  try {
    const res = await fetch(import.meta.env.VITE_API_URL, {  //sending user message to groq and ask for stream response
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: prompt },
        ],
        stream: true,
      }),
      signal: controller.signal,
    });

  if (!res.ok) throw new Error("Groq API error");   //if server fails throw error


    const reader = res.body.getReader();
    const decoder = new TextDecoder();       // this lines read the response piece by piece
    let buffer = "";

    while (true) {     // run the loop until server stops giving the streams
      const { value, done } = await reader.read();   
      if (done) break;

      buffer += decoder.decode(value, { stream: true });   //stream gives the value in  binary bytes this converst into text  

      const lines = buffer.split("\n");
      buffer = lines.pop();                    // 

      for (const line of lines) {    // go through one by one to each strem lines
        if (!line.startsWith("data:")) continue;
        if (line.includes("[DONE]")) {           // if server say stream finishes it  exits the function
          onDone();
         return;
        }

        try {
          const json = JSON.parse(line.replace("data:", "").trim());
          const token = json.choices?.[0]?.delta?.content;
          if (token) {
            onToken(token);
          }
        } catch (e) {
          console.error("Bad chunk:", line);
        }
      }
    }

    onDone();
  } catch (err) {
    if (err.name !== "AbortError") onError(err.message);
  }
}
