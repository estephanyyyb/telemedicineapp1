import React from 'react';
import PageHeader from './page-header/PageHeader.js';
import profileStyle from './Profile.module.css'
import Auth from '@aws-amplify/auth';


class Profile extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            address: props.userData.address,
            phone_number: props.userData.phone_number,
            city: props.userData['custom:city'],
            state: props.userData['custom:state'],
            zipcode: props.userData['custom:zc'],
            reveal: false,
            revealPhone: false,
        }    
    }

    
    handleSubmit = (event) => {
        event.preventDefault()
        const data = this.state
        this.props.userData.address = data.address
        this.props.userData.address = data.phone_number
        this.props.userData['custom:city'] = data['custom:city']
        this.props.userData['custom:state'] = data['custom:state']
        this.props.userData['custom:zc'] = data['custom:zc']
    };
    

    handleInputChange = (event) => {
        event.preventDefault()
        console.log(event)
        console.log(event.target.name)
        console.log(event.target.value)
        this.setState({
            [event.target.name]: event.target.value,
        })
    };

    operation = (event) => {
        event.preventDefault()
        this.setState({
            reveal:!this.state.reveal
        })
        
    }

    operationPhone = (event) => {
        event.preventDefault()
        this.setState({
            revealPhone:!this.state.revealPhone
        })
    }

    changeLabel = (event) => {
        event.preventDefault()
        const data = this.state
        document.getElementById("address_label").innerHTML = (data.address + ", " + data.city + ", " + data.state + ", " + data.zipcode).toUpperCase();
        document.getElementById("phone_number_label").innerHTML = data.phone_number
    }


    render() {
        const {address, phone_number, city, state, zipcode, reveal} = this.state
        console.log('ADDRESS', this.state)
        updateUser(address,phone_number, city, state, zipcode)
        return (
            <div>
                <div>
                    <PageHeader currentUser={this.props.currentUser}></PageHeader>
                    <br/>
                    <h1 className={profileStyle.h1}>Profile</h1>
                    <div className={ reveal ? `${profileStyle['profile-box']} ${profileStyle['primary-color']}` : `${profileStyle['profile-box2']} ${profileStyle['primary-color']}`}>
                        <div className={ reveal ? `${profileStyle['profile-textbox']}` : `${profileStyle['profile-textbox2']}`}>
                            <div className={profileStyle['profile-innertext']}>
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <h4>Basic Information</h4>
                                    <br/>
                                    <h5>Full-Name</h5>
                                    <label className={profileStyle.label}>{(this.props.userData.given_name + " " + this.props.userData.family_name).toUpperCase()}</label>
                                    <br/>
                                    <br/>
                                    <hr/>
                                    <h5>Date of Birth</h5>
                                    <label className={profileStyle.label}>{(this.props.userData.birthdate).toUpperCase()}</label>
                                    <br/>
                                    <br/>
                                    <hr/>
                                    <h5>Ethnicity</h5>
                                    <label className={profileStyle.label}>{(this.props.userData["custom:ethnicity"]).toUpperCase()}</label>
                                    <br/>
                                    <br/>
                                    <hr/>
                                    <h5>Marital Status</h5>
                                    <label className={profileStyle.label}>{(this.props.userData["custom:marital-status"]).toUpperCase()}</label>
                                    <br/>
                                    <br/>
                                    <hr/>
                                </div>
                                <br/>
                                <div className="form-group">
                                    <h4>Contact Information</h4>
                                    <br/>
                                    <h5>Email Address</h5>
                                    <label className={profileStyle.label}>{(this.props.userData.email).toUpperCase()}</label>
                                    <br/>
                                    <br/>
                                    <hr/>

                                    <br/>
                                    <h5>Address</h5>
                                    <label className={profileStyle.label} id="address_label">{(this.props.userData.address + ", " + this.props.userData['custom:city'] + ", " + this.props.userData['custom:state'] + " " + this.props.userData['custom:zc']).toUpperCase()}</label>

                                    <br/>
                                    <br/>
                    
                                    <div>
                                        {
                                            this.state.reveal?
                                            <div className="">
                                                <label className={profileStyle.label} for="inputAddress">Edit Street Address</label>
                                                <br/>
                                                <input className={profileStyle.label} type="text" className="form-control" id="inputAddress" value={address} name="address" placeholder={address} onChange={this.handleInputChange}/>
                                                <br/>
                                                <label className={profileStyle.label} id="city_label" for="inputCity">Edit City</label>
                                                <input type="text" className="form-control" id="inputCity" value={city} name="city" placeholder={city} onChange={this.handleInputChange}/>
                                                <br/>
                                                <label className={profileStyle.label} id="state_label" for="inputState">Edit State</label>
                                                <input type="text" className="form-control" id="inputState" value={state} name="state" placeholder={state} onChange={this.handleInputChange}/>
                                                <br/>
                                                <label className={profileStyle.label} id="zipcode_label" for="inputState">Edit ZIP Code</label>
                                                <input type="text" className="form-control" id="zipcode_label" value={zipcode} name="zipcode" placeholder={zipcode} onChange={this.handleInputChange}/>
                                                <br/>
                                            </div>
                                            :null
                                        }
                                        <button className={profileStyle['edit-dropdown']} onClick={this.operation}>Edit Address</button>
                                    </div>
                                    <br/>
                                    <hr/>
                                    <h5>Phone Number</h5>
                                    <label className={profileStyle.label} id="phone_number_label">{this.props.userData.phone_number}</label>
                                    <br/>
                                    <br/>
                                    
                                    <div>
                                        {
                                            this.state.revealPhone?
                                            <div className="">
                                                <label className={profileStyle.label} for="inputPhoneNumber">Edit Phone Number</label>
                                                <input type="text" className="form-control" id="inputPhoneNumber" value={phone_number} name="phone_number" placeholder={phone_number} onChange={this.handleInputChange}/>
                                            </div>
                                            :""
                                        }
                                        <br/>
                                        { <button className={profileStyle['edit-dropdown']} onClick={this.operationPhone}>Edit Number</button> }
                                    </div>
                                </div>
                                <br/>
                                <hr/>
                                <br/>
                                <button className="btn btn-primary" onClick={this.changeLabel}>Update</button>
                            </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ) 
    }
}

async function updateUser(address, phone_number, city, state, zipcode) {
    const user = await Auth.currentAuthenticatedUser();
    await Auth.updateUserAttributes(user, {
    'address': address,
    'phone_number': phone_number,
    'custom:city': city,
    'custom:state': state,
    'custom:zc': zipcode
    });
}

Profile.propTypes = {};

Profile.defaultProps = {};

export default Profile;