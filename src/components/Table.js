import { useState, useEffect} from 'react';
import _ from "lodash";

import { api } from '../helpers/urls'
import TableRow from './TableRow';


const pageSize=10;

function Table(){
    const [users,setUsers]=useState([]);

    const [paginatedUsers,setPaginatedUsers]=useState([]); 
    const [currentPage,setCurrentPage]=useState(1);

    useEffect(()=>{
    fetch(api).
    then((res)=>res.json())
    .then((data)=>{
        setUsers(data);
        setPaginatedUsers(_(data).slice(0).take(pageSize).value())
    })
    },[])

    const deleteUser=(id)=>{
        const filteredArray=paginatedUsers.filter(user=>user.id !== id);
        const filteredArray2=users.filter(user=>user.id !== id);
        setUsers(filteredArray2);
        setPaginatedUsers(filteredArray);
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
            setPaginatedUsers(_(filteredUsers).slice(0).take(pageSize).value())
        })
        
    }
    
    const pageCount= users ? Math.ceil(users.length/pageSize) : 0 ; 
    

    const pages= _.range(1,pageCount+1);

    const pagination=(pageNo)=>{
        setCurrentPage(pageNo);
        const startIndex=(pageNo-1) * pageSize ;
        const paginatedUser= _(users).slice(startIndex).take(pageSize).value();
        setPaginatedUsers(paginatedUser);
    }
    
    return(
        
        <div id="main">
            <input id="searchbar" placeholder="Search By name or email or role" onChange={filterUsers}/>
            <table className="table">
                <thead >
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { paginatedUsers.map((user)=>{
                        return(
                           <TableRow user={user} deleteUser={deleteUser} changeUserDetail={changeUserDetail} key={user.id}/>
                        )
                    })}
               </tbody>
            </table>
            <nav className="d-flex justify-content-center">
                <ul className="pagination">
                    {
                        pages.map((page)=>{
                            return <li className={
                                page===currentPage ? "page-item active" : "page-item"
                            }
                            > 
                            <p className="page-link" onClick={()=>pagination(page)}>
                                {page}
                            </p>

                            </li>
                        })
                    }                  
                </ul>
            </nav>
        </div>
    );
}

export default Table;