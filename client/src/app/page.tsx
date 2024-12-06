import Button from '@/components/button/Button';
import styles from './page.module.css'
import Header from "@/components/header/Header";
import DescriptionBox from '@/components/boxes/description_box/DescriptionBox';

export default function Home() {
  return (
    <div>
      <Header />
      <div className={styles["hero-background"]}></div>

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
    
      <div className={styles["about-section-container"]}>
        <h2 className='subtitle'>Mi az a devRoot?</h2>

        <div className={styles["about-section-box-container"]}>
          <div>
          <DescriptionBox width={571} height={284}>
            <p className='tag-text mb-1 font-light'>Mi a lényege?</p>
            <p className='text-xl font-light'>A devRoot megoldja a programozási feladatok nehézkes keresését, megosztását és elérését, egyszerűbbé téve a tanulást és tanítást.</p>
          </DescriptionBox>
          </div>
          <div>
            <DescriptionBox width={469} height={125}>
              <p className='appearent-tag-text mb-1 font-light'>Minden kategorizálva</p>
              <p className='font-light'>A feladatokat címkékkel rendszerezzük, megkönnyítve a keresést, tanulást, tanítást és az együttműködést.</p>
            </DescriptionBox>
            <DescriptionBox width={469} height={149}>
              <p className='appearent-tag-text mb-1 font-light'>A közösségnek</p>
              <p className='font-light'>A devRoot összeköti a tanárokat és diákokat, hogy megosszák, értékeljék és bővítsék egymás programozási tudását.</p>
            </DescriptionBox>
          </div>
        </div>
      </div>
    </div>
  );
}
