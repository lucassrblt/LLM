import React, { useState } from "react";
import { Bot, Sparkles, Plus } from "lucide-react";
import ChatMessage from "./components/ChatMessage";
import ChatInput from "./components/ChatInput";
import FileSelectionModal from "./components/FileSelectionModal";

interface Message {
  id: string;
  text: string;
  isAi: boolean;
  timestamp: string;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your AI assistant. How can I help you today?",
      isAi: true,
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [lastUserMessage, setLastUserMessage] = useState<string | null>(null);

  const handleSendMessage = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isAi: false,
      timestamp: new Date().toLocaleTimeString(),
    };
    setLastUserMessage(text);
    setMessages((prev) => [...prev, userMessage]);
    await handleAiRequest(text);
  };

  const handleAiRequest = async (text: string) => {
    setIsLoading(true);
    const response = await fetch("http://localhost:5000/prompt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: text, question: text }),
    });

    console.log("response", response);

    // const message: Message = {
    //   id: Date.now().toString(),
    //   text: response,
    //   isAi: false,
    //   timestamp: new Date().toLocaleTimeString(),
    // };
    // setMessages((prev) => [...prev, message]);

    // console.log("response", response);
  };

  const handleFileSelect = async (value: string) => {
    setSelectedFile(value);
    const message: Message = {
      id: Date.now().toString(),
      text: `Currently reading the file that you selected`,
      isAi: true,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, message]);
    setTimeout(() => {
      const message: Message = {
        id: Date.now().toString(),
        text: `Finishing reading your file`,
        isAi: true,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, message]);
    }, 3000);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
              <Bot className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                AI Chat Assistant
              </h1>
              <p className="text-sm text-gray-500">Powered by AI technology</p>
            </div>
          </div>
          {selectedFile && (
            <div className="flex items-center justify-center px-3 py-3 bg-purple-700 rounded-2xl">
              <p className="text-white text-sm flex-wrap text-center">
                Current file : {selectedFile}
              </p>
            </div>
          )}
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Select File</span>
          </button>
        </div>
      </header>

      {/* Chat Container */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message.text}
              isAi={message.isAi}
              timestamp={message.timestamp}
            />
          ))}
          {isLoading && (
            <div className="flex items-center gap-2 text-purple-600">
              <Sparkles className="h-5 w-5 animate-pulse" />
              <span className="text-sm">AI is thinking...</span>
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t bg-white">
        <div className="max-w-4xl mx-auto">
          <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
        </div>
      </div>

      {/* File Selection Modal */}
      <FileSelectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleFileSelect}
      />
    </div>
  );
}

export default App;
