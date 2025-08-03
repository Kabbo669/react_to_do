import React, { useEffect, useState } from 'react'
import { DNA } from 'react-loader-spinner'
import { getDatabase, push, ref, set,  onValue, remove } from "firebase/database";

const App = () => {
 const db = getDatabase();


  let [input, setInput] = useState("")
  // let [array, setArray] = useState([])
  let [loader, setLoader] = useState(false)
  let [allData, setAllData] = useState([])
  let [updateButton, setUpdateButton] = useState(false)
  let [storeId, setStoreId] = useState("")
  


  let handleChange=(event)=>{
    setInput(event.target.value)
    // console.log(event.target.value);
  }

 let handleToDo=()=>{
  setLoader(true)
   set(push(ref(db, 'Data/')), {
    username: input,
  }).then(()=>{
    setInput("")
    setLoader(false)
  })
 }

 useEffect(()=>{
  
 const starCountRef = ref(db, 'Data/');
  onValue(starCountRef, (snapshot) => {
  let array =[]
  snapshot.forEach(item=>{
  array.push({...item.val(), id: item.key});
 })
  setAllData(array)
});
 },[]) 
//  console.log(allData);


let handleDelete=(item)=>{
  remove(ref(db, 'Data/' + item.id))
  // console.log(item.id);
}

let handleEdit=(item)=>{
  // console.log(item.username);
  // console.log(item.id);

  setStoreId(item.id)
  setInput(item.username)
  setUpdateButton(true)
}

let handleUpdate=()=>{
   setLoader(true)
   set(ref(db, 'Data/' + storeId), {
   username: input,
  }).then(()=>{
    setInput("")
    setLoader(false)
    setUpdateButton(false)
  })
}
 

  return (
    <section className='main'>
      <>
    <div className='design'>
      <input onChange={handleChange} value={input} type="text" />
     {
      updateButton
      ?
      <button onClick={handleUpdate}>Update</button>
      :
      loader
      ?
      <div className='loader'>
      <DNA
      visible={true}
      height="40"
      width="40"
      ariaLabel="dna-loading"
      wrapperStyle={{}}
      wrapperClass="dna-wrapper"
     />
      </div>
      :
      <button onClick={handleToDo}>Add-To-Do</button>
     }
     
    </div>
     <ol className='list'>
      {
        allData.map((item,index)=>(
          <li className='to-do-item'><span className='todo-text'>{item.username}</span>
          <div className='btn-group'>
          <button onClick={()=>handleDelete(item)} className='delete-btn'>Delete</button>
          <button onClick={()=>handleEdit(item)} className='edit-btn'>Edit</button>
          </div>
          </li>
        ))
      }
     </ol>
      
    </>
    </section>
  )
}

export default App