import Head from "next/head";
import styles from "styles/Home.module.css";
import Card from "components/Card/Card";
import { CoffeeStoreDataType } from "types";

interface CardListProps {
  stores: CoffeeStoreDataType[];
  title: string;
}

const CardList: React.FC<CardListProps> = ({ stores, title }) => {
  return (
    <div className={styles.container}>
      {stores.length > 0 ? (
        <div className={styles.sectionWrapper}>
          <h2 className={styles.heading2}>{title}</h2>
          <div className={styles.cardLayout}>
            {stores.map((store: CoffeeStoreDataType) => {
              return (
                <Card
                  key={store.id}
                  name={store.name}
                  imgUrl={store.imgUrl}
                  href={`/stores/${store.id}`}
                  className={styles.card}
                />
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CardList;
