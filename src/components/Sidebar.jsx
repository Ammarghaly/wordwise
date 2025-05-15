import React from 'react'
import Logo from './Logo';
import AppNav from "./AppNav";
import styles from './Sidebar.module.css'
import { Outlet } from 'react-router-dom';


export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <div >
        <Logo />
        <AppNav />
        <Outlet />
      </div>
      <footer className="copyright">
        {new Date().getFullYear()}  Copy  Right
      </footer>
    </div>
  );
}
