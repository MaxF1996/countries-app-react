import LazyLoad from "react-lazyload";
import { Link } from "react-router-dom";
import classes from "./Card.module.css";

export default function Card({
  data: { flags, name, population, region, capital, cioc, alpha3Code, flag },
  renderReason,
}) {
  const formattedPopulation = population.toLocaleString("uk-UA");
  const countryCode = (alpha3Code || cioc).toLowerCase();
  return (
    <li className={classes.Card}>
      {renderReason === "search" ? (
        <Link to={`/${countryCode}`}>
          <img
            className={classes.Card__Flag}
            src={flags.svg}
            alt={name}
          />
        </Link>
      ) : (
        <LazyLoad>
          <Link to={`/${countryCode}`}>
            <img
              className={classes.Card__Flag}
              src={flags.svg}
              alt={name}
            />
          </Link>
        </LazyLoad>
      )}
      <div className={classes.Card__Info}>
        <h2 className={classes.Card__Name}>
          <Link to={`/${countryCode}`}>{name}</Link>
        </h2>
        <p className={classes.Card__Population}>
          <b>Population</b>: {formattedPopulation}
        </p>
        <p className={classes.Card__Region}>
          <b>Region</b>: {region}
        </p>
        <p className={classes.Card__Capital}>
          <b>Capital</b>:{" "}
          {!capital
            ? "N/A"
            : capital}
        </p>
      </div>
    </li>
  );
}
