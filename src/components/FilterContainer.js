import React from 'react';
import { connect } from 'react-redux';

import { dataSelect, filterOccupied, filterNotice, filterVacant, handleInput } from '../actions';

const FilterContainer = (props) => {

  // console.log("FilterContainer props are:", props);

  return (
    <div>
      <h3>FilterContainer</h3>

      <button id="status" onClick={props.dataSelect}>Status</button>
      <button id="rent" onClick={props.dataSelect}>Rent</button>
      <button id="ppsf" onClick={props.dataSelect}>$PSF</button>
      <button id="vacant" onClick={props.dataSelect}>Days Vacant</button>
      <button id="market" onClick={props.dataSelect}>Market Rent</button>
      <button id="diff" onClick={props.dataSelect}>Market Rent %Diff</button>
      <button id="lines" onClick={props.dataSelect}>Lines</button>
      <br />
      <br />
      <button id="filter-occupied" onClick={props.filterOccupied}>{props.filterOccStatus ? 'Occupied (ON)' : 'Occupied'}</button><br />
      <button id="filter-notice" onClick={props.filterNotice}>{props.filterNotStatus ? 'Notice (ON)' : 'Notice'}</button><br />
      <button id="filter-vacant" onClick={props.filterVacant}>{props.filterVacStatus ? 'Vacant (ON)' : 'Vacant'}</button><br />
      <br />
      <input
        onChange={props.handleInput}
        value={props.filterText}
        type="text"
        placeholder="search by name"
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
