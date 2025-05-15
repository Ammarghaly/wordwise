import React from 'react'
import style from "./AppNav.module.css";
import { NavLink } from 'react-router-dom';

export default function AppNav() {
  return (
    <nav className={style.nav}>
      <ul>
        <li>
          <NavLink to={'Countries'}>Countries</NavLink>
        </li>
        <li>
          <NavLink to={'Cities'}>Cities</NavLink>
        </li>
      </ul>
    </nav>
  );
}
