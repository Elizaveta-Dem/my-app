'use client'
import { useLang } from "../../../../hooks/useLang";
import img1 from '../../../../public/img/categories-img-1.png';
import img2 from '../../../../public/img/categories-img-2.png';
import img3 from '../../../../public/img/categories-img-3.png';
import img4 from '../../../../public/img/categories-img-4.png';
import styles from "../Categories/index.module.scss";
import { useMediaQuery } from "../../../../hooks/useMediaQuery";
import AllLink from "../../../elements/AllLink/AllLink";
import useImagePreloader from "../../../../hooks/useImagePreloader";
import Link from "next/link";
import Image from 'next/image';
import MainSlider from "../MainSlider";

const Categories = () => {
    const { lang, translations } = useLang()
    const isMedia490 = useMediaQuery(490)
    const { handleLoadingImageComplete, imgSpinner } = useImagePreloader()
    const imgSpinnerClass = imgSpinner ? styles.img_loading : ''

    const images = [
        { src: img1, id: 1, title: translations[lang].main_page.category_electric_guitars },
        {
          src: img2,
          id: 2,
          title: translations[lang].main_page.category_сlassical_guitars,
        },
        {
          src: img3,
          id: 3,
          title: translations[lang].main_page.category_acoustic_guitars,
        },
        { src: img4, id: 4, title: translations[lang].main_page.category_bass_guitars },
    ]
    
    
    return (
        <section className={styles.categories}>
            <div className={`container ${styles.categories__container}`}>
                <h2 className={`site-title ${styles.categories__title}`}>
                    {translations[lang].main_page.category_title}
                </h2>
                <div className={styles.categories__inner}>
                    <AllLink />
                    {!isMedia490 && (
                        <>
                            <Link
                                href='/catalog/electric_guitars'
                                className={`${styles.categories__right} ${styles.categories__img} ${imgSpinnerClass}`}
                            >
                                <Image
                                    src={img1}
                                    alt='Electric_guitars'
                                    className='transition-opacity opacity-0 duration'
                                    onLoad={handleLoadingImageComplete}
                                />
                                <span>{translations[lang].main_page.category_electric_guitars}</span>
                            </Link>
                            <div className={styles.categories__left}>
                                <div className={styles.categories__left__top}>
                                    <Link
                                        href='/catalog/сlassical_guitars'
                                        className={`${styles.categories__left__top__right} ${styles.categories__img} ${imgSpinnerClass}`}
                                    >
                                        <Image
                                            src={img2}
                                            alt='Classical_guitars'
                                            className='transition-opacity opacity-0 duration'
                                            onLoad={handleLoadingImageComplete}
                                        />
                                        <span>
                                            {translations[lang].main_page.category_сlassical_guitars}
                                        </span>
                                    </Link>
                                    <Link
                                        href='/catalog/acoustic_guitars'
                                        className={`${styles.categories__left__top__left} ${styles.categories__img} ${imgSpinnerClass}`}
                                    >
                                        <Image
                                            src={img3}
                                            alt='Acoustic_guitars'
                                            className='transition-opacity opacity-0 duration'
                                            onLoad={handleLoadingImageComplete}
                                        />
                                        <span>
                                            {translations[lang].main_page.category_acoustic_guitars}
                                        </span>
                                    </Link>
                                </div>
                                <Link
                                    href='/catalog/bass_guitars'
                                    className={`${styles.categories__left__bottom} ${styles.categories__img} ${imgSpinnerClass}`}
                                >
                                    <Image
                                        src={img4}
                                        alt='Bass_guitars'
                                        className='transition-opacity opacity-0 duration'
                                        onLoad={handleLoadingImageComplete}
                                    />
                                    <span>{translations[lang].main_page.category_bass_guitars}</span>
                                </Link>
                            </div>
                        </>
                    )}
                    {isMedia490 && <MainSlider images={images} />}
                </div>
            </div>
        </section>
    );
};

export default Categories;