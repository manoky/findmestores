import styles from "styles/loader.module.css";
import cls from "classnames";

interface LoaderProps {
  small?: boolean;
}
const Loader = ({ small }: LoaderProps) => {
  return (
    <div className={styles.loaderWrapper}>
      <div className={cls(styles.loader, { lower: small })}></div>
    </div>
  );
};

export { Loader };
