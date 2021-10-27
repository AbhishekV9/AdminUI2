import TableRow from './TableRow';
import Searchbar from './Searchbar';
import Tableheader from './Tableheader'




function Table(props){

    const {users,setUsers,paginatedUsers,setPaginatedUsers } = props;

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

    
    return(
        
        <div id="main">
            
            <Searchbar  setPaginatedUsers={setPaginatedUsers} users={users}/>

            <table className="table table-striped table-hover" >
                <Tableheader />
                <tbody>
                    { paginatedUsers.map((user)=>{
                        return(
                           < TableRow user={user} deleteUser={deleteUser} changeUserDetail={changeUserDetail} key={user.id} />
                        )
                    })}
               </tbody>
            </table>
        </div>
    );
}

export default Table;