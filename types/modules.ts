import { Product } from "./product"

export interface IAccordionProps {
  children: React.ReactNode
  title: string | JSX.Element
  titleClass: string
  rotateIconClass?: string
}

export interface IMenuLinkItemProps {
  item: {
    id: number
    text: string
    href: string
  }
  handleRedirectToCatalog: (arg0: string) => void
}

export interface OrderInfoBlock {
  isCorrectPromotionalCode?: boolean
  isOrderPage?: boolean
}

export interface ICatalogMenuButtonProps {
  name: string
  isActive: boolean
  handler: VoidFunction
}

export interface IProductsListItemProps {
  product: Product
}
