import React from "react";
import { connect } from "react-redux";

import { fetchProperties, selectProperty } from "../../../actions";
import Property from "./Property";

class PropertyContainer extends React.Component {
  componentDidMount() {
    this.props.fetchProperties();
  }

  render() {
    const properties = this.props.properties.map(property => {
      return (
        <Property
          key={property.id}
          property={property}
          selectProperty={this.props.selectProperty}
        />
      );
    });

    return (
      <div id="property-container">
        <span>Properties</span>
        <br />
        {properties}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    properties: state.property.properties,
    selectProperty: state.property.selectProperty
  };
}

export default connect(
  mapStateToProps,
  { fetchProperties, selectProperty }
)(PropertyContainer);
