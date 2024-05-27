import { useState } from "react";
import { useLang } from "../../../hooks/useLang";
import { $menuIsOpen, closeMenu } from "../../../context/modals";
import { useUnit } from "effector-react";
import { removeOverflowHiddenFromBody } from "../../../lib/utilis/common";
import { AllowedLangs } from "../../../constants/lang";
import { setLang } from "../../../context/lang";
import Logo from "../../elements/Logo/logo";
import { AnimatePresence, motion } from "framer-motion";
import Accordion from "../Accordion/Accordion";
import { usePathname } from "next/navigation";
import MenuLinkItem from "./MenuLinkItem";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import BuyersListItems from "./BuyersListItems";
import ContactsListItems from "./ContactsListItems";
import { useCategoryQuery } from "../../../hooks/useCategoriesQuery";


const Menu = () => {
    const [showCatalogList, setShowCatalogList] = useState(false);
    const [showBuyersList, setShowBuyersList] = useState(false);
    const [showContactsList, setShowContactsList] = useState(false);
    const { lang, translations } = useLang();
    const pathname = usePathname();
    const isMedia800 = useMediaQuery(800)
    const isMedia640 = useMediaQuery(640)
    const menuIsOpen = useUnit($menuIsOpen);

    const { data, isLoading, error } = useCategoryQuery();

    const handleSwitchLang = (lang: string) => {
        setLang(lang as AllowedLangs)
        localStorage.setItem('lang', JSON.stringify(lang))
    }

    const handleSwitchLangToRu = () => handleSwitchLang('ru')
    const handleSwitchLangToEn = () => handleSwitchLang('en')
   

    const handleShowCatalogList = () => {
        setShowCatalogList(true);
        setShowBuyersList(false);
        setShowContactsList(false);
    };

    const handleShowBuyersList = () => {
        setShowCatalogList(false);
        setShowBuyersList(true);
        setShowContactsList(false);
    };

    const handleShowContactsList = () => {
        setShowCatalogList(false);
        setShowBuyersList(false);
        setShowContactsList(true);
    };

    const handleCloseMenu = () => {
        removeOverflowHiddenFromBody();
        closeMenu();
    };

    const handleRedirectToCatalog = (path: string) => {
        if (pathname.includes('/catalog')) {
            window.history.pushState({ path }, '', path);
            window.location.reload();
        }
        handleCloseMenu();
    };

    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>Ошибка загрузки категорий</div>;
      }

    return (
        <nav className={`nav-menu ${menuIsOpen ? 'open' : 'close'}`}>
            <div className="container nav-menu__container">
                <div className={`nav-menu__logo ${menuIsOpen ? 'open' : ''}`}>
                    <Logo />
                </div>
                <button
                    className={`btn-reset nav-menu__close ${menuIsOpen ? 'open' : ''}`}
                    onClick={handleCloseMenu}
                />
                <div className={`nav-menu__lang ${menuIsOpen ? 'open' : ''}`}>
                <button
                        className={`btn-reset nav-menu__lang__btn ${
                            lang === 'ru' ? 'lang-active' : ''
                        }`}
                        onClick={handleSwitchLangToRu}
                    >
                        RU
                    </button>
                    <button
                        className={`btn-reset nav-menu__lang__btn ${
                            lang === 'en' ? 'lang-active' : ''
                        }`}
                        onClick={handleSwitchLangToEn}
                    >
                        EN
                    </button>
                </div>
                <ul className={`list-reset nav-menu__list ${menuIsOpen ? 'open' : ''}`}>
                    {!isMedia800 && (
                        <li className='nav-menu__list__item'>
                            <button 
                                className='btn-reset nav-menu__list__item__btn'
                                onMouseEnter={handleShowCatalogList}
                            >
                                {translations[lang].main_menu.catalog}
                            </button>
                            <AnimatePresence>
                                {showCatalogList && (
                                    <motion.ul 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className='list-reset nav-menu__accordion'
                                    >
                                        <li className='nav-menu__accordion__item'>
                                            <Accordion 
                                                title={translations[lang].main_menu.guitars}
                                                titleClass='btn-reset nav-menu__accordion__item__title'
                                            >
                                                <ul className='list-reset nav-menu__accordion__item__list'>
                                                    {data?.map((category) => (
                                                        <MenuLinkItem
                                                            key={category.id}
                                                            item={{
                                                                id: category.id,
                                                                text: category.name,
                                                                href: `/catalog/${category.id}`,
                                                            }}
                                                            handleRedirectToCatalog={handleRedirectToCatalog}
                                                        />
                                                    ))}
                                                </ul>
                                            </Accordion>
                                        </li>
                                    </motion.ul>
                                )}
                            </AnimatePresence>
                        </li>
                    )}
                    <li className='nav-menu__list__item'>
                        {!isMedia640 && (
                            <button
                                className='btn-reset nav-menu__list__item__btn'
                                onMouseEnter={handleShowBuyersList}
                            >
                                {translations[lang].main_menu.buyers}
                            </button>
                        )}
                        {!isMedia640 && (
                            <AnimatePresence>
                                {showBuyersList && (
                                    <motion.ul
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className='list-reset nav-menu__accordion'
                                    >
                                        <BuyersListItems />
                                    </motion.ul>
                                )}
                            </AnimatePresence> 
                        )}
                        {isMedia640 && (
                            <Accordion
                                title={translations[lang].main_menu.buyers}
                                titleClass='btn-reset nav-menu__list__item__btn'
                            >
                                <ul className='list-reset nav-menu__accordion__item__list'>
                                    <BuyersListItems />
                                </ul>
                            </Accordion>
                        )}
                    </li>
                    <li className='nav-menu__list__item'>
                        {!isMedia640 && (
                            <button
                                className='btn-reset nav-menu__list__item__btn'
                                onMouseEnter={handleShowContactsList}
                            >
                                {translations[lang].main_menu.contacts}
                            </button>
                        )}
                        {!isMedia640 && (
                            <AnimatePresence>
                                {showContactsList && (
                                    <motion.ul
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className='list-reset nav-menu__accordion'
                                    >
                                        <ContactsListItems />
                                    </motion.ul>
                                )}
                            </AnimatePresence> 
                        )}
                        {isMedia640 && (
                            <Accordion
                                title={translations[lang].main_menu.contacts}
                                titleClass='btn-reset nav-menu__list__item__btn'
                            >
                                <ul className='list-reset nav-menu__accordion__item__list'>
                                    <ContactsListItems />
                                </ul>
                            </Accordion>
                        )}
                    </li>
                </ul>
           </div>
        </nav>
    );
};

export default Menu;
