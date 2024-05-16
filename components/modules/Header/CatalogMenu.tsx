'use client'
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { $catalogMenuIsOpen, closeCatalogMenu } from '../../../context/modals';
import { useLang } from '../../../hooks/useLang';
import { useMenuAnimation } from '../../../hooks/useMenuAnimation';
import Header from './Header';
import { removeOverflowHiddenFromBody } from '../../../lib/utilis/common';
import { useStore, useUnit } from 'effector-react';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import CatalogMenuButton from './CatalogMenuButton';
import CatalogMenuList from './CatalogMenuList';
import Accordion from '../Accordion/Accordion';
import Link from 'next/link';

const CatalogMenu = () => {
    const catalogMenuIsOpen = useUnit($catalogMenuIsOpen)
    const [showGuitarsList, setShowGuitarsList] = useState(false)
    const { lang, translations } = useLang()
    const { itemVariants, sideVariants, popupZIndex } = useMenuAnimation(
        2,
        catalogMenuIsOpen
    )

    const isMedia450 = useMediaQuery(450)

    const handleShowGuitarsList = () => {
        setShowGuitarsList(true)
    }

    const handleCloseMenu = () => {
        removeOverflowHiddenFromBody()
        closeCatalogMenu()
        setShowGuitarsList(false)
    }

    const items = [
        {
            name: translations[lang].main_menu.guitars,
            id: 1,
            items: [
                translations[lang].comparison['electric_guitars'],
                translations[lang].comparison['acoustic_guitars'],
                translations[lang].comparison['сlassical_guitars'],
                translations[lang].comparison['bass_guitars'],
            ],
            handler: handleShowGuitarsList, //ф-ия для открытия 
        },
    ]
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
                                {items.map(({id, name, items, handler}) => {
                                    const buttonProps = (isActive: boolean) => ({
                                        handler: handler as VoidFunction,
                                        name,
                                        isActive,
                                    })

                                    const isCurrentList = (
                                        showList: boolean,
                                        currentId: number
                                    ) => showList && id === currentId

                                    return(
                                        <motion.li
                                            key={id}
                                            variants={itemVariants}
                                            className='catalog-menu__list__item'
                                        >
                                            {!isMedia450 && (
                                                <>
                                                    {id === 1 && (
                                                        <CatalogMenuButton
                                                            {...buttonProps(showGuitarsList)}
                                                        />
                                                    )}
                                                </>
                                            )}
                                            {!isMedia450 && (
                                                <AnimatePresence>
                                                    {isCurrentList(showGuitarsList, 1) && (
                                                        <CatalogMenuList items={items} />
                                                    )}
                                                </AnimatePresence>
                                            )}
                                            {isMedia450 && (
                                                <Accordion
                                                    title={name}
                                                    titleClass='btn-reset nav-menu__accordion__item__title'
                                                >
                                                    <ul className='list-reset catalog__accordion__list'>
                                                        {items.map((title, i) => (
                                                            <li
                                                                key={i}
                                                                className='catalog__accordion__list__item'
                                                            >
                                                                <Link
                                                                    href='/catalog'
                                                                    className='nav-menu__accordion__item__list__item__link'
                                                                >
                                                                    {title}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </Accordion>
                                            )} 
                                        </motion.li>
                                    )
                                })}
                            </ul>
                        </motion.div>
                    </motion.aside>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CatalogMenu;