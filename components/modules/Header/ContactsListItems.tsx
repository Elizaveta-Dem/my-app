import Link from "next/link"
import { useLang } from "../../../hooks/useLang"

const ContactsListItems = () => {
    const { lang, translations } = useLang()

    return (
        <>
            <li className="nav-menu__accordion__item">
                <a
                    href='tel:+77777778787'
                    className="nav-menu__accordion__item__link nav-menu__accordion__item__title"
                >
                    +7 (777) 777-87-87
                </a>
            </li>
            <li className="nav-menu__accordion__item">
                <a
                    href='mailto:nameshop@mail.ru'
                    className="nav-menu__accordion__item__link"
                >
                    nameshop@mail.ru
                </a>
            </li>
            <li className="nav-menu__accordion__item">
                <Link
                    href='https://vk.com/donstux'
                    className="nav-menu__accordion__item__link"
                >
                    {translations[lang].main_menu.vk}
                </Link>
            </li>
            <li className="nav-menu__accordion__item">
                <Link
                    href='https://t.me/donstux'
                    className="nav-menu__accordion__item__link"
                >
                    {translations[lang].main_menu.tg}
                </Link>
            </li>
        </>
    )
}

export default ContactsListItems