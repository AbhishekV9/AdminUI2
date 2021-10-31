import { useState } from 'react';

function TableRow(props){

    const {user,deleteUser,changeUserDetail,arr}=props;

    //local states
    const [editingMode,setEditingMode]=useState(false);
    const [name,setName]=useState(user.name);
    const [email,setEmail]=useState(user.email);
    const [role,setRole]=useState(user.role);

    //function to handle to change in name
    const handleNameChange=(e)=>{
        setName(e.target.value);
    }

    //function to handle to change in email
    const handleEmailChange=(e)=>{
        setEmail(e.target.value);
    }

    //function to handle to change in role
    const handleRoleChnage=(e)=>{
        setRole(e.target.value);
    }

    //setting edit mode to true
    const setEditModeTrue=()=>{
        setEditingMode(true);
    }

    //setting edit mode to false
    const setEditModeFalse=()=>{
        setEditingMode(false);
    }

    const addRow=()=>{
        if(arr.includes(user.id)){
            const index=arr.indexOf(user.id);
            console.log(index);
            arr.splice(index, 1);
            console.log(arr);
            return;
        }
        arr.push(user.id);
        console.log(arr);
    }
    
    return(
        <tr >
            <td className="checkBox"><input type="checkbox" onClick={addRow}/></td>
            <td>{editingMode ? <input value={name} onChange={handleNameChange}/>:user.name }</td>
            <td>{editingMode ? <input value={email} onChange={handleEmailChange} />:user.email}</td>
            <td>{editingMode ? <input value={role} onChange={handleRoleChnage}/>:user.role}</td>
            <td>
                {editingMode ?
                 <div className="f_se">
                    <div>
                        <img  src="https://as1.ftcdn.net/v2/jpg/01/11/74/62/500_F_111746297_CVI90GwcVOhmYlMsNBxEWlmzUGvC0l33.jpg" onClick={()=> { changeUserDetail(user.id,name,email,role); setEditModeFalse(); }}alt="save"/>
                    </div>
                    <div>
                        <img src="https://as2.ftcdn.net/v2/jpg/01/80/70/79/500_F_180707917_IpgHK4fttaqN05pbBqNsXNlXY5az9VIH.jpg" onClick={()=>setEditModeFalse()} alt= "cancel"/>
                    </div>                   
                </div> 
                : 
                <div className="f_se">
                    <div>
                        <img src="https://as1.ftcdn.net/v2/jpg/02/76/19/96/500_F_276199650_Hs5K3QnXm9ZMBLd3DT44YcdWUIf8GHxO.jpg" onClick={()=>deleteUser(user.id)} alt="delete" />
                    </div>
                    <div>
                        <img src="https://cdn-icons-png.flaticon.com/512/3597/3597075.png" onClick={()=>setEditModeTrue()} alt="edit" />
                    </div>            
                </div>
                }
            </td>
    </tr>
    )
}

export default TableRow;