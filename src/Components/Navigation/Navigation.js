import { NavLink } from "react-router-dom";

import s from './Navigation.module.css'

const Navigation = () => {
  return  <nav className={s.navigation}>
        <NavLink exact to="/" className={s.navLink} activeClassName={s.activeLink}>Home</NavLink>
        <NavLink exact to="/movies" className={s.navLink} activeClassName={s.activeLink}>Movies</NavLink>
    </nav>
}

export default Navigation;
