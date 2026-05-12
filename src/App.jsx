import "./App.css";
import { useState } from "react";
import axios from "axios";
import WorldMap from "../src/assets/world_map.png";

import { colorMatch } from "../src/helpers/colorMatch";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchedCountry, setSearchedCountry] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const url =
    "https://restcountries.com/v3.1/all?fields=name,flags,population,continents";

  async function fetchData(url) {
    const button = document.querySelector(".load-button");
    try {
      const result = await axios.get(url);
      button.classList.add("hidden");
      result.data.sort((populationA, populationB) => {
        return populationA.population - populationB.population;
      });
      setCountries(result.data);
      console.log(result.data);
    } catch (e) {
      console.error(e);
    }
  }

  async function searchCountry(e, searchTerm) {
    e.preventDefault();
    console.log(searchTerm);
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    try {
      const result = await axios.get(
        `https://restcountries.com/v3.1/name/${lowerCaseSearchTerm}`,
      );
      setSearchedCountry(result.data);
      setSearchTerm("");
      console.log(result.data);
      setError("");
    } catch (e) {
      console.error(e);
      setError(`${searchTerm} bestaat niet, probeer het opnieuw!`);
    }
  }

  return (
    <>
      <header>
        <img src={WorldMap} alt="World map" />
        <h1>World map</h1>
      </header>
      <main>
        <section className="load-section">
          <button className="load-button" onClick={() => fetchData(url)}>
            Laad alle info
          </button>
          <ul className="landen">
            {countries.map((item) => (
              <li key={item.name.common} className="land">
                <img src={item.flags.svg} alt="flag" />
                <div>
                  <span className={colorMatch(item)}>{item.name.common}</span>
                  <span>Has a population of {item.population} people</span>
                </div>
              </li>
            ))}
          </ul>
        </section>
        <section className="search-section">
          <h2>Search Country Information</h2>
          <form>
            <input
              type="text"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
            <button
              type="submit"
              onClick={(e) => {
                searchCountry(e, searchTerm);
              }}
            >
              Search
            </button>
          </form>
          {error && <p className="error">{error}</p>}
          <div className="detailLand">
            {searchedCountry.length > 0 && (
              <div>
                <div className="detailLand-header">
                  <img src={searchedCountry[0].flags.svg} alt="flag" />
                  <h3>{searchedCountry[0].name.common}</h3>
                </div>
                <p>
                  {searchedCountry[0].name.common} is situated in{" "}
                  {searchedCountry[0].subregion} and the capital is{" "}
                  {searchedCountry[0].capital} <br /> <br />
                  It has a population of{" "}
                  {(searchedCountry[0].population / 1000000).toFixed(1)} million
                  people and it borders with{" "}
                  {searchedCountry[0].borders
                    ? searchedCountry[0].borders.length
                    : "0"}
                  neighboring countries.
                  <br /> <br />
                  Websites can be found on {searchedCountry[0].tld} domain's.
                </p>
                <p>Continent: {searchedCountry[0].continents}</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
