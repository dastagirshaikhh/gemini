import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
// @ts-ignore
import { GoogleGenerativeAI } from "@google/generative-ai";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const key = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(key);
export const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
