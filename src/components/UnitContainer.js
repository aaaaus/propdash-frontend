import React from 'react';
import { connect } from 'react-redux';

import { fetchUnits } from '../actions';
import Unit from './Unit';

class UnitContainer extends React.Component {

  componentDidMount() {
    this.props.fetchUnits();
  }

  renderUnits = () => {
    if (this.props.isLoaded) {
      // return this.props.units.map(unit => `${unit.number}, `)
      return this.props.units.map(unit => <Unit unit={unit} />)
    }
    else
      return "NOT READY"
  }

  render() {
    console.log("UnitContainer props:", this.props);
    return(
      <div>
        <h3>UnitContainer</h3>
        <p>{this.renderUnits()}</p>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    units: state.unit.units,
    isLoaded: state.unit.isLoaded
  }
}

export default connect(mapStateToProps, { fetchUnits: fetchUnits })(UnitContainer);
