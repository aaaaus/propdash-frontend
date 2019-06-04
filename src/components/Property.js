import React from "react";

const Property = props => {
  const name = props.property.name.split(" ")[1].toLowerCase();

  return (
    <div
      className="prop-div"
      onClick={() => props.selectProperty(props.property)}
    >
      <div id={name} />
      <div>
        <span>{props.property.name}</span>
      </div>
    </div>
  );
};

export default Property;
