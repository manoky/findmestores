import Link from "next/link";
import Image from "next/image";
import cls from "classnames";
import styles from "./Card.module.css";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  imgUrl: string;
  href: string;
  name: string;
}
const Card = ({ imgUrl = "", href = "", name }: CardProps): JSX.Element => {
  return (
    <Link href={href}>
      <a className={styles.cardLink}>
        <div className={cls("glass", styles.container)}>
          <div className={styles.cardHeaderWrapper}>
            <h2 className={styles.cardHeader}>{name}</h2>
          </div>
          <div className={styles.cardImageWrapper}>
            <Image
              src={imgUrl}
              width={260}
              height={160}
              alt={name}
              className={styles.cardImage}
            />
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Card;
