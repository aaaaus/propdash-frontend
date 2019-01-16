import React from 'react';
import { connect } from 'react-redux';

class Unit extends React.Component {

  detailRender(prop) {

    let lease = this.props.leases.filter(lease => lease.unit_id === this.props.unit.id && lease.status === "current")

    if (lease.length === 0) {
      lease = []
    }

      switch(prop) {
        case "status":
          return <span>{this.props.unit.status}</span>
        case "rent":
          return <span>{lease.length > 0 ? `$ ${lease[0].rent}` : "no data"}</span>
        case "vacant":
          return <span>days vacant</span>
        case "market":
          return <span>$ {this.props.unit.market_rent}</span>
        case "diff":
          return <span></span>
        case "lines":
          return <span>{this.props.unit.line}</span>
        default:
          return <span>{this.props.unit.status}</span>
      }
  }

  render() {
    // console.log("UNIT PROPS ARE", this.props);
    return (
      <div className="unit-div" onClick={() => this.props.selectUnit(this.props.unit)}>
      <span>{this.props.unit.number}</span>
      <br />
      {this.detailRender(this.props.dataSelection)}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    dataSelection: state.data,
    leases: state.lease.leases
  }
}

export default connect(mapStateToProps)(Unit);
