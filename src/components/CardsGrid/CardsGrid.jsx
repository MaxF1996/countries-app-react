import classes from "./CardsGrid.module.css";
import Card from "../Card/Card";
import LoadingGrid from "../LoadingGrid/LoadingGrid";

export default function CardsGrid({ data, renderReason }) {
  return (
    <section className={classes.CardsGrid}>
      <ul className={classes.CardsGrid__List}>
        {data.length > 0 ? (
          data.map((card) => (
            <Card key={card.flag} data={card} renderReason={renderReason} />
          ))
        ) : renderReason === "pageloading" ? (
          <LoadingGrid />
        ) : (
          "No results"
        )}
      </ul>
    </section>
  );
}
