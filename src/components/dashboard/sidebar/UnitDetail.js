import React from "react";
import { connect } from "react-redux";

import {
  fetchUnits,
  fetchLeases,
  createLease,
  updateUnit,
  moveInOut
} from "../../../actions";
import LeaseInfo from "./LeaseInfo.js";

//UnitDetail handles rendering the Unit's information (leases, residents) on the right sidebar

class UnitDetail extends React.Component {
  state = {
    tenant1id: "",
    tenant2id: "",
    newStartDate: "",
    newEndDate: "",
    rent: "",
    leaseType: "current"
  };

  //lease type tabs
  handleLeaseTypeChange = e => {
    const target = e.target.id.split("-");
    //leaseType-current
    return this.setState({ [target[0]]: target[1] });
  };

  //create form handlers
  handleDateChange = e => {
    console.log(e.target.value);
    const date = new Date(e.target.value);
    const epoch = date.getTime();
    const unix_time = epoch / 1000;
    console.log(unix_time);
    return this.setState({ [e.target.name]: unix_time });
  };

  handleChange = e => {
    console.log(this.state);
    return this.setState({ [e.target.name]: e.target.value });
  };

  handleTenant1Change = e => {
    return this.setState({ tenant1id: e.value });
  };

  handleTenant2Change = e => {
    console.log(this.state);
    return this.setState({ tenant2id: e.value });
  };

  handleCreateNewLease = e => {
    e.preventDefault();

    const nUnit = this.props.selectUnit.id;
    const nStart = this.state.newStartDate;
    const nEnd = this.state.newEndDate;
    const nRent = this.state.rent;
    const nBalance = 0;
    const nStatus = "future";

    if (nStart && nEnd && nRent) {
      const nBody = {
        lease: {
          unit_id: nUnit,
          start_date: nStart,
          end_date: nEnd,
          rent: nRent,
          account_balance: nBalance,
          status: nStatus
        }
      };
      //const joinBody = {resLease: {resident_id: tenant1 }} //res.id below gives new lease ID

      //send to redux
      this.props.createLease(nBody);

      this.setState({
        leaseType: "future"
      });
    }
  };

  handleMoveIn = e => {
    e.preventDefault();

    // const tenant1id = this.state.tenant1id;
    // const tenant2id = this.state.tenant2id;
    const unit = this.props.selectUnit;
    const lease = this.props.leases.filter(
      lease =>
        lease.unit_id === this.props.selectUnit.id && lease.status === "future"
    )[0];

    // if (tenant1id) {

    this.props.moveInOut(unit.id, "occupied", lease.id, "current");

    // this.props.createResLease(tenant1id, lease.id)
    // if (this.state.tenant2id) {
    //   this.props.createResLease(tenant2id, lease.id)
    // }

    this.setState({
      leaseType: "current"
    });
    // }
  };

  handleMoveOut = e => {
    e.preventDefault();

    const unit = this.props.selectUnit;
    const lease = this.props.leases.filter(
      lease =>
        lease.unit_id === this.props.selectUnit.id && lease.status === "current"
    )[0];

    // console.log(unit, lease);

    this.props.moveInOut(unit.id, "vacant", lease.id, "past");

    this.setState({
      leaseType: "past"
    });
  };

