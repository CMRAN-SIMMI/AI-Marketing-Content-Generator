import { toast } from "react-hot-toast";
import { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ChatAPI from "../api/chatApi";
import Modal from "../components/ui/Modal";
import { useLanguage } from "../context/LanguageContext";

function Assistant({ darkMode, setDarkMode }) {
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [aiTyping, setAiTyping] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [chatToDelete, setChatToDelete] = useState(null);
  const messagesEndRef = useRef(null); 
  useEffect(() => {
    fetchChats();
  }, []);
  const { language } = useLanguage();
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
        language,
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

    recognition.lang =
  language === "hi"
    ? "hi-IN"
    : "en-US";
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
      toast.success("Chat deleted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete chat.");
    }
  };
  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);

    toast.success("Copied to clipboard!");

    } catch (err) {
      console.error(err);

    toast.error("Failed to copy!");
    }
  };
  const confirmDelete = async () => {
    await handleDeleteChat(chatToDelete);

    setShowDeleteModal(false);
    setChatToDelete(null);
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
          fixed md:static inset-y-16 left-0
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
                    setChatToDelete(chat._id);

                    if (window.innerWidth < 768) {
                        setShowSidebar(false);
                    }

                    setShowDeleteModal(true);
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

    <div className="flex flex-col items-center justify-center h-full px-6">

    <div
      className={`w-24 h-24 rounded-full flex items-center justify-center text-5xl shadow-2xl ${
        darkMode
          ? "bg-gradient-to-br from-green-500 to-emerald-700"
          : "bg-gradient-to-br from-green-100 to-green-300"
      }`}
    >
      🤖
    </div>

    <h1
      className={`text-4xl md:text-5xl font-extrabold mt-8 ${
        darkMode ? "text-white" : "text-gray-900"
      }`}
    >
      AI Marketing Assistant
    </h1>

    <p
      className={`mt-5 max-w-2xl text-lg leading-8 text-center ${
        darkMode ? "text-gray-400" : "text-gray-600"
      }`}
    >
      Tell me about your food product and I'll generate
      professional product descriptions, promotional captions,
      marketing taglines and social media hashtags in seconds.
    </p>

    <div className="grid md:grid-cols-2 gap-6 mt-12 w-full max-w-4xl">

      <div className="rounded-2xl bg-green-600 text-white p-6 shadow-xl hover:scale-105 transition">
        <h3 className="text-xl font-bold mb-2">
          📝 Product Descriptions
        </h3>

        <p className="text-green-100">
          Generate attractive descriptions for your products.
        </p>
      </div>

      <div className="rounded-2xl bg-green-600 text-white p-6 shadow-xl hover:scale-105 transition">
        <h3 className="text-xl font-bold mb-2">
          📱 Social Media Captions
        </h3>

        <p className="text-green-100">
          Ready-to-post captions for Instagram and Facebook.
        </p>
      </div>

      <div className="rounded-2xl bg-green-600 text-white p-6 shadow-xl hover:scale-105 transition">
        <h3 className="text-xl font-bold mb-2">
          🏷 Marketing Taglines
        </h3>

        <p className="text-green-100">
          Catchy slogans that attract customers instantly.
        </p>
      </div>

      <div className="rounded-2xl bg-green-600 text-white p-6 shadow-xl hover:scale-105 transition">
        <h3 className="text-xl font-bold mb-2">
          #️⃣ Smart Hashtags
        </h3>

        <p className="text-green-100">
          AI-generated hashtags to improve online reach.
        </p>
      </div>

    </div>

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
        className={`max-w-[80%] md:max-w-[70%] rounded-2xl px-5 py-4 shadow-lg whitespace-pre-wrap transition-all duration-300 ${
          msg.role === "user"
            ? "bg-gradient-to-r from-green-600 to-emerald-500 text-white"
            : darkMode
            ? "bg-gray-800 border border-gray-700 text-white"
            : "bg-white border border-gray-200 text-gray-800"
        }`}
      >

        {/* Sender Label */}

        <div
          className={`text-xs font-bold mb-3 ${
            msg.role === "user"
              ? "text-green-100"
              : "text-green-600"
          }`}
        >
          {msg.role === "user"
            ? "👤 You"
            : "🤖 AI Assistant"}
        </div>

        <p className="leading-7">
          {msg.content}
        </p>

        {msg.role === "assistant" && (

          <div className="mt-5 flex justify-end">

            <button
              onClick={() => handleCopy(msg.content)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white transition"
            >
              📋 Copy Response
            </button>

          </div>

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
                    : "bg-white border border-gray-200"
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
      <Modal
        isOpen={showDeleteModal}
        title="⚠ Delete Conversation"
        onClose={() => setShowDeleteModal(false)}
        darkMode={darkMode}
      >
        <p className="mb-6">
          Are you sure you want to delete this conversation?
          <br />
          <span className="text-red-500 text-sm">
            This action cannot be undone.
          </span>
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => setShowDeleteModal(false)}
            className="px-4 py-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600"
          >
            Cancel
          </button>

          <button
            onClick={confirmDelete}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </Modal>
            
      <Footer />
    </div>
  );
}

export default Assistant;