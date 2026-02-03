export function detectType(text) {
  const value = text.trim();

  if (!value) return "text";

  
  if (
    (value.startsWith("{") && value.endsWith("}")) ||     // checks is JSON or not
    (value.startsWith("[") && value.endsWith("]"))
  ) {
    try {
      JSON.parse(value);
      return "json";
    } catch {
      return "text";
    }
  }
  if (!isNaN(value)) return "number";     // check  is  number

  if (value.includes("|") && value.includes("\n")) return "table";     // check  is table


  return "text";
}
