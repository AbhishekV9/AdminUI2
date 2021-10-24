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

    const changeUserDetail=(id,newName,newEmail,newRole)=>{
        const index=users.findIndex(user=>user.id===id);
        users[index].name=newName;
        users[index].email=newEmail;
        users[index].role=newRole;
        setUsers(users);
    }

    const filterUsers=async (e)=>{
        const newValue=e.target.value.toLowerCase();
        await fetch(api)
        .then(res=>res.json())
        .then((data)=>{
            const filteredUsers=data.filter((user)=>{
                return user.name
                .toLowerCase()
                .includes(newValue) || user.email
                .toLowerCase()
                .includes(newValue) || user.role
                .toLowerCase()
                .includes(newValue)
            });
            setUsers(filteredUsers);
        })
        
    }
    

    return(
        
        <div>
            <input placeholder="Search By name or email or role" onChange={filterUsers}/>
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