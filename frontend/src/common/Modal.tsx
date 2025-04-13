import { ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
  title: string;
  show: boolean;
  onHide: () => void;
}

/**
 * A modal component that displays a title and content, with a close button.
 * The modal is shown or hidden based on the `show` prop.
 * It can be used to display additional information or actions to the user.
 * @component
 * @params {ModalProps} props - The props for the modal component.
 * @param {ReactNode} props.children - The content to be displayed inside the modal.
 * @param {string} props.title - The title of the modal.
 * @param {boolean} props.show - A boolean indicating whether the modal is visible or not.
 * @param {function} props.onHide - A function to be called when the modal is closed.
 * @returns {JSX.Element} The rendered navbar component.
 */
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
