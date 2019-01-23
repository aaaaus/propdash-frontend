import React from 'react';
import { connect } from 'react-redux';

import { dataSelect, filterOccupied, filterNotice, filterVacant, handleInput } from '../actions';

const FilterContainer = (props) => {

  // console.log("FilterContainer props are:", props);

  return (
    <div id="filterContainer">
      <h4 className="helper">FilterContainer</h4>

      <button className="button-test" id="status" onClick={props.dataSelect}>Status</button>
      <button className="ui button" id="rent" onClick={props.dataSelect}>Rent</button>
      <button className="ui button" id="ppsf" onClick={props.dataSelect}>$PSF</button>
      <button className="ui button" id="vacant" onClick={props.dataSelect}>Days Vacant</button>
      <button className="ui button" id="market" onClick={props.dataSelect}>Market Rent</button>
      <button className="ui button" id="diff" onClick={props.dataSelect}>Market Rent %Diff</button>
      <button className="ui button" id="lines" onClick={props.dataSelect}>Lines</button>
      <br />
      <br />
      <button className="filter-button" id={props.filterOccStatus? "filter-occupied-on" : "filter-occupied-off"} onClick={props.filterOccupied}>Occupied</button>
      <button className="filter-button" id={props.filterNotStatus? "filter-notice-on" : "filter-notice-off"} onClick={props.filterNotice}>Notice</button>
      <button className="filter-button" id={props.filterVacStatus? "filter-vacant-on" : "filter-vacant-off"} onClick={props.filterVacant}>Vacant</button>
      <input
        onChange={props.handleInput}
        value={props.filterText}
        type="text"
        placeholder="Tenant name"
        style={{width: "250px"}}
      >
      </input>

    </div>
  )
}

function mapStateToProps(state) {
  return {
    filterOccStatus: state.filter.filterOccupied,
    filterNotStatus: state.filter.filterNotice,
    filterVacStatus: state.filter.filterVacant,
    filterText: state.filter.filterText
  }
}

export default connect(mapStateToProps, { dataSelect, filterOccupied, filterNotice, filterVacant, handleInput })(FilterContainer);
