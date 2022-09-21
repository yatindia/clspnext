import styles from "../styles/pages/Home.module.sass";
import SearchHero from "../components/support/SearchHero";

export default function Home() {
  return (
    <div className={styles.container}>
      <SearchHero />
    </div>
  );
}
