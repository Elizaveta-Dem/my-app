import Slider from 'react-slick'
import Link from 'next/link';
import Image from 'next/image';
import { StaticImageData } from 'next/image';
import useImagePreloader from "../../../hooks/useImagePreloader";
import styles from "../../modules/MainPage/index.module.scss"
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { useEffect, useState } from 'react';
import { fetchCategory } from '../../../services/fetch';
import { Category } from '../../../types/category';


const MainSlider = () => {
  const [images, setImages] = useState <{
    src: string;
    id: number;
    title: string;
  }[]>([]);
  const isMedia420 = useMediaQuery(420);
  const { handleLoadingImageComplete, imgSpinner } = useImagePreloader();
  const imgSpinnerClass = imgSpinner ? styles.img_loading : '';
  
  useEffect(() => {
    async function fetchCategories() {
      try {
        const categories = await fetchCategory();
        const images = categories.map((category: Category) => ({
          src: `/img/category/${category.image}`,
          id: category.id,
          title: category.name,
        }));
        setImages(images);
      } catch (error) {
        console.error('Error fetching categories:', error);
        // Обработка ошибки загрузки категорий
      }
    }
    fetchCategories();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    slidesToScroll: 1,
    variableWidth: true,
    autoplay: true,
    speed: 500,
    arrows: false,
  };

  useEffect(() => {
    const slider = document.querySelectorAll(`.${styles.categories__slider}`);
    slider.forEach((category) => {
      const list = category.querySelector('.slick-list') as HTMLElement;
      list.style.height = isMedia420 ? '290px' : '357px';
      list.style.marginRight = '-15px';
    });
  }, [isMedia420]);

  return (
    <Slider {...settings} className={styles.categories__slider}>
      {images.map((category) => (
        <Link
          key={category.id}
          style={{ width: isMedia420 ? 290 : 357 }}
          className={`${styles.categories__slide} ${styles.categories__img} ${imgSpinnerClass}`}
          href={`/catalog/${category.id}`}
        >
          <Image
            src={category.src}
            alt={category.title}
            width={357}
            height={357}
            onLoad={handleLoadingImageComplete}
          />
          <span>{category.title.replace(/\s/g, '\u00A0')}</span>
        </Link>
      ))}
    </Slider>
  );
};

export default MainSlider;