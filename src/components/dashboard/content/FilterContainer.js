import React from "react";
import { connect } from "react-redux";

import {
  dataSelect, //invoked onClick for data view buttons; sends target.id as payload and updates data state
  filterOccupied, //dispatch action (no payload) to toggle filter state (boolean)
  filterNotice, //dispatch action (no payload) to toggle filter state (boolean)
  filterVacant, //dispatch action (no payload) to toggle filter state (boolean)
  handleInput //controlled form to search for tenant by name
} from "../../../actions";

//This component contains the state controls for data rendering and filters, which will change how UnitContainer renders based on state changes

const FilterContainer = props => {
  return (
    <div id="filterContainer">
      <span className="filter-headers">Data Views</span>
      <br />

      <button className="button-test" id="status" onClick={props.dataSelect}>
        Status
      </button>
      <button className="button-test" id="rent" onClick={props.dataSelect}>
        Rent
      </button>
      <button className="button-test" id="ppsf" onClick={props.dataSelect}>
        $PSF
      </button>
      <button className="button-test" id="vacant" onClick={props.dataSelect}>
        Days Vacant
      </button>
      <button className="button-test" id="market" onClick={props.dataSelect}>
        Market Rent
      </button>
      <button className="button-test" id="diff" onClick={props.dataSelect}>
        Market Rent %Diff
      </button>
      <button className="button-test" id="lines" onClick={props.dataSelect}>
        Lines
      </button>
      <br />
      <span className="filter-headers">Filters</span>
      <br />
      <button
        className="filter-button"
        id={
          props.filterOccStatus ? "filter-occupied-on" : "filter-occupied-off"
        }
        onClick={props.filterOccupied}
      >
        Occupied
      </button>
      <button
        className="filter-button"
        id={props.filterNotStatus ? "filter-notice-on" : "filter-notice-off"}
        onClick={props.filterNotice}
      >
        Notice
      </button>
      <button
        className="filter-button"
        id={props.filterVacStatus ? "filter-vacant-on" : "filter-vacant-off"}
        onClick={props.filterVacant}
      >
        Vacant
      </button>
      <input
        id="tenant-search-input"
        onChange={props.handleInput}
        value={props.filterText}
        type="text"
        placeholder="Tenant name"
      />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    filterOccStatus: state.filter.filterOccupied, //boolean filter status for occupied units
    filterNotStatus: state.filter.filterNotice, //boolean filter status for notice units
    filterVacStatus: state.filter.filterVacant, //boolean filter status for vacant units
    filterText: state.filter.filterText
  };
}

export default connect(
  mapStateToProps,
  { dataSelect, filterOccupied, filterNotice, filterVacant, handleInput }
)(FilterContainer);
