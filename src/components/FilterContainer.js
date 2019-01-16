import React from 'react';
import { connect } from 'react-redux';

import { dataSelect, filterOccupied, filterNotice, filterVacant } from '../actions';

const FilterContainer = (props) => {

  // console.log("FilterContainer props are:", props);

  return (
    <div>
      <h3>FilterContainer</h3>

      <button id="status" onClick={props.dataSelect}>Status</button>
      <button id="rent" onClick={props.dataSelect}>Rent</button>
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
      <input type="text"></input>

    </div>
  )
}

function mapStateToProps(state) {
  return {
    filterOccStatus: state.filter.filterOccupied,
    filterNotStatus: state.filter.filterNotice,
    filterVacStatus: state.filter.filterVacant
  }
}

export default connect(mapStateToProps, { dataSelect, filterOccupied, filterNotice, filterVacant })(FilterContainer);
