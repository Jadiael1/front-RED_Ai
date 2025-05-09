import React from "react";
import styles from "./assets/css/ConfirmationDialog.module.css";

interface ConfirmationDialogProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  isOpen: boolean;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  title,
  message,
  onConfirm,
  onCancel,
  isOpen,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        <h2>{title}</h2>
        <p>{message}</p>
        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onCancel}>
            Cancelar
          </button>
          <button className={styles.confirmBtn} onClick={onConfirm}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
