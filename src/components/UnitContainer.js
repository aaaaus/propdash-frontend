import React from 'react';
import { connect } from 'react-redux';

import { fetchUnits, selectUnit } from '../actions';
import Unit from './Unit';

class UnitContainer extends React.Component {

  componentDidMount() {
    this.props.fetchUnits();
  }

  renderUnits = () => {
    if (this.props.isLoaded) {
      // return this.props.units.map(unit => `${unit.number}, `)
      return this.props.units.map(unit => <Unit key={unit.id} unit={unit} selectUnit={this.props.selectUnit} />)
      // return this.props.units.map(unit => <button key={unit.id} onClick={() => this.props.selectUnit(unit)}>{unit.number}</button>)
    }
    else
      return "LOADING UNITS..."
  }

  render() {
    console.log("UnitContainer props:", this.props);
    return(
      <div>
        <h3>UnitContainer</h3>
        {this.renderUnits()}
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

export default connect(mapStateToProps, { fetchUnits: fetchUnits, selectUnit: selectUnit })(UnitContainer);
