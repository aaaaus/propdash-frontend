import React from 'react';
import { connect } from 'react-redux';

import { fetchLeases } from '../actions';

class UnitDetail extends React.Component {

  componentDidMount() {
    this.props.fetchLeases();
  }

  nameMerge(resident) {
    const first = resident.first_name
    const last = resident.last_name
    return `${first} ${last}`
  }

  multiRes(array) {
    return array.map(resident => this.nameMerge(resident)).join(', ')
  }

  renderContent() {

    if (!this.props.selectUnit) {
      return (
        <div>
          <h3>UnitDetail</h3>
          <p>Please select a unit</p>
        </div>
      )
    }

    else {
      // console.log(this.props.selectUnit.id)
      // console.log(this.props.leases);

      const unit = this.props.selectUnit
      const lease = this.props.leases.filter(lease => lease.unit_id === this.props.selectUnit.id && lease.status === "current")
      // debugger

      console.log("YOUR LEASE IS:", lease[0]);

      if (lease.length === 0) {
        return (
          <div>
            <h3>UnitDetail</h3>
            <p><em>No active lease for this unit</em></p>
            <button>Create New Lease</button>
          </div>
        )
      }

      return (
        <div>
          <h3>UnitDetail</h3>
          <h4>Lease Info</h4>
            <span>Lessees: {this.multiRes(lease[0].residents)} </span><br />
            <span>Lease Term: {new Date(lease[0].start_date * 1000).toLocaleDateString()} - {new Date(lease[0].end_date * 1000).toLocaleDateString()}</span><br />
            <span>Occupants: </span><br />
            <span>Rent: {lease[0].rent}</span><br />
            <span>Status: </span><br />
            <span>Balance: </span><br />
            <span>Floorplan: </span><br />
            <br />
            <span>Previous Lease</span><br />
            <span>Create New Lease</span><br />
        </div>
      ) //return
    } //else
  } //renderContent

  render() {
    return (
      this.renderContent()
    )
  } //render

} //class

function mapStateToProps(state) {
  return {
    selectUnit: state.unit.selectUnit,
    isLoaded: state.unit.isLoaded,
    leases: state.lease.leases
  }
}

export default connect(mapStateToProps, { fetchLeases })(UnitDetail);
