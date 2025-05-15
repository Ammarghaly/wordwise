import {
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";

const citiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity:action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((City) => City.id !== action.payload),
        currentCity: action.payload,
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      throw new Error("Unknown action Type");
  }
}

const BASE_URL = `http://localhost:1111`;
function CitiesProvider({ children }) {
  const [{ currentCity, isLoading, cities, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function fetchCity() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: 'cities/loaded', payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "Error loading cities list. Check console.",
        });
      }
    }
    fetchCity();
  }, []);

  async function getCity(id) {
    if (Number(id) === currentCity.id) return 
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        error: "There was an error loding data...",
      });
    }
  }

  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "city/created" , payload: data });
    } catch {
      dispatch({
        type: "rejected",
        error: "There was an error creating city...",
      });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        error: "There was an error deleting city...",
      });
    }
  }

  return (
    <citiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </citiesContext.Provider>
  );
}
function useCities() {
  const x = useContext(citiesContext);
  if (x === undefined)
    throw new Error("citiesContext was used outside of the CitiesProvider");
  return x;
}

export { CitiesProvider, useCities };
