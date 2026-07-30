import Modal from './Modal.jsx';

function ConfirmationDialog({ title = 'Are you sure?', message, confirmLabel = 'Confirm', onConfirm, onClose }) {
  return <Modal title={title} onClose={onClose}><p className="modal-message">{message}</p><div className="modal-actions"><button className="button button-secondary" type="button" onClick={onClose}>Cancel</button><button className="button button-danger" type="button" onClick={onConfirm}>{confirmLabel}</button></div></Modal>;
}

export default ConfirmationDialog;
