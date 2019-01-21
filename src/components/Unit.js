import React from 'react';
import { connect } from 'react-redux';

class Unit extends React.Component {
  //props inherited from UnitContainer: unit, selectUnit

  classNameGenerator = () => {
    const status = this.props.unit.status
    return `unit-div ${status}`
  }

  detailRender(dataSelection) {

    //unit is inherited from UnitContainer, but lease info must be pulled from global state
    //here, we only show matching leases that are of "current" status (which there should only be one)
    const currentLeases = this.props.leases.filter(lease => lease.unit_id === this.props.unit.id && lease.status === "current")
    const lease = currentLeases[0]
    const unit = this.props.unit

    //display will change depending on global state change of state.data
    switch(dataSelection) {
      case "status":
        return <span>{unit.status}</span>
      case "rent":
        return <span>{currentLeases.length > 0 ? `$ ${lease.rent}` : "no data"}</span>
      case "ppsf":
        return <span>{currentLeases.length > 0 ? `$ ${parseInt((lease.rent * 12) / unit.square_footage)} /sq ft` : "no data"}</span>
      case "vacant":
        return <span>days vacant</span>
        // here we will have to determine the most recent "past" lease, and find the difference between the end date and the current date - will possibly cut
      case "market":
        return <span>$ {unit.market_rent}</span>
      case "diff":
        return <span>{currentLeases.length > 0 ? `${(((lease.rent - unit.market_rent)/unit.market_rent) * 100).toFixed(2)} %` : "no data"}</span>
      case "lines":
        return <span>{unit.line}</span>
      default:
        return <span>{unit.status}</span>
    }

  }

  render() {
    return (
      <div className={this.classNameGenerator()} onClick={() => this.props.selectUnit(this.props.unit)}>
      <span>{this.props.unit.number}</span>
      <br />
      <span>{this.detailRender(this.props.dataSelection)}</span>
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
