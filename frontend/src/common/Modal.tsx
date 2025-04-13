import { ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
  title: string;
  show: boolean;
  onHide: () => void;
}

const Modal = ({ children, title, show, onHide }: ModalProps) => {
  return (
    <div className={`modal-overlay ${show ? "" : "d-none"}`}>
      <div className="my-modal p-3 rounded-3">
        <div className="d-flex align-items-center border-bottom p-3">
          <h3 className="mb-0">{title}</h3>
          <button className="btn btn-accent ms-auto" onClick={onHide}>
            Close
          </button>
        </div>
        <div className="my-modal-content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
