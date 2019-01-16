import React from 'react';

const Property = (props) => {

  return (
    <div className="prop-div" onClick={() => props.selectProperty(props.property)}>
      <span>{props.property.name}</span>
    </div>
  )
}

export default Property;
