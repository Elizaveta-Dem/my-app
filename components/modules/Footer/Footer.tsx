import Link from "next/link";
import Logo from "../../elements/Logo/logo";
import { useLang } from "../../../hooks/useLang";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import FooterLinks from "./FooterLinks";
import FooterMobileLink from "./FooterMobileLink";


const Footer = () => {
    const { lang, translations } = useLang()
    const isMedia950 = useMediaQuery(950) //для адаптива хуки
    const isMedia640 = useMediaQuery(640)

    return (
        <footer className='footer'>
            <div className='footer__top'>
                <div className='container footer__top__container'>
                    <div className='footer__logo'>
                        <Logo />
                    </div>
                    <div className='footer__contacts'>
                        <span>
                            <a href='tel:+77777778787'>+7 (777) 777-87-87</a>
                        </span>
                        <span>
                            <a href='mailto:nameshop@mail.ru'>nameshop@mail.ru</a>
                        </span>
                        {isMedia950 && <FooterLinks/>}
                    </div>
                    {!isMedia950 && <FooterLinks />}
                    <ul className='list-reset footer__socials'>
                        <li className='footer__socials__item'>
                            <a
                                href='https://t.me/donstux'
                                className='footer__socials__item__link'
                            />
                        </li>
                        <li className='footer__socials__item'>
                            <a
                                href='https://vk.com/donstux'
                                className='footer__socials__item__link'
                            />
                        </li>
                        <li className='footer__socials__item'>
                            <a
                                href='https://www.youtube.com/channel/UCwYUHEQp-JKedLfrwEYAIUw/featured'
                                className='footer__socials__item__link'
                            />
                        </li>
                    </ul>
                </div>
            </div> 
            <div className='footer__bottom'>
                <div className='container footer__bottom__container'>
                    <div className='footer__copyright'>
                        © 2011-2023 {translations[lang].footer.copyright}
                        <br />
                    </div>
                    <div className='footer__policy'>
                        <div className='footer__policy__inner'>
                            <Link href='/personal-data-policy'>
                                {translations[lang].footer.policy}
                            </Link>
                            <Link href='/privacy-policy'>
                                {translations[lang].footer.privacy}
                            </Link>
                        </div>
                        {isMedia640 && (
                            <FooterMobileLink text={translations[lang].footer.full_version} />
                        )}
                    </div>
                    {!isMedia640 && (
                        <FooterMobileLink text={translations[lang].footer.mobile_version} />
                    )}
                </div>
            </div>
        </footer>
    );
};

export default Footer;