// "use client";
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { GoogleGenerativeAI } from "@google/generative-ai";


// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const prompt = "create an itinerary for 4 days in paris";

// const result = await model.generateContent(prompt);
// console.log("Response:")
// console.log(result.response.text());


// export default function Home() {

//   function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
//     event.preventDefault()

//   }

//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
//         <form onSubmit={handleSubmit}>
//           <Input type="text" placeholder="Input" /><br />
//           <Button type="submit">Button</Button>
//         </form>
//       </main>
//       <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">

//       </footer>
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [response, setResponse] = useState<{ prompt: string; answer: string } | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Generate content with the AI model
    const result = await model.generateContent(inputValue);

    // Store the result in an object
    const responseObject = {
      prompt: inputValue,
      answer: result.response.text,
    };

    // Set the response state
    setResponse(responseObject);
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Enter your prompt"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <br />
          <Button type="submit">Submit</Button>
        </form>

        {response && (
          <div className="mt-4 p-4 bg-gray-200 rounded-lg">
            <p><strong>Prompt:</strong> {response.prompt}</p>
            <p><strong>AI Response:</strong> {response.answer}</p>
          </div>
        )}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
