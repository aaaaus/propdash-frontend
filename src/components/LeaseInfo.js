import React from 'react';

function multiRes(array) {
  return array.map(resident => nameMerge(resident)).join(', ')
}

function nameMerge(resident) {
  const first = resident.first_name
  const last = resident.last_name
  return `${first} ${last}`
}

const LeaseInfo = (props) => {

  console.log("LEASE INFO PROPS ARE", props);

  const pastLeases = props.leases.filter(lease => lease.unit_id === props.unit.id && lease.status === "past")
  const currentLease = props.leases.filter(lease => lease.unit_id === props.unit.id && lease.status === "current")[0]
  const futureLease = props.leases.filter(lease => lease.unit_id === props.unit.id && lease.status === "future")[0]

  switch(props.type) {
    case "past":
      if (pastLeases.length > 0) {
        return (
          <div id="past">
          <span>Lessees: {multiRes(pastLeases[0].residents)} </span><br />
          <span>Lease Term: {new Date(pastLeases[0].start_date * 1000).toLocaleDateString()} - {new Date(pastLeases[0].end_date * 1000).toLocaleDateString()}</span><br />
          <span>Rent: {pastLeases[0].rent}</span><br />
          <span>Status: {pastLeases[0].status.toUpperCase()} </span><br />
          <span>Balance: {pastLeases[0].account_balance} </span><br />
          </div>
        )
      } else {
        return "NO PAST LEASES"
      }

    case "current":
      if (currentLease) {
        return (
          <div id="current">
          <span>Lessees: {multiRes(currentLease.residents)} </span><br />
          <span>Lease Term: {new Date(currentLease.start_date * 1000).toLocaleDateString()} - {new Date(currentLease.end_date * 1000).toLocaleDateString()}</span><br />
          {/* <span>Occupants: </span><br /> */}
          <span>Rent: {currentLease.rent}</span><br />
          <span>Status: {currentLease.status.toUpperCase()} </span><br />
          <span>Balance: {currentLease.account_balance} </span><br />
          <br />
          <button onClick={props.handleToggleNotice}>Toggle Notice</button><br />
          <button onClick={props.handleMoveOut}>Move Out</button><br />
          <span>Lease status will be: PAST</span>
          </div>
        )
      }
      else if (!currentLease && futureLease) {
        return "MOVE IN FUTURE LEASE WHEN READY"
      } else {
        return (
          <div>
            <p><em>No active lease for this unit</em></p>
            <br /><br />
            <form onSubmit={props.handleCreateNewLease}>
              <label htmlFor="start-date">Start date: </label>
              <input type="date" name="newStartDate" id="start-date" onChange={props.handleDateChange} /><br />
              <label htmlFor="end-date">End date: </label>
              <input type="date" name="newEndDate" id="end-date" onChange={props.handleDateChange} /><br />
              <label htmlFor="end-date">Rent: </label>
              <input name="rent" placeholder="Rent" onChange={props.handleChange} value={props.rent}></input><br />
              <button type="submit">Create New Future Lease</button>
            </form>
          </div>
        )
      }

    case "future":
      if (futureLease) {
        return (
          <div id="future">
          <span>Lessees: {multiRes(futureLease.residents)} </span><br />
          <span>Lease Term: {new Date(futureLease.start_date * 1000).toLocaleDateString()} - {new Date(futureLease.end_date * 1000).toLocaleDateString()}</span><br />
          <span>Rent: {futureLease.rent}</span><br />
          <span>Status: {futureLease.status.toUpperCase()} </span><br />
          <span>Balance: {futureLease.account_balance} </span><br />
          <br />
          <button onClick={props.handleMoveIn}>Move In</button><br />
          <span>Lease status will be: CURRENT</span>
          </div>
        )
      } else {
        return "NO FUTURE LEASE"
      }
  }
}

export default LeaseInfo;
