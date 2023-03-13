import React, { useEffect } from "react";
import Person from "../Person/Person";
import { BootcampCardProps, filteredData } from "../../types";
import "./bootcamp.css";


function Bootcamps(props: BootcampCardProps) {
  const { filteredInstructors, filteredDevelopers, bootcamp} = props.bootcampData;
  return (
    <>
      <div className="card-container bootcamp">
        <div className="selectBootcamp">
        <h1>{bootcamp}</h1>
        <div className="cardList">
        <h1>Instructor</h1>
        {filteredInstructors.map((item, index) => {
          return <Person name={item.name} id={item.id} key= {index}/>;
        })}
        </div>
        <div className="cardList">
        <h1>Developer</h1>
        {filteredDevelopers.map((item, index) => {
          return <Person name={item.name} id={item.id}  key= {index}/>;
        })}
        </div>
        </div>
      </div>
    </>
  );
}

export default Bootcamps;
