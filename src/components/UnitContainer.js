import React from 'react';
import { connect } from 'react-redux';

import { fetchUnits, selectUnit } from '../actions';
import Unit from './Unit';

class UnitContainer extends React.Component {

  componentDidMount() {
    this.props.fetchUnits();
  }

  renderUnits = () => {
    if (this.props.isLoaded && this.props.selectProperty) {
      const property = this.props.selectProperty
      return property.units.map(unit => <Unit key={unit.id} unit={unit} selectUnit={this.props.selectUnit} />)
    } else {
      return <span>"Select a property..."</span>
    }
    // if (this.props.isLoaded) {
    //   // return this.props.units.map(unit => `${unit.number}, `)
    //   return this.props.units.map(unit => <Unit key={unit.id} unit={unit} selectUnit={this.props.selectUnit} />)
    //   // return this.props.units.map(unit => <button key={unit.id} onClick={() => this.props.selectUnit(unit)}>{unit.number}</button>)
    // }
    // else
    //   return "LOADING UNITS..."
  }

  filterUnits = () => {
    if (false) { //filter ON

    }
    else {

    }
  }

  render() {
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
    // units: state.unit.units,
    // isLoaded: state.unit.isLoaded
    isLoaded: state.property.isLoaded,
    selectProperty: state.property.selectProperty
  }
}

export default connect(mapStateToProps, { fetchUnits: fetchUnits, selectUnit: selectUnit })(UnitContainer);


// filterPuppies = () => {
//   const pups = this.state.puppies.filter(p => {
//     return p.name.toLowerCase().includes(this.state.filterText) || p.breed.toLowerCase().includes(this.state.filterText)
//   })
//   if (this.state.goodBoiFilter) {
//     return this.goodBoiFilter(pups)
//   } else {
//     return pups
//   }
// }
