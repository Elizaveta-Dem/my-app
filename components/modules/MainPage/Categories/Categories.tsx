'use client'
import { useLang } from "../../../../hooks/useLang";
import styles from "../Categories/index.module.scss";
import { useMediaQuery } from "../../../../hooks/useMediaQuery";
import AllLink from "../../../elements/AllLink/AllLink";
import useImagePreloader from "../../../../hooks/useImagePreloader";
import Link from "next/link";
import Image from 'next/image';
import MainSlider from "../MainSlider";
import { useCategoryQuery } from "../../../../hooks/useCategoriesQuery";
import { Category } from "../../../../types/category";

const IMAGE_BASE_URL = 'http://127.0.0.1:7777/api/category/image';

// Для первой картинки
const imageUrl1 = `${IMAGE_BASE_URL}/categories-img-1.png`;

// Для второй картинки
const imageUrl2 = `${IMAGE_BASE_URL}/categories-img-2.png`;

// Для третьей картинки
const imageUrl3 = `${IMAGE_BASE_URL}/categories-img-3.png`;

// Для четвертой картинки
const imageUrl4 = `${IMAGE_BASE_URL}/categories-img-4.png`;

const Categories = () => {
  const { lang, translations } = useLang();
  const isMedia490 = useMediaQuery(490);
  const { handleLoadingImageComplete, imgSpinner } = useImagePreloader();
  const imgSpinnerClass = imgSpinner ? styles.img_loading : '';

  const { data, isLoading, error } = useCategoryQuery();

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка загрузки категорий</div>;
  }

  console.log(data);

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
              {data?.slice(0, 1).map((category: Category) => (
                <Link
                  key={category.id}
                  href={`/catalog/${category.id}`}
                  className={`${styles.categories__right} ${styles.categories__img} ${imgSpinnerClass}`}
                >
                  <Image
                    src={`${IMAGE_BASE_URL}/${category.image}`}
                    alt={category.name}
                    height={736}
                    width={736}
                    className='transition-opacity opacity-0 duration'
                    onLoad={handleLoadingImageComplete}
                  />
                  <span>{translations[lang].main_page.category_electric_guitars}</span>
                </Link>
              ))}
              <div className={styles.categories__left}>
                <div className={styles.categories__left__top}>
                  {data?.slice(1, 2).map((category: Category) => (
                    <Link
                      key={category.id}
                      href={`/catalog/${category.id}`}
                      className={`${styles.categories__left__top__right} ${styles.categories__img} ${imgSpinnerClass}`}
                    >
                      <Image
                        src={imageUrl2}
                        alt={category.name}
                        height={352}
                        width={352}
                        className='transition-opacity opacity-0 duration'
                        onLoad={handleLoadingImageComplete}
                      />
                      <span>{translations[lang].main_page.category_сlassical_guitars}</span>
                    </Link>
                  ))}
                  {data?.slice(2, 3).map((category: Category) => (
                    <Link
                      key={category.id}
                      href={`/catalog/${category.id}`}
                      className={`${styles.categories__left__top__left} ${styles.categories__img} ${imgSpinnerClass}`}
                    >
                      <Image
                        src={imageUrl3}
                        alt={category.name}
                        height={352}
                        width={352}
                        className='transition-opacity opacity-0 duration'
                        onLoad={handleLoadingImageComplete}
                      />
                      <span>{translations[lang].main_page.category_acoustic_guitars}</span>
                    </Link>
                  ))}
                </div>
                {data?.slice(3, 4).map((category: Category) => (
                  <Link
                    key={category.id}
                    href={`/catalog/${category.id}`}
                    className={`${styles.categories__left__bottom} ${styles.categories__img} ${imgSpinnerClass}`}
                  >
                    <Image
                      src={imageUrl4}
                      alt={category.name}
                      height={352}
                      width={736}
                      className='transition-opacity opacity-0 duration'
                      onLoad={handleLoadingImageComplete}
                    />
                    <span>{translations[lang].main_page.category_bass_guitars}</span>
                  </Link>
                ))}
              </div>
            </>
          )}
          {isMedia490 && <MainSlider />}
        </div>
      </div>
    </section>
  );
};

export default Categories;