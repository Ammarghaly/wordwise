import CityItem from "./CityItem";
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";

export default function CountryList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return <Message message="add your first city by clcking on the map" />;
  return (
    <ul className={styles.countryList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}
