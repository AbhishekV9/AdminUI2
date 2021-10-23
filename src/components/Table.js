import { useState, useEffect } from 'react';

import { api } from '../helpers/urls'



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
        const filteredArray=users.filter(user=>user.id != id);
        setUsers(filteredArray);
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
                        <tr>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <img src="https://cdn-icons-png.flaticon.com/512/1828/1828843.png" onClick={()=>deleteUser(user.id)} alt="delete" />
                                <img src="https://cdn-icons-png.flaticon.com/512/3597/3597075.png" alt="edit" />
                            </td>
                        </tr>
                        )
                    })}
               </tbody>
            </table>
        </div>
    );
}

export default Table;