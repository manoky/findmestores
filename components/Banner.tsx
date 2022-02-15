import styles from "styles/Banner.module.css";

interface BannerProps {
  buttonText: string;
  handleClick: VoidFunction;
  handleSearch: VoidFunction;
  setSearchTerm: (term: string) => void;
  inputValue: string;
}
const Banner = ({
  buttonText,
  handleClick,
  setSearchTerm,
  handleSearch,
  inputValue,
}: BannerProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.searchWrapper}>
        <input
          type="text"
          placeholder="search: electronics"
          className={styles.input}
          onChange={(e) => setSearchTerm(e.target.value)}
          value={inputValue}
        />
        <button className={styles.searchButton} onClick={handleSearch}>
          search
        </button>
      </div>
      <h1 className={styles.title}>
        <span className={styles.title1}>Find me</span>
        <span className={styles.title2}>Stores</span>
      </h1>
      <p className={styles.subTitle}>Discover your local shops!</p>
      <div className={styles.buttonWrapper}>
        <button className={styles.button} onClick={handleClick}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};
export default Banner;
