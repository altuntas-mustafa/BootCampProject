import React, { useState, useEffect } from "react";
import "./App.css";
import Gallery from "./components/Gallery/Gallery";
import { Developer,Bootcamp, BootcampObject } from "./types";


const apiUrl = "http://localhost:3001";

function App() {
  const [selectedBootcamp, setSelectedBootcamp] = useState<string>("all");
  const [developerBootCamp, setDeveloperBootCamp] = useState<string>("jsfs");
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [bootcamps, setBootcamps] = useState<Bootcamp[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const fetchBootcamps = async () => {
    try {
      const response = await fetch(`${apiUrl}/bootcamps`);
      const data = await response.json();
      setBootcamps(data.bootcamps);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBootcamps();
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    
    const firstName = event.currentTarget["first-name"].value;
    const lastName = event.currentTarget["last-name"].value;
    if (!firstName || !lastName) {
      setTimeout(() => {
        setErrorMessage("First name is invalid");
      }, 1100);

      return;
    }
    const selectedBootcampId = bootcamps.find((item) => item.bootcamp === developerBootCamp)?.id;
    const newDeveloper: Developer = {
      name: `${firstName} ${lastName}`,
      bootcampId: selectedBootcampId!,
    };

    event.currentTarget["first-name"].value = "";
    event.currentTarget["last-name"].value = "";
    setDevelopers([newDeveloper]);
  };
  
  const getBootcampIds = (bootcamps: Bootcamp[], selectedBootcamp: string): BootcampObject[] => {
    if (selectedBootcamp === "all") {
      return bootcamps.map((data: Bootcamp) => ({id: data.id, bootcamp: data.bootcamp}));
    } else {
      const selected = bootcamps.find((bootcamp) => bootcamp.bootcamp === selectedBootcamp);
      return selected ? [{id: selected.id, bootcamp: selected.bootcamp}] : [];
    }
  };
  const bootcampIdsToShow = getBootcampIds(bootcamps, selectedBootcamp);
  
  const addNewDeveloper = async (developer: Developer) => {
    try {
      const response = await fetch(`${apiUrl}/developers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(developer),
      });
      const data = await response.json();
    } catch (error) {
      console.error(error);
    }
  };
  

  useEffect(() => {
    if (developers.length > 0) {
      addNewDeveloper(developers[0]);
    }
  }, [developers]);
  
  
  return (
    <>
      <main className="App">
        <form
          className="Form"
          action="get"
          onSubmit={handleSubmit}
          id="addDeveloperForm"
        >
          <h3 className="Form__Title">Add new developer</h3>
          <div className="errorMessage"> {errorMessage}</div>
          <hr className="Form__Separator" />
          <label htmlFor="first-name" className="Form__Label">
            First Name:
          </label>
          <br />
          <input
            type="text"
            id="first-name"
            name="first-name"
            placeholder="enter first name"
            required
            className="addDeveloperFirstNameInput"
          />
          <br />
          <label htmlFor="last-name" className="Form__Label">
            Last Name:
          </label>
          <br />
          <input
            type="text"
            id="last-name"
            name="last-name"
            placeholder="enter last name"
            required
            className="addDeveloperLastNameInput"
          />
          <br />
          <label
            htmlFor="select-bootcamp"
            className="Form__Label"
            id="addDeveloperBtn"
          >
            Select Bootcamp:
          </label>
          <br />
          <select
            name="select-bootcamp"
            id="select-bootcamp"
            className="Form__Select"
            onChange={(event) => setDeveloperBootCamp(event.target.value)}
          >
            <option value="jsfs">jsfs</option>
            <option value="dnfs">dnfs</option>
            <option value="jfs">jfs</option>
          </select>
          <br />
          <button
            id="btnAddCard"
            data-testid="btnAddCard"
            className="Form__Button"
          >
            Add Developer
          </button>
        </form>
        <label htmlFor="filter-bootcamp" className="filter__Label">
          Filter Bootcamp
        </label>
        <br />
        <select
          name="filter-bootcamp"
          id="filter-bootcamp"
          className="filter__Select"
          onChange={(event) => setSelectedBootcamp(event.target.value)}
        >
          <option value="all">all</option>
          <option value="jsfs">jsfs</option>
          <option value="dnfs">dnfs</option>
          <option value="jfs">jfs</option>
        </select>
      </main>
      <h1 className="gallery">Gallery</h1>
      <Gallery selectedBootcamp={bootcampIdsToShow}/>
    </>
  );
}

export default App;
