import { motion } from "framer-motion"
import Link from "next/link"

const CatalogMenuList = ({ items }: { items: { id: string; name: string }[] }) => (
    <motion.ul
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='list-reset nav-menu__accordion'
    >
        {items.map((item, i) => (
            <li
                key={item.id}
                className='nav-menu__accordion__item__list__item catalog__accordion__item__list__item'
                style={{ position: 'relative' }}
            >
                <Link
                    href={`/catalog/${item.id}`}
                    className='nav-menu__accordion__item__list__item__link'
                >
                    {item.name}
                </Link>
            </li>
        ))}
    </motion.ul>
)
  
export default CatalogMenuList