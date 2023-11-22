import React, { useEffect } from "react";

interface ModalWrapperProps {
  closeModal: () => void;
  isOpen: boolean;
  children: React.ReactNode;
  modalWidth?: string;
  modalHeight?: string;
}

const ModalWrapper = (props: ModalWrapperProps) => {
  const { isOpen, closeModal, children, modalWidth, modalHeight } = props;

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden"; // Prevent scrolling on background
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset"; // Re-enable scrolling
    };
  }, [isOpen, closeModal]); // Add closeModal to dependencies array

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div
      className={`${
        isOpen ? "fixed" : "hidden"
      } z-10 inset-0 h-screen overflow-y-hidden`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-center justify-center h-full min-h-screen pt-4 px-4 text-center p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity"
          aria-hidden="true"
          onClick={handleBackdropClick}
        ></div>
        <span className="hidden align-middle h-screen" aria-hidden="true">
          &#8203;
        </span>
        <div
          className={`${isOpen ? "flex" : "hidden"} ${modalWidth || "w-1/2"} ${
            modalHeight || ""
          } align-bottom bg-white rounded-lg text-left shadow-xl transform transition-all`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalWrapper;
