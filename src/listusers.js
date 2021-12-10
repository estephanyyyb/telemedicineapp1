import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from "aws-amplify";
import "@aws-amplify/ui/dist/style.css";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import PageHeader from './components/page-header/PageHeader';



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

// const initialState = { id: '', username: '', email: '', given_name: '', family_name: '' };

const ListUsers = (props) => {

    // const [formState, setFormState] = useState(initialState);
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        fetchUsers();
    }, []);

    

    async function fetchUsers() {
        try {
            const userData = await API.graphql(graphqlOperation(listUsers));
            const users = userData.data.listUsers.items;

            console.log(users);
            setUsers(users);
        } catch (err) {
            console.log('error fetching users');
        }
    }


    return (
        <div className="App">
            <PageHeader currentUser={props.currentUser}></PageHeader>
            <div style={{fontWeight:'500', fontSize:'43px', textAlign:'center', fontFamily:'monospace', marginTop:'30px'}}>
                All Users in Health-T
            </div>
            <div  className="home__table">
                <div style={{marginTop:'30px', marginLeft: '30px', marginRight: '30px', border: '1px solid grey'}} className="columnsMain">
                    <TableContainer  >
                        <Table style={{marginTop: '0px', }} aria-label="simple table">
                            <TableHead  className="tbHead">
                                <TableRow >
                                <TableCell style={{backgroundColor:'#7ec4e8', textAlign: 'center', fontSize:'36px', fontFamily: '-moz-initial', fontWeight: 'bold'}} className="tablecell1" >ID</TableCell>
                                <TableCell style={{backgroundColor:'#7ec4e8', textAlign: 'center', fontSize:'36px', fontFamily: '-moz-initial', fontWeight: 'bold'}} className="tablecell1" ><div className="columns1">Username</div></TableCell>
                                    <TableCell style={{backgroundColor:'#7ec4e8', textAlign: 'center', fontSize:'36px', fontFamily: '-moz-initial', fontWeight: 'bold'}} className="tablecell1" ><div className="columns1">Name</div></TableCell>
                                    <TableCell style={{backgroundColor:'#7ec4e8', textAlign: 'center', fontSize:'36px', fontFamily: '-moz-initial', fontWeight: 'bold'}} className="tablecell1"><div className="columns1">Email</div></TableCell>
                                    {/* <TableCell className="tablecell1"><div className="columns1">Last Name</div></TableCell> */}

                                </TableRow>
                            </TableHead>
                            <TableBody className="tBody">
                                {users.map((row) => (
                                    <TableRow key={row?.user}>
                                        <TableCell style={{textAlign: 'center', fontWeight:'bold', fontSize:'20px'}} component="th" scope="row"> <div className="rows1">
                                            {row?.id} </div>
                                        </TableCell>
                                        <TableCell style={{textAlign: 'center', fontWeight:'bold', fontSize:'20px'}} component="th" scope="row"> <div className="rows1">
                                            {row?.username} </div>
                                        </TableCell>
                                        <TableCell style={{textAlign: 'center', fontWeight:'bold', fontSize:'20px'}}><div className="rows1">{row?.given_name + " " + row?.family_name}</div></TableCell>
                                        <TableCell style={{textAlign: 'center', fontWeight:'bold', fontSize:'20px'}} component="th" scope="row"> <div className="rows1">
                                            {row?.email} </div>
                                        </TableCell>



                                        {/* <TableCell ><div className="rows1">{row?.family_name}</div></TableCell> */}

                                    </TableRow>

                                ))}

                            </TableBody>
                        </Table>
                    </TableContainer>

                    
                </div>
            </div>
        </div>
    );
}

export default ListUsers;