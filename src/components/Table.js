import { useState, useEffect} from 'react';
import _ from "lodash";

import { api } from '../helpers/urls'
import TableRow from './TableRow';
import Searchbar from './Searchbar';
import Tableheader from './Tableheader'

//users shown in one page
const pageSize=10;

function Table(){

    //local states
    const [users,setUsers]=useState([]);
    const [paginatedUsers,setPaginatedUsers]=useState([]); 
    const [currentPage,setCurrentPage]=useState(1);

    //fetching users from api and setting it in local states when component is mounted
    useEffect(()=>{
    fetch(api).
    then((res)=>res.json())
    .then((data)=>{
        setUsers(data);
        setPaginatedUsers(_(data).slice(0).take(pageSize).value())
    })
    },[])

    //implimenting deletion of user
    const deleteUser=(id)=>{
        const filteredArray=paginatedUsers.filter(user=>user.id !== id);
        const filteredArray2=users.filter(user=>user.id !== id);
        setUsers(filteredArray2);
        setPaginatedUsers(filteredArray);
    }

    //chnaging user details like name,email,role.
    const changeUserDetail=(id,newName,newEmail,newRole)=>{
        const index=users.findIndex(user=>user.id===id);
        users[index].name=newName;
        users[index].email=newEmail;
        users[index].role=newRole;
        setUsers(users);
    }

    
    //no of pages required on the basis of numbers of users
    const pageCount= users ? Math.ceil(users.length/pageSize) : 0 ; 
    
    const pages= _.range(1,pageCount+1);

    //setting paginated user acording to the page number
    const pagination=(pageNo)=>{
        setCurrentPage(pageNo);
        const startIndex=(pageNo-1) * pageSize ;
        const paginatedUser= _(users).slice(startIndex).take(pageSize).value();
        setPaginatedUsers(paginatedUser);
    }

    return(
        
        <div id="main">
            
            <Searchbar  setPaginatedUsers={setPaginatedUsers} users={users}/>

            <table className="table table-striped table-hover" >
                <Tableheader />
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