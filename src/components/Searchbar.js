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
        <div id="searchbarContainer">
             <div id="searchbar"><input  placeholder="Search by name or email or role" onChange={filterUser}/></div>
             <div><button type="button" className="btn btn-danger">Delete Selected</button></div>
        </div>
    )
}

export default Searchbar;