"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatResponse } from "./helper/helper";
import { model } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const result = await model.generateContent(inputValue);
      setResponse(result.response.text);
    } catch (error) {
      console.error("Error generating content:", error);
      setResponse(
        "An error occurred while generating content. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <header className="bg-white bg-opacity-10 backdrop-blur-md py-6">
        <h1 className="text-3xl font-bold text-white text-center">
          AI Content Generator
        </h1>
      </header>

      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="prompt"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Enter your prompt
                </label>
                <Input
                  id="prompt"
                  type="text"
                  placeholder="What would you like to generate?"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 text-black"
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-3 rounded-lg transition duration-200 flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={20} />
                    Generating...
                  </>
                ) : (
                  "Generate Content"
                )}
              </Button>
            </form>
          </div>

          {response && (
            <div className="bg-gray-50 p-8 border-t border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                AI Response:
              </h2>
              <div className="prose prose-sm max-w-none text-black">
                {formatResponse(response)}
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-white bg-opacity-10 backdrop-blur-md py-4">
        <p className="text-center text-white text-sm">
          Powered by Google Generative AI
        </p>
      </footer>
    </div>
  );
}
