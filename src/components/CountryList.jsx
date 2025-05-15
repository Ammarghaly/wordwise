import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";

export default function CountryList() {


  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;
  if (!cities.length)
    return <Message message="add your first city by clcking on the map" />;
//   const countres = cities.reduce((arr, city) => {
//     if (!arr.map((el) => el.country).includes(city.country)) 
//       return [...arr, { country: city.country, emoji: city.emoji, }];
//      else{
//         return arr
//     }
//   },[]);

    const countres =[];
    const checkCountres = new Set();
    cities.forEach(ele => {
        if (!checkCountres.has(ele.country)) {
            checkCountres.add(ele.country);
            countres.push({ country: ele.country, emoji: ele.emoji });
        }
    });
    
  return (
    <ul className={styles.countryList}>
      {countres.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}