  handleToggleNotice = e => {
    const unit = this.props.selectUnit;
    const id = unit.id;
    const lease = this.props.leases.filter(
      lease =>
        lease.unit_id === this.props.selectUnit.id && lease.status === "current"
    )[0];

    if (unit.status === "occupied") {
      //send to redux
      this.props.updateUnit(id, "notice");
    } else {
      //send to redux
      this.props.updateUnit(id, "occupied");
    }
  };

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
        handleTenant1Change={this.handleTenant1Change}
        handleTenant2Change={this.handleTenant2Change}
        handleChange={this.handleChange}
        rent={this.state.rent}
        newTenant1={this.state.newTenant1}
        newTenant2={this.state.newTenant2}
      />
    );
  }

  renderContent() {
    // console.log("LEASE TYPE IS: ", this.state.leaseType);

    if (!this.props.selectUnit) {
      return (
        <div id="no-unit-selected">
          <p>Please select a unit</p>
        </div>
      );
    } else {
      // console.log(this.props.selectUnit.id)
      // console.log(this.props.leases);

      const unit = this.props.selectUnit;
      const currentLease = this.props.leases.filter(
        lease =>
          lease.unit_id === this.props.selectUnit.id &&
          lease.status === "current"
      )[0];
      const futureLease = this.props.leases.filter(
        lease =>
          lease.unit_id === this.props.selectUnit.id &&
          lease.status === "future"
      )[0];
      const pastLeases = this.props.leases.filter(
        lease =>
          lease.unit_id === this.props.selectUnit.id && lease.status === "past"
      );

      let unitType = "";

      if (unit.layout_type === "studio") {
        unitType = "Studio";
      } else if (unit.layout_type === "1_bed") {
        unitType = "1 Bedroom";
      } else {
        unitType = "2 Bedroom";
      }

      // if (!currentLease) {
      if (currentLease === 100) {
        // console.log("UNIT DETAIL STATE IS: ", this.state);
        ////////////////DEAD CODE
        return (
          <div>
            <span className="helper">UnitDetail</span>

            <p>
              <em>No active lease for this unit</em>
            </p>
            <button>Create New Future Lease</button>
            <br />
            <br />
            <form onSubmit={this.handleCreateNewLease}>
              <label htmlFor="start-date">Start date </label>
              <input
                type="date"
                name="newStartDate"
                id="start-date"
                onChange={this.handleDateChange}
              />
              <br />
              <label htmlFor="end-date">End date </label>
              <input
                type="date"
                name="newEndDate"
                id="end-date"
                onChange={this.handleDateChange}
              />
              <br />
              <label htmlFor="end-date">Rent </label>
              <input
                name="rent"
                placeholder="Rent"
                onChange={this.handleChange}
                value={this.state.rent}
              />
              <br />
              <button type="submit">Create New Future Lease</button>
            </form>
          </div>
        );
      }

      return (
        <div>
          <div id="lease-title-container">
            <h2>Apartment {this.props.selectUnit.number}</h2>
            <p className="lease-title-text">{unitType}</p>
            <br />
          </div>

          <div id="lease-info-container">
            <div
              onClick={this.handleLeaseTypeChange}
              className={
                this.state.leaseType === "past"
                  ? "detail-lease-button-active"
                  : "detail-lease-button"
              }
              id="leaseType-past"
            >
              <span className="lease-button-text">Past Leases</span>
            </div>

            <div
              onClick={this.handleLeaseTypeChange}
              className={
                this.state.leaseType === "current"
                  ? "detail-lease-button-active"
                  : "detail-lease-button"
              }
              id="leaseType-current"
            >
              <span className="lease-button-text">Current Lease</span>
            </div>

            <div
              onClick={this.handleLeaseTypeChange}
              className={
                this.state.leaseType === "future"
                  ? "detail-lease-button-active"
                  : "detail-lease-button"
              }
              id="leaseType-future"
            >
              <span className="lease-button-text">Future Lease</span>
            </div>

            {this.leaseInfoRender()}
          </div>

          {/*
          <div id="unit-info-container">
            <h4>Unit Info</h4>
            <span>Amenities: </span><br />
            <span><a href='/api/v1/print/example.pdf' target='_blank'>Floorplan (PDF)</a></span>
          </div>
          */}
        </div>
      ); //return
    } //else
  } //renderContent

  render() {
    // console.log('%c UnitDetail Render', 'color: red')
    return this.renderContent();
  } //render
} //class

function mapStateToProps(state) {
  return {
    selectUnit: state.unit.selectUnit,
    isLoaded: state.unit.isLoaded,
    leases: state.lease.leases
  };
}

export default connect(
  mapStateToProps,
  { fetchUnits, fetchLeases, createLease, updateUnit, moveInOut }
)(UnitDetail);
