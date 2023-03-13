export type Developer = {
  name: string;
  bootcampId: string;
};

export type Bootcamp = {
  id: string;
  bootcamp: string;
  bootcamps: [];
}

export type GalleryProps = {
  selectedBootcamp: BootcampObject[];

};
export type BootcampCardProps =  {
  bootcampData: filteredData; 
}
export type PersonProps =  {
  data: filteredData; 
}
export type filteredData = {
  filteredInstructors: Instructor[];
  filteredDevelopers: Developers[];
  bootcamp: string;
}

export type Instructor = {
  instructors: []
  name: string;
  id: string;
  bootcampId: string;
};
export type Developers = {
  developers: []
  id: string;
  name: string;
  bootcampId: string;
};

export type BootcampObject = {
  [key: string]: string;
}
