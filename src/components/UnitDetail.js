import React from 'react';
import { connect } from 'react-redux';

class UnitDetail extends React.Component {

  renderContent() {

    if (!this.props.selectUnit) {
      return <p>Please select a unit</p>;
    }

    if (typeof this.props.selectUnit.leases[0] === undefined) {
      return <p>No active lease</p>
    }

    // const unit = this.props.selectUnit.leases[0]

    return (
      <div>
          <h3>UnitDetail</h3>

          <h4>Lease Info</h4>
            <span>Lessee: </span><br />
            <span>Lease Term: </span><br />
            <span>Occupants: </span><br />
            <span>Rent: {this.props.selectUnit.leases[0].rent ? this.props.selectUnit.leases[0].rent : null} </span><br />
            <span>Status: {this.props.selectUnit.leases[0].status ? this.props.selectUnit.leases[0].status : null} </span><br />
            <span>Balance: </span><br />
            <span>Floorplan: </span><br />
            <br />
            <span>Previous Lease</span><br />
            <span>Create New Lease</span><br />
        </div>
    )
  }

  render() {
    console.log("UnitDetail props are: ", this.props);
    return (
      this.renderContent()
    )
  }
}

function mapStateToProps(state) {
  return {
    selectUnit: state.unit.selectUnit,
    isLoaded: state.unit.isLoaded
  }
}

export default connect(mapStateToProps)(UnitDetail);
