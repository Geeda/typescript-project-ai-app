"use client";

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState("");

  async function askAI() {
    const res = await fetch("/api/ai/gemini", {
      method: "POST",
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    setReply(data.response);
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        AI Learning Playground (Powered by Typescript!)
      </h1>
      <textarea
        className="border p-2 w-full mb-2"
        placeholder="Ask me something..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={askAI}
      >
        Ask AI
      </button>
      {reply && (
        <div className="mt-4 p-4 border rounded bg-gray-50">
          <strong>AI Reply:</strong>
          <p>{reply}</p>
        </div>
      )}
    </main>
  );
}
