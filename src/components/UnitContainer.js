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
      const filteredUnits = this.filterUnits(property.units)
      
      return filteredUnits.map(unit => <Unit key={unit.id} unit={unit} selectUnit={this.props.selectUnit} />)
    } else {
      return <span>"Select a property..."</span>
    }

  }

  filterUnits = (unitArray) => {
    return unitArray.filter(unit => {
      const a = this.props.filterOccupied ? unit.status === "occupied" : '';
      const b = this.props.filterNotice ? unit.status === "notice" : '';
      const c = this.props.filterVacant ? unit.status === "vacant" : '';

      if (a + b + c != '') {
        return a || b || c
      }
      else {
        return unitArray
      }
    })
  }



  renderBud = () => {
    const a = this.props.filterOccupied ? "bud" : '';
    const b = this.props.filterNotice ? "weis" : '';
    const c = this.props.filterVacant ? "er" : '';

    return a + b + c
  }

  render() {
    return(
      <div>
        <h3>UnitContainer</h3>
        {this.renderBud()}<br />
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
    selectProperty: state.property.selectProperty,
    filterOccupied: state.filter.filterOccupied,
    filterNotice: state.filter.filterNotice,
    filterVacant: state.filter.filterVacant
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

// const teams = [
// 	{name:'Ravens', city:'Baltimore'},
// 	{name:'Browns', city:'Cleveland'},
// 	{name:'Colts', city:'Indianapolis'},
// 	{name:'Giants', city:'New York'},
// 	{name:'Dolphins', city:'Miami'}
// ]
//
// teams.filter(team => {
//   const a = true ? team.name.startsWith('R') : null;
//   const b = false ? team.name.startsWith('B') : null;
//   const c = true ? team.name.startsWith('G') : null;
//
//   return a || b || c
// })
