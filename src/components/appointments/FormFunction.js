import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from "aws-amplify";

const listAppointments = `query listAppointments {
    listAppointments{
        items{
            id
            patient
            doctor
            date
            reason
            notes
            approval
        }
    }
  }`;

  const createAppointments = /* GraphQL */ `
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
        createdAt
        updatedAt
    }
  }
`;

var currentIdx = 0;

const FormFunction = (props) => {

    const [fetching, setFetching] = useState(false);
    const [users, setUsers] = useState([]);

    currentIdx = props.currentIndex + 1;
    // state = { id: this.currentIdx, patient: props.patientEmail, date:"2021-12-20T08:00", doctor: '', reason:'', notes:'', approval: false};
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);

    const [userForm, setUserForm] = useState({
        id: currentIdx,
        patient: props.patientEmail,
        doctor: "",
        date: "2021-12-20T08:00",
        reason: "",
        notes: "",
        approval: false
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    async function fetchUsers(){
        setFetching(true);
        try{
        const userData = await API.graphql(graphqlOperation(listAppointments));
        const users = userData.data.listAppointments.items;
        setUsers(users);
        setFetching(false)
        } catch(err)
        {
            console.log("Error getting users");
        }
        setFetching(false);
    }

    const handleChange = (key) => {
        return (e) => {
            setUserForm({
                ...userForm,
                [key]: e.target.value
            });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("User has been successfully created!");
        userForm.id = currentIdx++;
        console.log(userForm);

        API.graphql(graphqlOperation(createAppointments, { input: userForm })).then(e => {
            setUserForm({
                id: currentIdx,
                patient: props.patientEmail,
                doctor: "",
                date: "2021-12-20T08:00",
                reason: "",
                notes: "",
                approval: false
            });
            return fetchUsers();
        }).catch(err => {
            console.error(err);
        });
        alert('Appointment Requested.')
    }

    return (
        <form style={{margin:15, display:'flex', flexWrap:'wrap'}} onSubmit={handleSubmit}>
          <div>
              <label>Date: </label>
              <input type="datetime-local" name="date" defaultValue="2021-12-20T08:00" style={{maxWidth:300}} onChange={handleChange("date")}></input>
          </div><div style={{width:'100%'}}/>
          {/* <div style={{marginTop:0}}>
              <label>Time: </label>
              <input type="time" name="time" value={this.state.time} style={{maxWidth:300}} onChange={this.handleChange}></input>
          </div><div style={{width:'100%'}}/> */}
          <div style={{marginTop:0}}>
              <label>Doctor: </label>
              <input type="text" name="doctor"  style={{maxWidth:300}} onChange={handleChange("doctor")}></input>
          </div><div style={{width:'100%'}}/>
          <div style={{marginTop:0}}>
              <label>Reason: </label>
              <input type="text" name="reason"  style={{maxWidth:300}} onChange={handleChange("reason")}></input>
          </div><div style={{width:'100%'}}/>
          <div style={{marginTop:0}}>
              <label>Notes: </label>
              <input type="text" name="notes"  style={{maxWidth:300}} onChange={handleChange("notes")}></input>
          </div><div style={{width:'100%'}}/>
          <div style={{marginTop:0}}>
              <label></label>
              <input style={{maxWidth:'50%', marginLeft:'auto', marginRight:'auto'}} type="submit"></input>
          </div><div style={{width:'100%'}}/>
        </form>
    );
}

export default FormFunction;