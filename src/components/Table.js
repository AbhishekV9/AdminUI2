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

    console.log("users",users)
    return(
        <div>Table</div>
    );
}

export default Table;