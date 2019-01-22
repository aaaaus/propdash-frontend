import React from 'react';
import { connect } from 'react-redux';

import { fetchUnits, fetchLeases, createLease, updateUnit, moveInOut } from '../actions';
import LeaseInfo from './LeaseInfo.js'

class UnitDetail extends React.Component {

  state = {
    lessees: [],
    newStartDate: '',
    newEndDate: '',
    rent: '',
    leaseType: 'current'
  }

  //lease type tabs
  handleLeaseTypeChange = (e) => {
    const target = e.target.id.split("-")
    //leaseType-current
    return this.setState({ [target[0]]: target[1] })
  }

  //create form handlers
  handleDateChange = (e) => {
    console.log(e.target.value);
    const date = new Date(e.target.value);
    const epoch = date.getTime();
    const unix_time = epoch/1000;
    console.log(unix_time);
    return this.setState({ [e.target.name]: unix_time });
  }

  handleChange = (e) => {
    console.log(this.state);
    return this.setState({ [e.target.name]: e.target.value })
  }

  //refactor later to do it the 'React' way
  handleCreateNewLease = (e) => {
    e.preventDefault()

    const nUnit = this.props.selectUnit.id
    const nStart = this.state.newStartDate
    const nEnd = this.state.newEndDate
    const nRent = this.state.rent
    const nBalance = 0
    const nStatus = "future"

    if (nStart && nEnd && nRent) {
        const nBody = {lease: {unit_id: nUnit, start_date: nStart, end_date: nEnd, rent: nRent, account_balance: nBalance, status: nStatus }}
        fetch('http://localhost:4000/api/v1/leases', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(nBody)
        })
        .then(resp => resp.json())
        .then(res => {
          this.props.createLease(res); //sends to createLease action creators
          // this.props.fetchLeases();
        })
    }
  }

  handleMoveIn = (e) => {
    e.preventDefault()

    const unit = this.props.selectUnit
    const lease = this.props.leases.filter(lease => lease.unit_id === this.props.selectUnit.id && lease.status === "future")[0]

    //send to redux
    this.props.moveInOut(unit.id, "occupied", lease.id, "current")

    this.setState({
      leaseType: 'current'
    })
  }

  handleMoveOut = (e) => {
    e.preventDefault()

    const unit = this.props.selectUnit
    const lease = this.props.leases.filter(lease => lease.unit_id === this.props.selectUnit.id && lease.status === "current")[0]

    // console.log(unit, lease);

    this.props.moveInOut(unit.id, "vacant", lease.id, "past")

    this.setState({
      leaseType: 'past'
    })
  }

  handleToggleNotice = (e) => {

    const unit = this.props.selectUnit
    const id = unit.id
    const lease = this.props.leases.filter(lease => lease.unit_id === this.props.selectUnit.id && lease.status === "current")[0]

    if (unit.status === "occupied") {
      //send to redux
      this.props.updateUnit(id, "notice")
    } else {
      //send to redux
      this.props.updateUnit(id, "occupied")
    }
  }

  leaseInfoRender() {
    return (
      <LeaseInfo
        type={this.state.leaseType}
        unit={this.props.selectUnit}
        leases={this.props.leases}
        handleMoveOut={this.handleMoveOut}
        handleMoveIn={this.handleMoveIn}
        handleToggleNotice={this.handleToggleNotice}
        handleCreateNewLease={this.handleCreateNewLease}
        handleDateChange={this.handleDateChange}
        handleChange={this.handleChange}
        rent={this.state.rent}
      />
    )
  }

  renderContent() {

    console.log("LEASE TYPE IS: ", this.state.leaseType);

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
      const currentLease = this.props.leases.filter(lease => lease.unit_id === this.props.selectUnit.id && lease.status === "current")[0]
      const futureLease = this.props.leases.filter(lease => lease.unit_id === this.props.selectUnit.id && lease.status === "future")[0]
      const pastLeases = this.props.leases.filter(lease => lease.unit_id === this.props.selectUnit.id && lease.status === "past")

      // if (!currentLease) {
      if (currentLease === 100) {
        // console.log("UNIT DETAIL STATE IS: ", this.state);
        return (
          <div>
            <h3>UnitDetail</h3>
            <p><em>No active lease for this unit</em></p>
            <button>Create New Future Lease</button>
            <br /><br />
            <form onSubmit={this.handleCreateNewLease}>
              <label htmlFor="start-date">Start date </label>
              <input type="date" name="newStartDate" id="start-date" onChange={this.handleDateChange} /><br />
              <label htmlFor="end-date">End date </label>
              <input type="date" name="newEndDate" id="end-date" onChange={this.handleDateChange} /><br />
              <label htmlFor="end-date">Rent </label>
              <input name="rent" placeholder="Rent" onChange={this.handleChange} value={this.state.rent}></input><br />
              <button type="submit">Create New Future Lease</button>
            </form>
          </div>


        )
      }


      return (
        <div>
          <h3>UnitDetail</h3>

          <h2>Apartment {this.props.selectUnit.number}</h2>
          <h4>{this.props.selectUnit.status}</h4>

          <div id="lease-info-container">
            <div onClick={this.handleLeaseTypeChange} className="detail-lease-button" id="leaseType-past">Past Leases</div>
            <div onClick={this.handleLeaseTypeChange} className="detail-lease-button" id="leaseType-current">Current Lease</div>
            <div onClick={this.handleLeaseTypeChange} className="detail-lease-button" id="leaseType-future">Future Lease</div>

            {this.leaseInfoRender()}
          </div>

          <h4>Unit Info</h4>
          <span>Amenities: </span><br />
          <span><a href='/api/v1/print/example.pdf' target='_blank'>Floorplan (PDF)</a></span><br />
          <br />
        </div>
      ) //return

    } //else

  } //renderContent

  render() {
    console.log('%c UnitDetail Render', 'color: red')
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

export default connect(mapStateToProps, { fetchUnits, fetchLeases, createLease, updateUnit, moveInOut })(UnitDetail);
