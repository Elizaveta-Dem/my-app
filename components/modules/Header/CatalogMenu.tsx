'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { $catalogMenuIsOpen, closeCatalogMenu } from '../../../context/modals';
import { useLang } from '../../../hooks/useLang';
import { useMenuAnimation } from '../../../hooks/useMenuAnimation';
import Header from './Header';
import { removeOverflowHiddenFromBody } from '../../../lib/utilis/common';
import { useUnit } from 'effector-react';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import CatalogMenuButton from './CatalogMenuButton';
import CatalogMenuList from './CatalogMenuList';
import Accordion from '../Accordion/Accordion';
import { fetchCategory } from '../../../services/fetch';
import Link from 'next/link';
import { Category } from '../../../types/category';

const CatalogMenu = () => {
  const catalogMenuIsOpen = useUnit($catalogMenuIsOpen);
  const [showGuitarsList, setShowGuitarsList] = useState(false);
  const { lang, translations } = useLang();
  const { itemVariants, sideVariants, popupZIndex } = useMenuAnimation(2, catalogMenuIsOpen);
  const isMedia450 = useMediaQuery(450);

  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCategories() {
        try {
            const fetchedCategories: Category[] = await fetchCategory();
            setCategories(fetchedCategories.map(category => ({ id: category.id.toString(), name: category.name })));
        } catch (error) {
            setError('Ошибка загрузки категорий');
        } finally {
            setIsLoading(false);
        }
    }
    loadCategories();
}, []);
  const handleShowGuitarsList = () => {
    setShowGuitarsList(true);
  };

  const handleCloseMenu = () => {
    removeOverflowHiddenFromBody();
    closeCatalogMenu();
    setShowGuitarsList(false);
  };

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='catalog-menu' style={{ zIndex: popupZIndex }}>
      <AnimatePresence>
        {catalogMenuIsOpen && (
          <motion.aside
            initial={{ width: 0 }}
            animate={{
              width: '100%',
            }}
            exit={{
              width: 0,
              transition: { delay: 0.7, duration: 0.3 },
            }}
            className='catalog-menu__aside'
          >
            <div className='catalog-menu__header'>
              <Header />
            </div>
            <motion.div
              className='catalog-menu__inner'
              initial='closed'
              animate='open'
              exit='closed'
              variants={sideVariants}
            >
              <motion.button
                className='btn-reset catalog-menu__close'
                variants={itemVariants}
                onClick={handleCloseMenu}
              />
              <motion.h2
                variants={itemVariants}
                className='catalog-menu__title'
              >
                {translations[lang].main_menu.catalog}
              </motion.h2>
              <ul className='list-reset catalog-menu__list'>
                <motion.li
                  key={1}
                  variants={itemVariants}
                  className='catalog-menu__list__item'
                >
                  {!isMedia450 && (
                    <CatalogMenuButton
                      handler={handleShowGuitarsList}
                      name={translations[lang].main_menu.guitars}
                      isActive={showGuitarsList}
                    />
                  )}
                  {!isMedia450 && (
                    <AnimatePresence>
                      {showGuitarsList && (
                        <CatalogMenuList items={categories} />
                      )}
                    </AnimatePresence>
                  )}
                  {isMedia450 && (
                    <Accordion
                      title={translations[lang].main_menu.guitars}
                      titleClass='btn-reset nav-menu__accordion__item__title'
                    >
                      <ul className='list-reset catalog__accordion__list'>
                        {categories.map((category) => (
                          <li
                            key={category.id}
                            className='catalog__accordion__list__item'
                          >
                            <Link
                              href={`/catalog/${category.id}`}
                              className='nav-menu__accordion__item__list__item__link'
                            >
                              {category.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </Accordion>
                  )}
                </motion.li>
              </ul>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CatalogMenu;