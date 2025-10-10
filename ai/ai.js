

// Declares the script as a server-side script in Next.js (for server-side API handling)
"use server";

// Import the GoogleGenerativeAI package to interact with Google's generative AI API
// const { GoogleGenerativeAI } = require("@google/generative-ai");
import { GoogleGenerativeAI } from "@google/generative-ai";

// Create an instance of the GoogleGenerativeAI with the provided API key
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_API_KEY);

// Define an async function `runAi` which will generate content using the AI model
export async function runAi(prompt) {
  // Specify the AI model you want to use (in this case, "gemini-1.5-flash")
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  // Use the model to generate content based on the given prompt
  const result = await model.generateContent(prompt);

  // Extract the response from the generated content
  const response = await result.response;

  // Get the generated text from the response object
  const text = response.text();

  // Return the generated text to the caller of the function
  return text;
}




// "use server";

// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// export async function runAi(prompt) {
//   try {
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//     // Nếu SDK yêu cầu cấu trúc prompt object, đổi theo docs:
//     // const result = await model.generateContent({ prompt: { text: prompt } });

//     const result = await model.generateContent(prompt);
//     // debug nhanh để thấy cấu trúc
//     // console.log("AI raw result:", result);

//     const response = await result.response;
//     const text = typeof response.text === "function" ? response.text() : response.text;

//     return text;
//   } catch (err) {
//     console.error("AI generation error:", err);
//     throw err; // hoặc return fallback text
//   }
// }









// // ai/ai.js
// import { GoogleGenerativeAI } from "@google/genai";

// if (!process.env.NEXT_PUBLIC_GOOGLE_API_KEY) {
//   throw new Error("Missing GOOGLE_API_KEY in environment");
// }

// const client = new GoogleGenerativeAI({ apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY });

// /**
//  * runAi(prompt) -> returns text (string)
//  */
// export async function runAi(prompt) {
//   // model name: choose available model, e.g., "gemini-1.5-flash" or "gemini-2.0-flash"
//   const model = client.getGenerativeModel({ model: "gemini-2.5-flash" });
//   // Many SDKs accept an object or string; this uses generateContent with a simple prompt
//   const result = await model.generateContent({ prompt: { text: prompt } });
//   // result.response may contain text; API shape can vary, handle defensively
//   const resp = result?.response;
//   if (!resp) throw new Error("No response from AI model");
//   // resp.text() if available else try resp.output[0].content[0].text
//   if (typeof resp.text === "function") {
//     return resp.text();
//   } else if (resp.output?.[0]?.content?.[0]?.text) {
//     return resp.output[0].content[0].text;
//   } else if (resp.text) {
//     return resp.text;
//   }
//   throw new Error("Unexpected response shape from AI");
// }




























































// "use server";
// const { GoogleGenerativeAI } = require("@google/generative-ai");
// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
// export async function runAi(prompt) {
//   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//   // const prompt = " write  newspost for google";
//   const result = await model.generateContent(prompt);
//   const response = await result.response;
//   const text = response.text();


//   return text;
// }