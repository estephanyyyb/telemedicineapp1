import React, {Component} from 'react';

class Form extends Component {
  constructor(props){
    super(props)
    this.state = { date:undefined, time:undefined, reason:'', notes:''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event){
    event.preventDefault();
    const time = this.state.time;
    const date = this.state.date;

    alert(
        `Appointment requested for:
        ${date}
        ${time}`
    )
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
    return (
      // <form>
      <form style={{margin:15, display:'flex', flexWrap:'wrap'}} onSubmit={this.handleSubmit}>
        <div>
            <label>Date: </label>
            <input type="date" name="date" value={this.state.date} onChange={this.handleChange}></input>
        </div><div style={{width:'100%'}}/>
        <div style={{marginTop:15}}>
            <label>Time: </label>
            <input type="time" name="time" value={this.state.time} onChange={this.handleChange}></input>
        </div><div style={{width:'100%'}}/>
        <div style={{marginTop:15}}>
            <label>Reason: </label>
            <input type="text" name="reason" value={this.state.reason} onChange={this.handleChange}></input>
        </div><div style={{width:'100%'}}/>
        <div style={{marginTop:15}}>
            <label>Notes: </label>
            <input type="text" name="notes" value={this.state.notes} onChange={this.handleChange}></input>
        </div><div style={{width:'100%'}}/>
        <div style={{marginTop:15}}>
            <label></label>
            <input type="submit"></input>
        </div><div style={{width:'100%'}}/>
      </form>
// </form>
    );
  }
}

export default Form;