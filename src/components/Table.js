import TableRow from './TableRow';
import Searchbar from './Searchbar';


function Table(props){
    

    const {users,setUsers,paginatedUsers,setPaginatedUsers,selectedUsers,setSelectedUsers } = props;
    
    //implimenting deletion of user:-removing the deleted user from paginatedUsers,Users and if users are present in selectedUsers then removing from there also.
    const deleteUser=(id)=>{
        const filteredArray=paginatedUsers.filter(user=>user.id !== id);
        const filteredArray2=users.filter(user=>user.id !== id);
        const filteredArr=selectedUsers.filter(ids=>ids !== id);
        setSelectedUsers(filteredArr);
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

    
    return(
        <div id="main">
            <Searchbar  
                setPaginatedUsers={setPaginatedUsers} 
                users={users} 
                setUsers={setUsers} 
                selectedUsers={selectedUsers} 
                setSelectedUsers={setSelectedUsers}
            />

            <table className="table table-striped table-hover" >
                <thead className="table-dark" >
                    <tr>
                        <th> <input type="checkbox" /></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { paginatedUsers.map((user)=>{
                        return(
                           < TableRow 
                                user={user} 
                                deleteUser={deleteUser} 
                                changeUserDetail={changeUserDetail}
                                key={user.id} 
                                selectedUsers={selectedUsers} 
                                setSelectedUsers={setSelectedUsers}
                           />
                        )
                    })}
               </tbody>
            </table>
        </div>
    );
}

export default Table;