import { type } from 'os';
import React, { useState } from 'react'
import { PersonProps } from '../../types'

type Props =  {
  name: string
  id: string
}
const Person = (props : Props) => {
  const [showButton, setShowButton] = useState(false);

  const handleClick = () => {
    setShowButton(!showButton);
  };

  const handleDelete = () => {
    fetch(`http://localhost:3001/developers/${props.id}`, { method: 'DELETE' })
      .then(() => {
        setShowButton(false);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h4 onClick={handleClick} className='card'>{props.name}</h4>
      {showButton && <button onClick={handleDelete} className="button-developer deleteBtn"><span className="toggled">Delete</span></button>}
    </div>
  );
};

export default Person

