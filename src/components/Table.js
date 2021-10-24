import { useState, useEffect } from 'react';

import { api } from '../helpers/urls'
import TableRow from './TableRow';



function Table(){

    const [users,setUsers]=useState([]);
    

    useEffect(()=>{
    fetch(api).
    then((res)=>res.json())
    .then((data)=>{
        console.log("api",data);
        setUsers(data);
        console.log('users',users)
    })
    },[])

    const deleteUser=(id)=>{
        const filteredArray=users.filter(user=>user.id !== id);
        setUsers(filteredArray);
    }

    const changeUserDetail=(id,name,email,role)=>{
        
    }

    return(
        
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { users.map((user)=>{
                        return(
                           <TableRow user={user} deleteUser={deleteUser} changeUserDetail={changeUserDetail} key={user.id}/>
                        )
                    })}
               </tbody>
            </table>
        </div>
    );
}

export default Table;