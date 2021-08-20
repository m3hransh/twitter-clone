import React, { FC } from 'react';

interface ModalProps {
  className?: string;
  chidlren?: React.ReactNode;
  modalIsOpen: boolean;
  title?: string;
  closeModal?: () => void;
}

const Modal: FC<ModalProps> = ({
  children,
  modalIsOpen,
  closeModal,
  title,
}) => {
  return (
    <>
      {modalIsOpen ? (
        <>
          <div
            className="justify-center items-center flex 
            overflow-x-hidden overflow-y-auto fixed 
            inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-3/4 my-6 mx-auto max-w-sm">
              {/*content*/}
              <div
                className="border-0 rounded-lg shadow-lg 
                relative flex flex-col w-full bg-white 
                outline-none focus:outline-none"
              >
                {/*header*/}
                <div
                  className="flex items-start justify-between 
                  p-2 border-b border-solid border-blueGray-200 
                  rounded-t"
                >
                  {title && (
                    <h3 className="text-2xl p-2 font-semibold">{title}</h3>
                  )}

                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-50 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={closeModal}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex flex-col items-center flex-auto">
                  {children}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
