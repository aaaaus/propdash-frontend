import React from 'react';
import { connect } from 'react-redux';

import { fetchLeases, createLease } from '../actions';

class UnitDetail extends React.Component {

  state = {
    lessees: [],
    newStartDate: '',
    newEndDate: '',
    rent: '',
  }

  //this was originally the first call of this, but later UnitContainer added this
  // componentDidMount() {
  //   this.props.fetchLeases();
  // }

  nameMerge(resident) {
    const first = resident.first_name
    const last = resident.last_name
    return `${first} ${last}`
  }

  multiRes(array) {
    return array.map(resident => this.nameMerge(resident)).join(', ')
  }

  //form
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
    const nStatus = "current" //later, make this dynamic to reflect future leases

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
          this.props.createLease(res);
          this.props.fetchLeases();
        })
    }
  }

  renderContent() {

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
      const currentLeases = this.props.leases.filter(lease => lease.unit_id === this.props.selectUnit.id && lease.status === "current") //should return an array with at most ONE element
      const lease = currentLeases[0]

      if (currentLeases.length === 0) {
        // console.log("UNIT DETAIL STATE IS: ", this.state);
        return (
          <div>
            <h3>UnitDetail</h3>
            <p><em>No active lease for this unit</em></p>
            <button>Create New Lease</button>
            <br /><br />
            <form onSubmit={this.handleCreateNewLease}>
              <label htmlFor="start-date">Start date </label>
              <input type="date" name="newStartDate" id="start-date" onChange={this.handleDateChange} /><br />
              <label htmlFor="end-date">End date </label>
              <input type="date" name="newEndDate" id="end-date" onChange={this.handleDateChange} /><br />
              <label htmlFor="end-date">Rent </label>
              <input name="rent" placeholder="Rent" onChange={this.handleChange} value={this.state.rent}></input><br />
              <button type="submit">Create</button>
            </form>
          </div>


        )
      }

      return (
        <div>
          <h3>UnitDetail</h3>
          <h4>Lease Info</h4>
          <span>Lessees: {this.multiRes(lease.residents)} </span><br />
          <span>Lease Term: {new Date(lease.start_date * 1000).toLocaleDateString()} - {new Date(lease.end_date * 1000).toLocaleDateString()}</span><br />
          {/* <span>Occupants: </span><br /> */}
          <span>Rent: {lease.rent}</span><br />
          <span>Status: {lease.status.toUpperCase()} </span><br />
          <span>Balance: {lease.account_balance} </span><br />
          <br />
          <span><em>Previous Lease | Create Future Lease</em></span><br />
          <h4>Unit Info</h4>
          <span>Amenities: </span><br />
          <span><a href='/api/v1/print/example.pdf' target='_blank'>Floorplan (PDF)</a></span><br />
          <br />
        </div>
      ) //return

    } //else

  } //renderContent

  render() {
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

export default connect(mapStateToProps, { fetchLeases, createLease })(UnitDetail);


// function createNewSighting() {
//   const createForm = document.getElementById('create-form')
//   const nEntity = createForm.querySelector('input[name=entity]').value
//   const nImage = createForm.querySelector('input[name=image-url]').value
//   const nDescription = createForm.querySelector('textarea[name=description]').value
//   const nLat = document.getElementById('create-coords').innerHTML.split('<br>')[0]
//   const nLong = document.getElementById('create-coords').innerHTML.split('<br>')[1]
//   const nMonsterId = createForm.querySelector('select').value
//
//   if (nEntity && nImage && nDescription && nLat && nLong && nMonsterId) {
//     const nBody = {sighting: {entity: nEntity, image: nImage, description: nDescription, lat: nLat, long: nLong, monster_id: nMonsterId}}
//     fetch('http://localhost:3000/api/v1/sightings', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//       },
//       body: JSON.stringify(nBody)
//     })
//     .then(res => res.json())
//     .then(res => {
//       console.log(res)
//       if (res.id) {
//         const nSighting = new Sighting(res)
//         loadAllSightings()
//         .then(() => {
//           deleteMarkers()
//           renderSightings()
//           resetCreate()
//           renderInfoSidebar(res)
//         })
//
//       }
//     })
//   } else {
//     toggleInvisible(document.getElementById('open-create'))
//     setTimeout(() => {
//       dropInCreate(createForm)
//       alert('You must fill out all forms!')
//     },1050)
//   }
// }
