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
        // close on escape
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                closeModal();
            }
        };
        window.addEventListener("keydown", handleEscape);
        return () => {
            window.removeEventListener("keydown", handleEscape);
        };
    });

    return (
        <div
            className={`${isOpen ? "fixed" : "hidden"
                } z-10 inset-0 h-screen overflow-y-auto`}
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="flex items-center justify-center h-full min-h-screen pt-4 px-4 pb-20 text-center p-0">
                {/* <!--
          Background overlay, show/hide based on modal state.
          }--> */}
                <div
                    className="fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity"
                    aria-hidden="true"
                    onClick={() => closeModal()}
                ></div>
                <span className="hidden align-middle h-screen" aria-hidden="true">
                    &#8203;
                </span>
                {/* <!--
          Modal panel, show/hide based on modal state.
          }--> */}
                <div
                    className={`${isOpen ? "inline-block" : "hidden "} ${modalWidth ? modalWidth : " w-1/2 "
                        } ${modalHeight ? modalHeight : " h-auto "
                        } align-bottom bg-white rounded-lg text-left shadow-xl transform transition-all my-8`}
                >
                    {children}
                </div>
            </div>
        </div>
    );
};

export default ModalWrapper;