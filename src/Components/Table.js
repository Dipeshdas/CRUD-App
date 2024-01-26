import React,{useState,useEffect} from "react";
import { empData } from "../EmployeeData";


function Table() {
    const[data,setData]=useState([]);
    const[id,setId]=useState(0);
    const[ftName,setFtName]=useState('');
    const[ltName,setLtName]=useState('');
    const[age,setAge]=useState('');
    const[isUpdate,setIsUpdate]=useState(false);

    useEffect(()=>{
        setData(empData);
    },[])

    const onClickDelete=(idDel)=>{
        const dt=data.filter(item =>idDel!==item.id)
        setData(dt);
    }

    const onClickEdit=(idEdit)=>{
        setIsUpdate(true)
        const dt=data.filter(item=>item.id===idEdit);
        if(dt!==undefined){
            setId(idEdit)
            setFtName(dt[0].firstName)
            setLtName(dt[0].lastName)
            setAge(dt[0].age)
        }
    }

    const onClickClear=()=>{
        setId(0)
        setFtName('')
        setLtName('')
        setAge('')
        setIsUpdate(false);
    }

    const onClickSave=(e)=>{
        if(ftName!=='' && ltName!=='' && age!==''){
            e.preventDefault();
            const dt=[...data];
    
            const newObj={
                id:empData.length+1,
                firstName:ftName,
                lastName:ltName,
                age:age
            }
    
            dt.push(newObj);
            setData(dt);
    
            onClickClear()
        }
        

    }
    const onClickUpdate=()=>{
        const index=data.map((item)=>{
            return item.id
        }).indexOf(id);

        const dt=[...data];
        dt[index].firstName=ftName;
        dt[index].lastName=ltName;
        dt[index].age=age;

        setData(dt);
        onClickClear();
    }


  return (
    <div className="table">
        <div className="my-4">
            FirstName :
            <input className="mx-2" type="text" placeholder="Enter Your firstName" value={ftName} onChange={(e)=>setFtName(e.target.value)}/> 
            LastName :
            <input className="mx-2" type="text" placeholder="Enter Your lastName" value={ltName} onChange={(e)=>setLtName(e.target.value)}/>
            Age :
            <input className="mx-2" type="text" placeholder="Enter Your age" value={age} onChange={(e)=>setAge(e.target.value)}/>
            {
                !isUpdate ? <button className="btn-secondary mx-2" onClick={(e)=>onClickSave(e)}>Save</button> :
                <button className="btn-secondary mx-2" onClick={onClickUpdate}>Update</button> 
            }   
            
            <button className="btn-ternary" onClick={onClickClear}>Clear</button> 
        </div>
        
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Age</th>
                    <th scope="col">Operation</th>
                    {/* <th scope="col">Delete</th> */}
                </tr>
            </thead>
            <tbody>
            {
                data.map((item,index)=>{
                    return(
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{item.firstName}</td>
                            <td>{item.lastName}</td>
                            <td>{item.age}</td>
                            <td><button className="btn-primary mx-2" onClick={()=>onClickEdit(item.id)}>Edit</button>
                            <button className="btn-danger" onClick={()=>onClickDelete(item.id)}>Delete</button></td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    </div>
  );
}

export default Table;