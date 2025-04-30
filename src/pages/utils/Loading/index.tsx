import styles from "./assets/css/Loading.module.css";
const LoadingPage = () => {
  return (
    <div className={styles["loading-container"]}>
      <div className={styles.spinner}></div>
      <p>Carregando ...</p>
    </div>
  );
};
export default LoadingPage;
