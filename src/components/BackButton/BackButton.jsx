import classes from './BackButton.module.css';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa6';

export default function BackButton() {
  return (
    <Link to="/" className={classes.BackButton}>
      <FaArrowLeft className={classes.BackButton__Icon} />
      Back
    </Link>
  );
}
