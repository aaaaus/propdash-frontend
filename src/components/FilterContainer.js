import React from 'react';

const FilterContainer = () => {

  return (
    <div>
      <h3>FilterContainer</h3>
      <button>Status</button>
      <button>Rent</button>
      <button>Days Vacant</button>
      <button>Market Rent</button>
      <button>Market Rent %Diff</button>
      <button>Lines</button>
      <br />
      <br />
      <select>
        <option>Vacant</option>
        <option>Occupied</option>
        <option>Legal</option>
      </select>
    </div>
  )
}

export default FilterContainer;
