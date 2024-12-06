import Button from '@/components/button/Button';
import styles from './page.module.css'
import Header from "@/components/header/Header";

export default function Home() {
  return (
    <div>
      <Header />
      <div className={styles["hero-section"]}>
      </div>

      <div className={styles["text-wrapper"]}>
        <h1 className="title">Közösen írjuk a jövőd kódját</h1>
        <h3 className="my-4 title-description">
          Egy közösség, ahol tanárok és diákok programozási feladatokat oszthatnak meg és használhatnak.
        </h3>
        <div className={'my-7 ' + styles["hero-button-container"]}>
          <Button>Feladatok</Button>
          <Button ghost={true}>Regisztráció</Button>
        </div>
      </div>
    </div>
  );
}
