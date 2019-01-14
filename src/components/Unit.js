import React from 'react';

const Unit = (props) => {

  return (
    <div className="unit-div">
      <span>{props.unit.number}</span>
      <br />
      <span>{props.unit.layout_type}</span>
    </div>
  )
}

export default Unit;
