import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

function multiRes(array) {
  return array.map(resident => nameMerge(resident)) //.join(', ')
}

function displayRes(array) {
  let residents = []
  array.forEach(resident => residents.push(<div key={resident}><span>{resident}</span><br /></div>))
  return residents
}

function nameMerge(resident) {
  const first = resident.first_name
  const last = resident.last_name
  return `${first} ${last}`
}

const LeaseInfo = (props) => {

  console.log("LEASE INFO PROPS ARE", props);

  const selectOptions = props.allResidents.map(resident => ({ label: `${resident.first_name} ${resident.last_name}`, value: resident.id }));

  const pastLeases = props.leases.filter(lease => lease.unit_id === props.unit.id && lease.status === "past")
  const currentLease = props.leases.filter(lease => lease.unit_id === props.unit.id && lease.status === "current")[0]
  const futureLease = props.leases.filter(lease => lease.unit_id === props.unit.id && lease.status === "future")[0]

  switch(props.type) {
    case "past":
      if (pastLeases.length > 0) {

        const lessees = multiRes(pastLeases[0].residents)
        const rent = pastLeases[0].rent
        const startDate = new Date(pastLeases[0].start_date * 1000).toLocaleDateString()
        const endDate = new Date(pastLeases[0].end_date * 1000).toLocaleDateString()
        const status = pastLeases[0].status.toUpperCase()
        const balance = pastLeases[0].account_balance

        return (
          <div id="past" className="lease-info">
            <table className="unit-detail-table">
              <tbody>
                <tr>
                  <th>Lessees</th>
                  <th>Lease Term</th>
                </tr>
                <tr>
                  <td>{lessees}</td>
                  <td>{startDate} - {endDate}</td>
                </tr>
                <tr>
                  <th>Rent</th>
                  <th>Balance</th>
                </tr>
                <tr>
                  <td>$ {rent}</td>
                  <td>$ {balance}</td>
                </tr>
                <tr>
                  <th>Status</th>
                </tr>
                <tr>
                  <td>{status}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )
      } else {
        return (
          <div id="past" className="lease-info">
            <span className="no-lease-span">NO PAST LEASES</span>
          </div>
        )
      }

    case "current":
      if (currentLease) {
        const lessees = displayRes(multiRes(currentLease.residents)) //gives array of full names with JSX
        const rent = currentLease.rent
        const startDate = new Date(currentLease.start_date * 1000).toLocaleDateString()
        const endDate = new Date(currentLease.end_date * 1000).toLocaleDateString()
        const status = currentLease.status.toUpperCase()
        const balance = currentLease.account_balance

        return (
          <div id="current" className="lease-info">
            <table className="unit-detail-table">
              <tbody>
                <tr>
                  <th>Lessees</th>
                  <th>Lease Term</th>
                </tr>
                <tr>
                  <td>{lessees.map(resident => resident)}</td>
                  <td>{startDate} - {endDate}</td>
                </tr>
                <tr>
                  <th>Rent</th>
                  <th>Balance</th>
                </tr>
                <tr>
                  <td>$ {rent}</td>
                  <td>$ {balance}</td>
                </tr>
                <tr>
                  <th>Status</th>
                </tr>
                <tr>
                  <td>{status}</td>
                </tr>
              </tbody>
            </table>

            <button className="button-toggle-notice" onClick={props.handleToggleNotice}>Toggle Notice</button><br />
            <button className="button-move-out" onClick={props.handleMoveOut}>Move Out</button><br />
            <span>Lease status will be: PAST</span>

          </div>

        )
      }
      else if (!currentLease && futureLease) {
        return (
          <div className="lease-info">
            <div id="select-future-lease-div">
                <span>MOVE IN FUTURE LEASE WHEN READY</span>
            </div>
          </div>
        )
      } else {
        return (
          <div className="lease-info">
            <p><em>No active lease for this unit - REAL THING</em></p>
            <br /><br />
            {/*
            <form onSubmit={props.handleCreateNewLease}>
              <label htmlFor="start-date">Start date</label>
              <span>start date</span><br />
              <input className="create-form-input" type="date" placeholder="Start Date" name="newStartDate" id="start-date" onChange={props.handleDateChange} />
              <label htmlFor="end-date">End date</label>
              <input className="create-form-input" type="date" name="newEndDate" id="end-date" onChange={props.handleDateChange} /><br />
              <label htmlFor="end-date">Rent</label>
              <input className="create-form-input" name="rent" placeholder="Rent" onChange={props.handleChange} value={props.rent}></input><br />
              <button type="submit">Create New Future Lease</button>
            </form>
            */}
            <form onSubmit={props.handleCreateNewLease}>
              <Select
                name="tenant1"
                onChange={props.handleTenant1Change}
                value={props.newTenant1} //should be resident ID
                options={selectOptions} />
              <Select
                name="tenant2"
                onChange={props.handleTenant2Change}
                value={props.newTenant2} //should be resident ID
                options={selectOptions} />
              <span>start date</span><br />
              <input className="create-form-input" type="date" name="newStartDate" id="start-date" onChange={props.handleDateChange} /><br />
              <span>end date</span><br />
              <input className="create-form-input" type="date" name="newEndDate" id="end-date" onChange={props.handleDateChange} /><br />
              <input className="create-form-input" name="rent" placeholder="Rent" onChange={props.handleChange} value={props.rent}></input><br />
              <button className="button-create-lease" type="submit">Create New Future Lease</button>
            </form>
          </div>
        )
      }

    case "future":
      if (futureLease) {

        const lessees = multiRes(futureLease.residents) //gives array of full names
        const rent = futureLease.rent
        const startDate = new Date(futureLease.start_date * 1000).toLocaleDateString()
        const endDate = new Date(futureLease.end_date * 1000).toLocaleDateString()
        const status = futureLease.status.toUpperCase()
        const balance = futureLease.account_balance

        return (
          <div id="future" className="lease-info">

            <table className="unit-detail-table">
              <tbody>
                <tr>
                  <th>Lessees</th>
                  <th>Lease Term</th>
                </tr>
                <tr>
                  <td>{lessees}</td>
                  <td>{startDate} - {endDate}</td>
                </tr>
                <tr>
                  <th>Rent</th>
                  <th>Balance</th>
                </tr>
                <tr>
                  <td>$ {rent}</td>
                  <td>$ {balance}</td>
                </tr>
                <tr>
                  <th>Status</th>
                </tr>
                <tr>
                  <td>{status}</td>
                </tr>
              </tbody>
            </table>

            <button className="button-move-in" onClick={props.handleMoveIn}>Move In</button><br />
            <span>Lease status will be: CURRENT</span>
          </div>
        )
      } else {
        return (
          <div id="past" className="lease-info">
            <span className="no-lease-span">NO FUTURE LEASE</span>
          </div>
        )
      }
  }
}

function mapStateToProps(state) {
  return {
    allResidents: state.resident.residents,
    resIsLoaded: state.resident.isLoaded,
  }
}

export default connect(mapStateToProps, null )(LeaseInfo);
