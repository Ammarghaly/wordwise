import React from 'react'
import {  NavLink } from 'react-router-dom'
import style from './NavBar.module.css'
import Logo from './Logo';

export default function NavBar() {
  return (
    <nav className={style.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to={"/Pricing"}>Pricing</NavLink>
        </li>
        <li>
          <NavLink to={"/Product"}>Product</NavLink>
        </li>
        <li>
          <NavLink to={"/Login"} className={style.ctaLink}>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
