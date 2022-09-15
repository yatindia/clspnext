import styles from "../styles/pages/Home.module.sass";
import SearchHero from "../components/support/SearchHero";

export default function Home() {
  return (
    <div
      style={{
        backgroundImage:
          'url("https://dm0qx8t0i9gc9.cloudfront.net/thumbnails/video/D8qa-2E/modern-city-buildings-skyline-background-real-estate_rd-4kyw_8_thumbnail-1080_01.png")',
      }}
      className={styles.container}
    >
      <SearchHero />
    </div>
  );
}
