import { Search } from "lucide-react";
import React, { useEffect, useRef, useState, useCallback } from "react";

import axios from "axios";
import Spinner from "./Componants/Spinner";
const App = () => {
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [name, setname] = useState("");
  const [spinner, setSpinner] = useState(false);

  const inputRef = useRef(null);
  const rui = `https://restcountries.com/v3.1/name/${name}?fullText=true`;
  const getdata = async () => {
    try {
      const response = await axios.get(rui);
      console.log(response.data);
      setData(response.data);
      setSearchInput("");
      setSpinner(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = () => {
    setname(searchInput);
    setSpinner(true);
  };

  const handleKeyPress = useCallback(
    (event) => {
      if (event.key === "Enter") {
        handleSearch();
      }
    },
    [handleSearch]
  );

  useEffect(() => {
    getdata();
  }, [name]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.addEventListener("keypress", handleKeyPress);
    }

    return () => {
      if (inputRef.current) {
        inputRef.current.removeEventListener("keypress", handleKeyPress);
      }
    };
  }, [handleKeyPress]);

  useEffect(() => {
    // Hide spinner when input changes
    setSpinner(false);
  }, [searchInput]);

  return (
    <>
      <div className=" pt-8  py-3 bg-black flex justify-center">
        <div>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Enter country name"
            className="py-2 px-5 text-center font-semibold rounded-tr-none rounded-br-none rounded-bl-md rounded-tl-md outline-none"
            // Apply different border-radius values for each corner
            ref={inputRef}
          />
        </div>

        <div className="relative ">
          <Search className="text-black absolute left-1 top-2" />
          <button
            onClick={handleSearch}
            className="bg-blue-600 py-2 px-8 font-semibold rounded-tr-md rounded-br-md rounded-bl-none rounded-tl-none"
            // Apply different border-radius values for each corner
          >
            {spinner ? <Spinner className=" " /> : "Search"}
          </button>
        </div>
      </div>

      {data.map((items) => (
        <div key={items.area}>
          <div className="bg-black ">
            <main>
              <h3 className="bg-slate-950 text-center py-4 text-orange-400 text-2xl">
                Alternative Names of {name}
              </h3>
              <ol
                style={{ listStyle: "disc" }}
                className="mt- flex flex-col justify-center text-center"
              >
                {items.altSpellings.map((hello, index) => (
                  <li key={index} className=" text-white m-2">
                    {index + 1}. {hello}
                  </li>
                ))}
              </ol>
            </main>

            <main className="flex justify-center mt-4 flex-col text-center ">
              <h3 className="text-orange-400 text-4xl">Capital </h3>

              <p className="text-white">{items.capital}</p>
            </main>

            <main className="flex justify-center mt-4 flex-col text-center ">
              <h3 className="text-orange-400 text-4xl">Continent </h3>

              <p className="text-white">{items.continents}</p>
            </main>

            <main>
              <h3 className="bg-slate-950 text-center py-4 text-orange-400 text-2xl">
                TimeZone
              </h3>
              <ol
                style={{ listStyle: "disc" }}
                className="mt- flex flex-col justify-center text-center"
              >
                {items.timezones.map((hello, index) => (
                  <li key={index} className=" text-white m-2">
                    {index + 1}. {hello}
                  </li>
                ))}
              </ol>
            </main>

            <main className="flex flex-col text-center justify-center flex-wrap ">
              <h3 className="bg-slate-950  py-4 text-orange-400 text-2xln ">
                Flag
              </h3>

              <div>
                <img src={items.flags.png} alt="" className="  " />
              </div>
            </main>
            <main className="flex justify-center mt-4 flex-col text-center ">
              <h3 className="text-orange-400 text-4xl">Population </h3>

              <p className="text-white">{items.population}</p>
            </main>

            <main></main>

            <h3 className="text-orange-400 text-4xl text-center mt-4 mb-4 bg-slate-950 py-2">
              Neighbour{" "}
            </h3>

            <main className="flex  justify-center flex-wrap ">
              <ul className="bg-black">
                {items.borders.map((country, index) => (
                  <li className="bg-black text-white" key={index}>
                    Neigherour Country: "{country}"
                  </li>
                ))}
              </ul>
            </main>

            <main className="flex justify-center mt-4 flex-col text-center">
              <h3 className="text-orange-400 text-4xl">Currencies</h3>
              {items.currencies ? (
                <ul>
                  {Object.entries(items.currencies).map(
                    ([currencyCode, currencyInfo], index) => (
                      <li key={index} className="text-white">
                        <strong>{currencyCode}:</strong> {currencyInfo.name},
                        Symbol: {currencyInfo.symbol}
                      </li>
                    )
                  )}
                </ul>
              ) : (
                <p>No currency information available</p>
              )}
            </main>
          </div>
        </div>
      ))}
    </>
  );
};

export default App;
