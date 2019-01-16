import React from 'react';
import { connect } from 'react-redux';

import { fetchLeases } from '../actions';

class UnitDetail extends React.Component {

  componentDidMount() {
    this.props.fetchLeases();
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
      console.log(this.props.selectUnit.id)
      console.log(this.props.leases);

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
            <span>Lessees: {lease[0].residents[0].first_name} {lease[0].residents[0].last_name}</span><br />
            <span>Lease Term: </span><br />
            <span>Occupants: </span><br />
            <span>Rent: {lease[0].rent}</span><br />
            <span>Status: </span><br />
            <span>Balance: </span><br />
            <span>Floorplan: </span><br />
            <br />
            <span>Previous Lease</span><br />
            <span>Create New Lease</span><br />
        </div>
      )
    }

    // if (typeof this.props.selectUnit.leases[0] === undefined) {
    //   return <p>No active lease</p>
    // }
    //
    // return (
    //   <div>
    //       <h3>UnitDetail</h3>
    //
    //       <h4>Lease Info</h4>
    //         <span>Lessee: </span><br />
    //         <span>Lease Term: </span><br />
    //         <span>Occupants: </span><br />
    //         <span>Rent: {this.props.selectUnit.leases[0].rent ? this.props.selectUnit.leases[0].rent : null} </span><br />
    //         <span>Status: {this.props.selectUnit.leases[0].status ? this.props.selectUnit.leases[0].status : null} </span><br />
    //         <span>Balance: </span><br />
    //         <span>Floorplan: </span><br />
    //         <br />
    //         <span>Previous Lease</span><br />
    //         <span>Create New Lease</span><br />
    //     </div>
    //)
  } //renderContent

  render() {
    console.log("UnitDetail props are: ", this.props);
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
