import React from 'react';
import { connect } from 'react-redux';

import { fetchUnits, fetchLeases, fetchResidents, selectUnit } from '../actions';
import Unit from './Unit';

class UnitContainer extends React.Component {

  componentDidMount() {
    this.props.fetchUnits();
    this.props.fetchLeases();
    this.props.fetchResidents();
  }

  //the return here is passed into the final render call for this component
  renderUnits = () => {
    if (this.props.isLoaded && this.props.selectProperty) {
      const property = this.props.selectProperty
      const filteredUnits = this.filterUnits(this.filterByName(property.units))

      return filteredUnits.map(unit => <Unit key={unit.id} unit={unit} selectUnit={this.props.selectUnit} />)
    } else {
      return <span>"Select a property..."</span>
    }

  }

  //returns filtered array of units based on three filters that can be turned on/off in state
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

  filterByName = (unitArray) => { //in comes the array of units from the filterUnits function
    // debugger
    if (this.props.filterText.length > 0) {
      //we filter this array based on units that match unit ids
      return unitArray.filter(unit => {

        //create array of residents with matching criteria
        const residents = this.props.residents.filter(resident => {
          const fullName = `${resident.first_name}` + " " + `${resident.last_name}`
          return fullName.toLowerCase().includes(this.props.filterText.toLowerCase())
        })

        //creates an array of current lease IDs for which there are matching residents
        const leaseIds = residents.map(resident => {
          const lease = resident.leases.find(lease => lease.status === "current")
          return lease.id
        })
        //=> [9, 10]

        let leases = []

        //creates an array of leases based on the leaseIDs found in previous
        leaseIds.forEach(id => {
          const lease = this.props.leases.find(lease => lease.id === id )
          leases.push(lease)
        })

        //calling leases
        //=> [{…}, {…}]

        //maps an array of unit IDs from the leases
        const unitIds = leases.map(lease => lease.unit.id)

        //=> [532, 533]

        return unitIds.includes(unit.id)

      })

    } // if
    return unitArray
  } //filterByName


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
    selectProperty: state.property.selectProperty,

    leases: state.lease.leases,
    residents: state.resident.residents,

    filterOccupied: state.filter.filterOccupied,
    filterNotice: state.filter.filterNotice,
    filterVacant: state.filter.filterVacant,
    filterText: state.filter.filterText
  }
}

export default connect(mapStateToProps, { fetchUnits, fetchLeases, fetchResidents, selectUnit })(UnitContainer);


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
