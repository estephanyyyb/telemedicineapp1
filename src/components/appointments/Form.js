import React, {Component, useState, useEffect} from 'react';
import { API, graphqlOperation } from "aws-amplify";

class Form extends Component {
  constructor(props){
    super(props)
    this.currentIdx = this.props.currentIndex;
    this.state = { id: this.currentIdx, patient: props.patientEmail, date:"2021-12-20T08:00", doctor: '', reason:'', notes:'', approval: false};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event){
    event.preventDefault();
    // const time = this.state.time;
    const date = this.state.date;

    this.currentIdx++;

    if(!date) {
      alert(
        `Date or time not selected.`
    )
    } else {
      alert(
          `Appointment requested for:
          ${date}`
      )
    }

    await this.setState({
      id: this.currentIdx
    })
    console.log(this.state);
    var {userForm} = this.state;
    
    // userForm = this.setState({
    //   id: this.state.id,
    //   patient: this.state.patient,
    //   doctor: this.state.doctor,
    //   date: this.state.date,
    //   reason: this.state.reason,
    //   notes: this.state.notes,
    //   approval: this.state.approval
    // });

    API.graphql(graphqlOperation(`
    mutation CreateAppointments(
      $input: CreateAppointmentsInput!
      $condition: ModelAppointmentsConditionInput
    ) {
      createAppointments(input: $input, condition: $condition) {
        id
        patient
        doctor
        date
        reason
        notes
        approval
      }
    }
    `, { input: userForm })).then(e => {
      this.setUserForm({
          id: "",
          patient: "",
          doctor: "",
          date: "",
          reason: "",
          notes: "",
          approval: ""
      });
      // return fetchUsers();
    }).catch(err => {
        console.error(err);
    });
  }
  
  // Method causes to store all the values of the 
  // input field in react state single method handle 
  // input changes of all the input field using ES6 
  // javascript feature computed property names
  async handleChange(event){
    await this.setState({
      // Computed property names
      // keys of the objects are computed dynamically
      [event.target.name] : event.target.value
    })

    console.log(this.state);
  }

  render() {
    console.log(this.props.currentIndex);
    return (
      <form style={{margin:15, display:'flex', flexWrap:'wrap'}} onSubmit={this.handleSubmit}>
        <div>
            <label>Date: </label>
            <input type="datetime-local" name="date" value={this.state.date} style={{maxWidth:300}} onChange={this.handleChange}></input>
        </div><div style={{width:'100%'}}/>
        {/* <div style={{marginTop:0}}>
            <label>Time: </label>
            <input type="time" name="time" value={this.state.time} style={{maxWidth:300}} onChange={this.handleChange}></input>
        </div><div style={{width:'100%'}}/> */}
        <div style={{marginTop:0}}>
            <label>Doctor: </label>
            <input type="text" name="doctor" value={this.state.doctor} style={{maxWidth:300}} onChange={this.handleChange}></input>
        </div><div style={{width:'100%'}}/>
        <div style={{marginTop:0}}>
            <label>Reason: </label>
            <input type="text" name="reason" value={this.state.reason} style={{maxWidth:300}} onChange={this.handleChange}></input>
        </div><div style={{width:'100%'}}/>
        <div style={{marginTop:0}}>
            <label>Notes: </label>
            <input type="text" name="notes" value={this.state.notes} style={{maxWidth:300}} onChange={this.handleChange}></input>
        </div><div style={{width:'100%'}}/>
        <div style={{marginTop:0}}>
            <label></label>
            <input style={{maxWidth:'50%', marginLeft:'auto', marginRight:'auto'}} type="submit"></input>
        </div><div style={{width:'100%'}}/>
      </form>
    );
  }
}

export default Form;