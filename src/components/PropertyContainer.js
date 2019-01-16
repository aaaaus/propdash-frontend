import React from 'react';
import { connect } from 'react-redux';

import { fetchProperties, selectProperty } from '../actions';
import Property from './Property'

class PropertyContainer extends React.Component {

  componentDidMount() {
    this.props.fetchProperties();
  }

  render() {

      const properties = this.props.properties.map(property => {
        return <Property key={property.id} property={property} selectProperty={this.props.selectProperty} />
      })

      return (
        <div>
        <h3>PropertyContainer</h3>
        <h3>{properties}</h3>
        </div>
      )
  }

}

// const PropertyContainer = () => {
//   return (
//             <div>
//             <h3>PropertyContainer</h3>
//             </div>
//   )
// }

function mapStateToProps(state) {
  return {
    properties: state.property.properties,
    selectProperty: state.property.selectProperty
  }
}

export default connect(mapStateToProps, { fetchProperties, selectProperty })(PropertyContainer);
