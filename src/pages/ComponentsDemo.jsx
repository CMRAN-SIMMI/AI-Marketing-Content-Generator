import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Button,
  Input,
  Loader,
  Toast,
  Modal,
} from "../components/ui";

function ComponentsDemo() {
  const [input, setInput] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [toast, setToast] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Navbar />

      <div className="min-h-screen px-4 py-10 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Components Demo
        </h1>

        {/* Input */}
        <div className="mb-6">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type something..."
          />
        </div>

        {/* Button */}
        <div className="mb-6">
          <Button onClick={() => setToast(true)}>
            Show Toast
          </Button>
        </div>

        {/* Loader */}
        <div className="mb-6">
          <Button onClick={() => setShowLoader(!showLoader)}>
            Toggle Loader
          </Button>

          {showLoader && <Loader />}
        </div>

        {/* Modal */}
        <div className="mb-6">
          <Button onClick={() => setShowModal(true)}>
            Open Modal
          </Button>
        </div>

        {toast && (
          <Toast
            message="Component working successfully!"
            type="success"
            onClose={() => setToast(false)}
          />
        )}

        <Modal
          isOpen={showModal}
          title="Demo Modal"
          onClose={() => setShowModal(false)}
        >
          <p>This is a demo modal component.</p>
        </Modal>
      </div>

      <Footer />
    </>
  );
}

export default ComponentsDemo;