import classes from './Header.module.css';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className={classes.Header}>
      <div className={classes.Header__Container}>
        <Link to="/" className={classes.Header__Logo}>
          Where in the world ?
        </Link>
        <ThemeSwitcher />
      </div>
    </header>
  );
}
