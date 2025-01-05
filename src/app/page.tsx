import Button from '@/components/button/Button';
import styles from './page.module.css'
import DescriptionBox from '@/components/boxes/description/DescriptionBox';

export default function Home() {
  return (
    <div>
      <div className={styles["hero-background"]} />

      <div className={styles["hero-section-container"]}>
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
        <h2 className='subtitle text-center'>Mi az a devRoot?</h2>

        <div className={styles["about-section-box-container"]}>
          <div>
          <DescriptionBox width={571} height={284}>
            <p className='tag-text mb-1 font-light'>Mi a lényege?</p>
            <p className='text-xl font-light'>A devRoot megoldja a programozási feladatok nehézkes keresését, megosztását és elérését, egyszerűbbé téve a tanulást és tanítást.</p>
          </DescriptionBox>
          </div>
          <div>
            <DescriptionBox width={469} height={125}>
              <p className='apparent large-tag-text mb-1 font-light'>Minden kategorizálva</p>
              <p className='font-light inapparent'>A feladatokat címkékkel rendszerezzük, megkönnyítve a keresést, tanulást, tanítást és az együttműködést.</p>
            </DescriptionBox>
            <DescriptionBox width={469} height={149}>
              <p className='apparent large-tag-text mb-1 font-light'>A közösségnek</p>
              <p className='font-light inapparent'>A devRoot összeköti a tanárokat és diákokat, hogy megosszák, értékeljék és bővítsék egymás programozási tudását.</p>
            </DescriptionBox>
          </div>
        </div>
      </div>
   
      <div className={styles["categories-section-container"]}>
        <h2 className='subtitle text-left leading-tight'>
          A platformon található feladatokat 
            <br/> 
          gondosan kategorizáltuk címkék segítségével.
        </h2>
        <div className={'my-7 ' + styles["categories-button-container"]}>
          <Button size='small'>Feladatok</Button>
          <Button size='small' ghost={true}>Regisztráció</Button>
        </div>
        <div className={styles['categories-list']}>
          <DescriptionBox width={343} height={209} url='feladatok'>
            <h3 className='large-tag-text mb-1'>Nehézségi szint</h3>
            <p className='font-light inapparent'>Kezdő, haladó feladat, vagy középszintű, emelt szintű érettségi...</p>
          </DescriptionBox>
          <DescriptionBox width={343} height={209} url='feladatok'>
            <h3 className='large-tag-text mb-1'>Téma</h3>
            <p className='font-light inapparent'>Algoritmusos feladat, adatbáziskezelés, front-end, back-end...</p>
          </DescriptionBox>
          <DescriptionBox width={343} height={209} url='feladatok'>
            <h3 className='large-tag-text mb-1'>Feladat típusa</h3>
            <p className='font-light inapparent'>Gyakorlófeladat, projektfeladat, vizsgafelkészítő, versenyfeladat...</p>
          </DescriptionBox>
        </div>
      </div>

      <div className={styles["cta-section-container"]}>
        <div className={styles["cta-background"]} />
        <div className="relative z-10 text-center">
          <h2 className='subtitle text-center leading-tight'>
            Csatlakozz most egy fejlődő, erős
            <br/>
            programozói közösséghez!
          </h2>
          <div className={styles['cta-button-container']}>
            <Button>Csatlakozás</Button>
          </div>
        </div>
      </div>

    </div>
  );
}
