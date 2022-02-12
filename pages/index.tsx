import type { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Banner from "components/Banner";
import CardList from "components/CardList";
import styles from "styles/Home.module.css";
import { CoffeeStoreDataType } from "types";
import { useLocation } from "hooks";
import { useEffect, useState } from "react";
import { useStoreContext } from "context/StoreContext";
import { FetchStores } from "utils/fetchApi";

interface CoffeeStoreProps {
  stores: CoffeeStoreDataType[];
}

const Home: NextPage<CoffeeStoreProps> = ({ stores: initialStore }) => {
  const { locationError, acessLocation, isLocating } = useLocation();
  const [stores, setStores] = useState(initialStore);
  const [query, setQuery] = useState("");

  const {
    dispatch,
    state: { latLong, nearByStores, searchTerm },
  } = useStoreContext();

  const onButtonClick = () => {
    acessLocation();
  };

  useEffect(() => {
    async function fetchStores() {
      const data = await fetch(
        `api/coffee-stores?latlong=${latLong}&limit=9&query=${searchTerm}`
      );

      const stores = await data.json();
      dispatch({ type: "SET_STORES", payload: stores });
    }

    if (latLong) {
      fetchStores();
    }
  }, [dispatch, latLong, searchTerm]);

  useEffect(() => {
    async function fetchStores() {
      const data = await fetch(
        `api/coffee-stores?}&limit=9&query=${searchTerm}`
      );

      const stores = await data.json();
      if (stores) {
        setStores(stores);
      }
    }

    fetchStores();
  }, [searchTerm]);

  const handleSearch = () => {
    if (query) {
      dispatch({ type: "SET_QUERY", payload: query });
      setQuery("");
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Find me stores</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner
          buttonText={isLocating ? "Locating..." : "View stores nearby"}
          handleClick={onButtonClick}
          handleSearch={handleSearch}
          setSearchTerm={setQuery}
          inputValue={query}
        />

        {!!locationError && `Sometning went wrong: ${locationError}`}
        <div className={styles.heroImage}>
          <Image src="/static/hero-image.png" alt="" width={700} height={400} />
        </div>

        {nearByStores.length > 0 ? (
          <CardList
            stores={nearByStores}
            title={`${nearByStores[0].category} stores near me`}
          />
        ) : null}

        {stores.length > 0 ? (
          <CardList
            stores={stores}
            title={`Berlin ${stores[0].category} stores`}
          />
        ) : null}
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (): Promise<{
  props: CoffeeStoreProps;
}> => {
  try {
    const stores = await FetchStores({});

    return {
      props: {
        stores: stores,
      },
    };
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }

    return {
      props: {
        stores: [],
      },
    };
  }
};

export default Home;