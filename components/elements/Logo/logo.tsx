/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'

const Logo = () => (
  <Link className="logo" href="/">
    <img className="logo__img" src="/img/logo.svg" alt="Nameshop Logo" />
  </Link>
)

export default Logo
