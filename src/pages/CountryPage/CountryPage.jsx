import { useParams } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import MainLayout from "../../Layouts/MainLayout";
import BackButton from "../../components/BackButton/BackButton";
import classes from "./CountryPage.module.css";
import axios from "axios";
import LoadingGrid from "../../components/LoadingGrid/LoadingGrid";

export default function CountryPage() {
  const { code } = useParams();

  const [country, setCountry] = useState(null);

  useEffect(() => {
    const storedCountries = JSON.parse(
      localStorage.getItem("countries")
    );

    if (storedCountries?.length) {
      const targetCountry = storedCountries.find(
  (country) =>
    (country.alpha3Code || country.cioc)?.toLowerCase() ===
    code.toLowerCase()
);

      if (targetCountry) {
        const borderCountries =
  targetCountry.borders?.map((borderCode) => {
    const borderCountry = storedCountries.find(
      (country) => country.alpha3Code === borderCode
    );

    return borderCountry ? borderCountry.name : borderCode;
  }) || [];

        setCountry({
          ...targetCountry,
          borders: borderCountries,
        });
      }

      return;
    }

    const fetchCountryData = async () => {
      try {
        const response = await axios.get(
          `https://countries.dev/alpha/${code}`
        );

        const fetchedCountry = response.data;

        setCountry(fetchedCountry);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCountryData();
  }, [code]);

  const currencies = useMemo(() => {
    if (!country?.currencies) return "";

    return country.currencies
      .map((currency) => currency.name)
      .join(", ");
  }, [country]);

  const languages = useMemo(() => {
    if (!country?.languages) return "";

    return country.languages
      .map((language) => language.name)
      .join(", ");
  }, [country]);

  return (
    <MainLayout>
      <BackButton />

      {country ? (
        <section className={classes.CountryDescription}>
          <img
            src={country.flags.svg}
            alt={country.name}
            className={classes.CountryDescription__Flag}
          />

          <div className={classes.CountryDescription__Info}>
            <h2 className={classes.CountryDescription__Name}>
              {country.name}
            </h2>

            <ul className={classes.CountryDescription__List}>
              <li className={classes.CountryDescription__NativeName}>
                <b>Native Name</b>: {country.nativeName || "N/A"}
              </li>

              <li className={classes.CountryDescription__Population}>
                <b>Population</b>:{" "}
                {country.population.toLocaleString("uk-UA")}
              </li>

              <li className={classes.CountryDescription__Region}>
                <b>Region</b>: {country.region}
              </li>

              <li className={classes.CountryDescription__SubRegion}>
                <b>Sub Region</b>: {country.subregion}
              </li>

              <li className={classes.CountryDescription__Capital}>
                <b>Capital</b>: {country.capital || "N/A"}
              </li>

              <li className={classes.CountryDescription__Domain}>
                <b>Top Level Domain</b>:{" "}
                {country.topLevelDomain?.join(", ") || "N/A"}
              </li>

              <li className={classes.CountryDescription__Currencies}>
                <b>Currencies</b>: {currencies || "N/A"}
              </li>

              <li className={classes.CountryDescription__Langs}>
                <b>Languages</b>: {languages || "N/A"}
              </li>
            </ul>

            <ul className={classes.CountryDescription__BorderCountriesList}>
              <b>Border Countries</b>:{" "}
              {!country.borders?.length
  ? "N/A"
  : country.borders.join(", ")}
            </ul>
          </div>
        </section>
      ) : (
        <LoadingGrid />
      )}
    </MainLayout>
  );
}