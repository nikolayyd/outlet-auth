import '../styles/Modal.css';

export interface ModalProps {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, title, children, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {title && <h2 className="modal-title">{title}</h2>}
        <div className="modal-body">{children}</div>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  );
};

