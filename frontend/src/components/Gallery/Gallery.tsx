import React, { useState, useEffect } from "react";
import Bootcamps from '../BootcampCard/Bootcamps'
import {GalleryProps, Instructor, Developers, filteredData, Developer} from '../../types'
import './gallery.css';
const apiUrl = "http://localhost:3001";

const Gallery = ({ selectedBootcamp }: GalleryProps) => {
  const [developersInfo, setDevelopersInfo] = useState<Developers[]>([]);
  const [instructorsInfo, setInstructorsInfo] = useState<Instructor[]>([])


  const fetchData = async () => {
    try {
      const [instructorsResponse, developersResponse] = await Promise.all([
        fetch(`${apiUrl}/instructors`),
        fetch(`${apiUrl}/developers`)
      ]);
      const [instructorsData, developersData] = await Promise.all([
        instructorsResponse.json(),
        developersResponse.json()
      ]);
      setInstructorsInfo(instructorsData.instructors);
      setDevelopersInfo(developersData.developers);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredData: filteredData[] = selectedBootcamp.map((bootcamp) => {
    const filteredInstructors = instructorsInfo.filter(
      (instructor) => instructor.bootcampId === bootcamp.id
    );
    const filteredDevelopers = developersInfo.filter(
      (developer) => developer.bootcampId === bootcamp.id
    );
    return { bootcamp: bootcamp.bootcamp, filteredInstructors, filteredDevelopers };
  });

  useEffect(() => {
    fetchData();
  }, [developersInfo]);
  return (
    <>
      <div className="cardContainer">
        {filteredData.map((data, index) => (
          <Bootcamps key={index} bootcampData={data}  />
        ))}
      </div>
    </>
  );
};

export default Gallery;
