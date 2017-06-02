import React from 'react';

const Campus = (props) => {
  const imgSrc = `/images/${props.selectedCampus.name}.png`
  return (
    <div>
      <h3>{props.selectedCampus.name}</h3>
      <img className="thumbnail" src={imgSrc} />
    </div>
  );
}

export default Campus;
