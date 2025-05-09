import { FC } from "react";
import styles from "./assets/css/Alert.module.css";
import { useNavigate } from "react-router-dom";

type AlertType = "success" | "warning" | "error";

interface AlertProps {
  type: AlertType;
  message: string;
  link?: string;
  linkMessage?: string;
}

const Alert: FC<AlertProps> = ({ type, message, link, linkMessage }) => {
  const alertClass = {
    success: styles.alertSuccess,
    warning: styles.alertWarning,
    error: styles.alertError,
  }[type];
  const navigate = useNavigate();

  return (
    <div className={`${styles.alert} ${alertClass}`}>
      {message}
      {link && linkMessage ? (
        <a onClick={() => navigate(link)}>
          {" "}
          <span className={`${styles.linkStyle}`}>{linkMessage}</span>
        </a>
      ) : null}
    </div>
  );
};

export default Alert;
