import { useEffect, useState } from "react";
import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import useSWR from "swr";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import styles from "styles/coffee-store.module.css";
import { CoffeeStoreDataType } from "types/CoffeeStoreDataType";
import Image from "next/image";
import cls from "classnames";
import { Loader } from "components/Loader";
import { favouriteStore, getStoreById } from "utils/storesApi";
import { FetchStores } from "utils/fetchApi";

interface Props {
  store: CoffeeStoreDataType;
}

const CoffeeStore: NextPage<Props> = ({ store: initialStore }) => {
  const [store, setStore] = useState(initialStore);
  const { query, isFallback } = useRouter();
  const { id } = query;

  const { data, error } = useSWR(id, getStoreById);

  useEffect(() => {
    if (data) {
      setStore(data);
    }
  }, [data]);

  const handleUpVote = async () => {
    try {
      const data = await favouriteStore(store);
      setStore(data);
    } catch (err) {
      console.log(err);
    }
  };

  if (isFallback || (!store && !error)) {
    return <Loader />;
  }

  if (error) {
    return <div>Something went wrong getting store</div>;
  }

  return (
    <div>
      <div className={styles.backToHomeLink}>
        <Head>
          <title>{store.name}</title>
          <meta name="description" content={`${store.name} store`} />
        </Head>
      </div>
      <div className={styles.container}>
        <div className={styles.col1}>
          <Link href="/">
            <a className={styles.text}>← Back to home</a>
          </Link>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{store.name}</h1>
          </div>
          <Image
            src={store.imgUrl}
            width={600}
            height={360}
            alt={store.name}
            className={styles.storeImg}
            priority
          />
        </div>
        <div className={cls("glass", styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/places.svg"
              width={24}
              height={24}
              alt=""
            />
            <p className={styles.text}>{store.address}</p>
          </div>
          {!!store.neighborhood && (
            <div className={styles.iconWrapper}>
              <Image
                src="/static/icons/nearMe.svg"
                width={24}
                height={24}
                alt=""
              />
              <p className={styles.text}>{store.neighborhood}</p>
            </div>
          )}
          <div className={styles.iconWrapper}>
            <Image src="/static/icons/star.svg" width={24} height={24} alt="" />
            <p className={styles.text}>{store.votes}</p>
          </div>

          <button className={styles.upvoteButton} onClick={handleUpVote}>
            Up vote!
          </button>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const coffeeStores = await FetchStores({});

  return {
    props: {
      store:
        coffeeStores?.find(
          (store: CoffeeStoreDataType) => store.id === params?.id
        ) || null,
    },
  };
};
export const getStaticPaths: GetStaticPaths = async () => {
  const coffeeStores = await FetchStores({});

  return {
    paths: coffeeStores!.map((store: CoffeeStoreDataType) => ({
      params: {
        id: store.id,
      },
    })),
    fallback: true,
  };
};

export default CoffeeStore;
