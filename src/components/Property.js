import React from 'react';

const Property = (props) => {

  const name = props.property.name.split(" ")[1].toLowerCase()

  return (
    <div className=`prop-div-${name}` onClick={() => props.selectProperty(props.property)}>
      <span>{props.property.name}</span>
    </div>
  )
}

export default Property;
