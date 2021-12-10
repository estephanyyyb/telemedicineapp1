import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from "aws-amplify";
import PageHeader from './components/page-header/PageHeader';
import { createUser } from "./graphql/mutations";

const listUsers = `query listUsers {
    listUsers{
        items{
            id
            username
            email
            given_name
            family_name
        }
    }
}`;


const CreateUsers = (props) => {
    const [fetching, setFetching] = useState(false);
    const [users, setUsers] = useState([]);

    async function fetchUsers() {
        setFetching(true);
        try {
            const userData = await API.graphql(graphqlOperation(listUsers));
            const users = userData.data.listUsers.items;
            setUsers(users);
            setFetching(false)
        } catch (err) {
            console.log("Error getting users");
        }
        setFetching(false);
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    const [userForm, setUserForm] = useState({
        username: "",
        email: "",
        given_name: "",
        family_name: ""
    });

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
        alert("User has been successfully created!");

        API.graphql(graphqlOperation(createUser, { input: userForm })).then(e => {
            setUserForm({
                username: "",
                email: "",
                given_name: "",
                family_name: ""
            });
            return fetchUsers();
        }).catch(err => {
            console.error(err);
        });
    }


    return (
        <div className="App">
            <PageHeader currentUser={props.currentUser}></PageHeader>

            <div style={{ fontWeight: '500', fontSize: '43px', textAlign: 'center', fontFamily: 'monospace', marginTop: '30px' }}>
                Create a User
            </div>

            <div style={{ height: '540px', margin: '30px 30px 30px 30px', border: '1px solid grey' }}>
                <div >
                    <form onSubmit={handleSubmit}>
                        <div style={{fontSize: '30px'}}>
                            Enter new user's username:
                            <input style={{ marginLeft: '20px', marginBottom:'30px', marginTop: '100px', width: '400px', height: '40px', fontSize: '25px'}} placeholder="username" type="text" onChange={handleChange("username")} /> <br />
                        </div>
                        <div style={{fontSize: '30px'}}>
                            Enter new user's email address:

                            <input style={{ marginLeft: '20px', marginBottom:'30px', width: '400px', height: '40px', fontSize: '25px'}} placeholder="email address" type="text" onChange={handleChange("email")} /> <br /></div>
                        <div style={{fontSize: '30px'}}>
                            Enter new user's first name:
                            <input style={{marginLeft: '20px', marginBottom:'30px', width: '400px', height: '40px', fontSize: '25px'}} placeholder="first name" type="text" onChange={handleChange("given_name")} /> <br /> </div>
                        <div style={{fontSize: '30px'}}>
                            Enter new user's last name:
                            <input style={{ marginLeft: '20px', marginBottom:'30px', width: '400px', height: '40px', fontSize: '25px'}} placeholder="last name" type="text" onChange={handleChange("family_name")} /><br /> </div>
                        
                            <button style={{height:'70px', width: '500px', display: 'inline', margin: '30px', fontSize:'30px', backgroundColor:'#7ec4e8', color:'black', fontWeight:'bold', border:'1px solid grey'}} 
                            type="submit">Add User</button>
                    </form>
                </div>


                {/* {users.map((user) =>(
                <p>{user.email}</p>
                ))} */}
            </div>
        </div>
    );

}

export default CreateUsers;
