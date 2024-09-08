/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from "react";
import { HiOutlinePlus } from "react-icons/hi";

interface ModalProps {
  btn: React.ReactNode;
  children: React.ReactNode;
  onClose?: () => void;
}

const Modal: React.FC<ModalProps> = ({ btn, children }) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  return (
    <div
      className="w-full rounded-[0px] bg-white border-[1px] border-[#F6F6F6] p-0"
      style={{ boxShadow: "5px 0px 30px 0px rgba(0, 0, 0, 0.15)" }}
    >
      <button
      type="button"
        onClick={openModal}
        className=" flex gap-2 items-center justify-center w-full text-[#F00C89] 2xl:py-[15px] py-[10px] text-[18px] font-Poppins font-normal"
      >
        <HiOutlinePlus className="size-6 text-[#F00C89]" />
        {btn}
      </button>

      

      <dialog id="my_modal_3" className="modal" ref={modalRef}>
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          {children}
        </div>
      </dialog>
    </div>
  );
};

export default Modal;
