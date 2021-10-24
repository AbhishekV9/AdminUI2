import { useState } from 'react';

function TableRow(props){
    const {user,deleteUser,changeUserDetail}=props;

    const [editingMode,setEditingMode]=useState(false);
    const [name,setName]=useState(user.name);
    const [email,setEmail]=useState(user.email);
    const [role,setRole]=useState(user.role);

    const handleNameChange=(e)=>{
        console.log(e.target.value);
        setName(e.target.value);
    }

    const handleEmailChange=(e)=>{
        console.log(e.target.value);
        setEmail(e.target.value);
    }

    const handleRoleChnage=(e)=>{
        console.log(e.target.value);
        setRole(e.target.value);
    }

    const setEditModeTrue=()=>{
        setEditingMode(true);
    }

    const setEditModeFalse=()=>{
        setEditingMode(false);
    }
    
    return(
        <tr>
            <td>{editingMode ? <input value={name} onChange={handleNameChange}/>:user.name }</td>
            <td>{editingMode ? <input value={email} onChange={handleEmailChange} />:user.email}</td>
            <td>{editingMode ? <input value={role} onChange={handleRoleChnage}/>:user.role}</td>
            <td>
                {editingMode ?
                 <div>
                    <img  src="https://as1.ftcdn.net/v2/jpg/01/11/74/62/500_F_111746297_CVI90GwcVOhmYlMsNBxEWlmzUGvC0l33.jpg" onClick={()=>changeUserDetail(user.id,name,email,role)}alt="save"/>
                    <img src="https://as2.ftcdn.net/v2/jpg/01/80/70/79/500_F_180707917_IpgHK4fttaqN05pbBqNsXNlXY5az9VIH.jpg" onClick={()=>setEditModeFalse()} alt= "cancel"/>
                </div> 
                : 
                <div>
                    <img src="https://as1.ftcdn.net/v2/jpg/02/76/19/96/500_F_276199650_Hs5K3QnXm9ZMBLd3DT44YcdWUIf8GHxO.jpg" onClick={()=>deleteUser(user.id)} alt="delete" />
                    <img src="https://cdn-icons-png.flaticon.com/512/3597/3597075.png" onClick={()=>setEditModeTrue()} alt="edit" />
                </div>
                }
            </td>
    </tr>
    )
}

export default TableRow;