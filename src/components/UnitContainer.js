import React from 'react';
import { connect } from 'react-redux';
import FlipMove from 'react-flip-move';

import './UnitContainer.css';

import { fetchUnits, fetchLeases, fetchResidents, selectUnit } from '../actions';
import Unit from './Unit';

class UnitContainer extends React.Component {

  state = {
    sortBy: 'end_date'
  }

  componentDidMount() {
    this.props.fetchUnits();
    this.props.fetchLeases();
    this.props.fetchResidents();
  }

  //the return here is passed into the final render call for this component
  renderUnits = () => {
    if (this.props.isLoaded && this.props.selectProperty && this.props.unitsLoaded) {
      const property = this.props.selectProperty
      const units = this.props.units.filter(unit => unit.property_id === property.id)

      const filteredUnits = this.filterUnits(this.filterByName(this.sortUnitsBy(units)))

      return (
        <FlipMove
          enterAnimation="fade"
          leaveAnimation="fade"
        >
        {filteredUnits.map(unit => <Unit key={unit.id} unit={unit} selectUnit={this.props.selectUnit} />)}
        </FlipMove>
      )
    } else {
      return <span>"Select a property..."</span>
    }

  }

  //returns filtered array of units based on three filters that can be turned on/off in state
  filterUnits = (unitArray) => {
    // debugger
    return unitArray.filter(unit => {
      const a = this.props.filterOccupied ? unit.status === "occupied" : '';
      const b = this.props.filterNotice ? unit.status === "notice" : '';
      const c = this.props.filterVacant ? unit.status === "vacant" : '';

      if (a + b + c !== '') {
        return a || b || c
      }
      else {
        return unitArray
      }
    })
  }

  filterByName = (unitArray) => { //in comes the array of units from the filterUnits function
    /////////////
    //CHANGE TO filterBy and add conditional for which type is active
    /////////////
    if (this.props.filterText.length > 0) {
      //we filter this array based on units that match unit ids
      return unitArray.filter(unit => {

        //create array of residents with matching criteria
        const residents = this.props.residents.filter(resident => {
          const fullName = `${resident.first_name} ${resident.last_name}`
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

  sortUnitsByNumber = (array) => {
    const num = array[0].number //test first element to see what type of array this is
    if (isNaN(parseFloat(num.charAt(num.length - 1)))) { //for apartments with "10A" format
      const sortedArray = array.sort(function (unit1, unit2) {
      //sort by leading number
    	if (parseInt(unit1.number.slice(0,-1)) > parseInt(unit2.number.slice(0,-1))) return 1;
    	if (parseInt(unit1.number.slice(0,-1)) < parseInt(unit2.number.slice(0,-1))) return -1;
      //subsort for trailing letter
    	if (unit1.number.slice(-1) > unit2.number.slice(-1)) return 1;
    	if (unit1.number.slice(-1) < unit2.number.slice(-1)) return -1;
      });
      return sortedArray
    }
    else { //for apartments with "901" format
      return array.sort((unit1, unit2) => parseFloat(unit1.number) - parseFloat(unit2.number))
    }
  }

  dateHelper = (unit) => {
    const datesArray = unit.leases.map(lease => {
        if (lease.status !== "future") { //do not include future leases
          return lease.end_date;
        }
    })
    return Math.max(...datesArray)
  }

  sortUnitsBy = (array) => {
    if (this.state.sortBy === 'number') { //sort by unit number
      const num = array[0].number //test first element to see what type of array this is
      if (isNaN(parseFloat(num.charAt(num.length - 1)))) { //for apartments with "10A" format
        const sortedArray = array.sort(function (unit1, unit2) {
        //sort by leading number
      	if (parseInt(unit1.number.slice(0,-1)) > parseInt(unit2.number.slice(0,-1))) return 1;
      	if (parseInt(unit1.number.slice(0,-1)) < parseInt(unit2.number.slice(0,-1))) return -1;
        //subsort for trailing letter
      	if (unit1.number.slice(-1) > unit2.number.slice(-1)) return 1;
      	if (unit1.number.slice(-1) < unit2.number.slice(-1)) return -1;
        });
        return sortedArray
      }
      else { //for apartments with "901" format
        return array.sort((unit1, unit2) => parseFloat(unit1.number) - parseFloat(unit2.number))
      }
    }
    else { //sort by end date
      return array.sort((unit1, unit2) => {
        const date1 = this.dateHelper(unit1);
        const date2 = this.dateHelper(unit2);

        return date1 - date2;
      });
    }
  }

  handleSortBy = (e) => {
    const action = e.target.id.split("-")[1]
    this.setState({
      sortBy: action
    })
  }

  render() {
    return(
      <div>
        <h3>UnitContainer</h3>
        <button id="sort-number" onClick={this.handleSortBy}>Sort By Unit</button>
        <button id="sort-end_date" onClick={this.handleSortBy}>Sort By Lease End Date</button>
        <br />
        <br />
        <div className="grid">

          {this.renderUnits()}

        </div>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    units: state.unit.units,
    unitsLoaded: state.unit.isLoaded,
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
