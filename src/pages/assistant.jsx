import Toast from "../components/ui/Toast";
import { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ChatAPI from "../api/chatApi";


function Assistant({ darkMode, setDarkMode }) {
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [aiTyping, setAiTyping] = useState(false);
  const [toast, setToast] = useState({
  show: false,
  message: "",
  type: "success",
});
  const messagesEndRef = useRef(null);  
  useEffect(() => {
    fetchChats();
  }, []);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [selectedChat]);


  const fetchChats = async () => {
    try {
      const response = await ChatAPI.get("/");
      setChats(response.data.data);
    } catch (err) {
      console.error(err);
    }
  };
  const loadChat = async (chatId) => {
    try {
      const response = await ChatAPI.get(`/${chatId}`);

      setSelectedChat(response.data.data);
      // Close sidebar on mobile
      setShowSidebar(false);
    } catch (err) {
      console.error("Error loading chat:", err);
    }
  };

  const handleSend = async () => {
    if (!message.trim()) return;

    try {
      setLoading(true);
      setAiTyping(true);

      const response = await ChatAPI.post("/message", {
        chatId: selectedChat?._id,
        message,
      });

      setSelectedChat(response.data.data);

      setMessage("");

      await fetchChats();

      setAiTyping(false);

    } catch (err) {
      console.error(err);

      setAiTyping(false);

      alert("Failed to send message.");

    } finally {
      setLoading(false);
    }
  };
  const handleNewChat = () => {
    setSelectedChat(null);
    setMessage("");
    setShowSidebar(false);
  };
  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsListening(true);

    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;

      setMessage(transcript);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };
  };

  const handleDeleteChat = async (chatId) => {
    try {
      await ChatAPI.delete(`/${chatId}`);

      if (selectedChat?._id === chatId) {
        setSelectedChat(null);
      }

      await fetchChats();
      setToast({
        show: true,
        message: "Conversation deleted successfully!",
        type: "success",
      });
    } catch (err) {
      console.error(err);
      setToast({
      show: true,
      message: "Failed to delete conversation!",
      type: "error",
    });
    }
  };
  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);

      setToast({
        show: true,
        message: "Copied to clipboard!",
        type: "success",
      });

    } catch (err) {
      console.error(err);

      setToast({
        show: true,
        message: "Failed to copy!",
        type: "error",
      });
    }
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode
          ? "bg-gray-950 text-white"
          : "bg-white text-black"
      }`}
    >
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

     <div className="relative flex h-[calc(100vh-140px)]">
      {/* Backdrop */}
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}
      {/* Sidebar */}
      <div
        className={`
          fixed md:static top-16 left-0 h-[calc(100vh-64px)]
          w-72 z-50
          transform transition-transform duration-300
          ${showSidebar ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          ${darkMode ? "bg-gray-900" : "bg-gray-100"}
        `}
>

        <div className="p-4 border-b">

          <button
            onClick={handleNewChat}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold"
          >
            + New Chat
          </button>

          <h2 className="text-xl font-bold mt-4">
            Previous Chats
          </h2>

        </div>

          <div className="p-3 overflow-y-auto h-[calc(100%-90px)]">
            {chats.length === 0 ? (
              <p className="text-gray-500 text-sm">
                No conversations yet.
              </p>
            ) : (
              chats.map((chat) => (
                <div
                  key={chat._id}
                  className={`flex items-center gap-2 p-3 mb-2 rounded-lg transition ${
                    selectedChat?._id === chat._id
                      ? "bg-green-600 text-white border-l-4 border-yellow-300"
                      : darkMode
                      ? "bg-gray-800 hover:bg-gray-700"
                      : "bg-white hover:bg-green-100"
                  }`}
                >
                  {/* Chat Title */}
                  <div
                    onClick={() => loadChat(chat._id)}
                    className="flex-1 min-w-0 cursor-pointer"
                  >
                  <p
                    className="truncate"
                    title={chat.title}
                  >
                    {chat.title}
                  </p>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteChat(chat._id);
                    }}
                    className="flex-shrink-0 text-red-500 hover:text-red-700 hover:scale-110 transition"
                  >
                    🗑️
                  </button>

                </div>
              ))
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
        <div className="md:hidden p-3 border-b">
          <button
            onClick={() => setShowSidebar(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            ☰ Chats
          </button>
        </div>

      {/* Messages */}
      <div
      className="flex-1 overflow-y-auto p-6"
      style={{ maxHeight: "calc(100vh - 220px)" }}
    >

        {!selectedChat ? (

          <div className="text-center mt-20">

            <h1 className="text-2xl md:text-4xl font-bold">
              🤖 AI Marketing Assistant
            </h1>

            <p className="mt-3 text-sm md:text-base text-gray-500">
                Ask me to generate:

                • Product descriptions
                • Marketing taglines
                • Social media captions
                • Promotional content
                • Hashtags

                🎤 You can also use voice input.
            </p>

          </div>

        ) : (

          <div className="space-y-6">

            {selectedChat.messages.map((msg, index) => (

              <div
                key={index}
                className={`flex ${
                  msg.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

            <div
              className={`max-w-[75%] md:max-w-[65%] whitespace-pre-wrap rounded-xl px-4 py-3 shadow ${
                msg.role === "user"
                  ? "bg-green-600 text-white"
                  : darkMode
                  ? "bg-gray-800 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >

              <p>{msg.content}</p>

              {msg.role === "assistant" && (

                <button
                  onClick={() => handleCopy(msg.content)}
                  className="mt-3 text-sm bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                >
                  📋 Copy
                </button>

              )}

            </div>

              </div>

            ))}
            {aiTyping && (
            <div className="flex justify-start">

              <div
                className={`rounded-xl px-4 py-3 shadow ${
                  darkMode
                    ? "bg-gray-800"
                    : "bg-gray-200"
                }`}
              >

                <span className="animate-pulse">
                  🤖 Typing...
                </span>

              </div>

            </div>
            )}

            <div ref={messagesEndRef}></div>

          </div>

        )}

      </div>

          {/* Input */}
          <div
            className={`sticky bottom-0 border-t p-4 ${
              darkMode
                ? "bg-gray-950 border-gray-700"
                : "bg-white border-gray-300"
            }`}
          >
            <div className="flex flex-col md:flex-row gap-3">

          <input
          type="text"
          value={message}
          onChange={(e)=>setMessage(e.target.value)}
          onKeyDown={(e)=>{
              if(e.key==="Enter"){
                  handleSend();
              }
          }}
          placeholder="Type your message..."
          className={`flex-1 rounded-lg px-4 py-3 border outline-none transition ${
              darkMode
                ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                : "bg-white border-gray-300 text-black placeholder-gray-500"
          }`}
          />

          <div className="flex gap-2">

        <button
          onClick={startListening}
          className={`px-4 rounded-lg text-white font-semibold ${
            isListening
              ? "bg-red-600 animate-pulse"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isListening ? "🎙️ Listening..." : "🎤"}
        </button>

            <button
              onClick={handleSend}
              disabled={loading}
              className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg disabled:opacity-50"
            >
              {loading ? (
              <>
              <span className="animate-pulse">Sending...</span>
              </>
              ) : (
              "Send"
              )}
            </button>

          </div>

            </div>
          </div>

        </div>
      </div>
    {toast.show && (
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() =>
          setToast((prev) => ({
            ...prev,
            show: false,
          }))
        }
      />
    )}
      <Footer />
    </div>
  );
}

export default Assistant;