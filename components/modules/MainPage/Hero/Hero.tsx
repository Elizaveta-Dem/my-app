'use client'

import { useLang } from "../../../../hooks/useLang";
import styles from "../Hero/index.module.scss"

const Hero = () => {
    const { lang, translations } = useLang()

    return (
        <div className= {styles.hero__container}>
            <h2 className={styles.hero__hidden__title}>
                {translations[lang].main_page.hero_title}
            </h2>
        </div> 
    );
};

export default Hero;