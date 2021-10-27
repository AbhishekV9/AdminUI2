import _ from "lodash";


const pageSize=10;

function Searchbar(props){

    const {users,setPaginatedUsers} = props;
    
    //filtering users and setting users and paginated users on the basis of text entered in search bar 
    const filterUser= (e) =>{
        const newValue=e.target.value.toLowerCase();
        const filteredUsers=users.filter((user)=>{
            return user.name
                .toLowerCase()
                .includes(newValue) || user.email
                .toLowerCase()
                .includes(newValue) || user.role
                .toLowerCase()
                .includes(newValue)
        })
        setPaginatedUsers(_(filteredUsers).slice(0).take(pageSize).value())
    }

    return(
        <div>
             <input id="searchbar" placeholder="Search by name or email or role" onChange={filterUser}/>
        </div>
    )
}

export default Searchbar;