import React, { useState ,useEffect }from 'react'
import axios from 'axios'
import Card from './components/Card'

const App = () => {

 const [userData,setUserData]=useState([]);
 const [index,setIndex]=useState(1)
 

  const getData = async () => {
    try{
      const response = await axios.get(`https://picsum.photos/v2/list?page=${index}&limit=10`)
      // The actual response payload is on `response.data`.
      
      setUserData(response.data)
      console.log(response.data)
    }catch (err){
      console.log(err)
    }
   
  }
 useEffect (function(){
  getData()
 },[index])

  let printUserData=<h3 className='text-gray-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl font-semibold'>Loading....</h3>

  if(userData.length>0){
    printUserData=userData.map(function(elem,idx){
      return <div key={idx}>

      <Card elem={elem}/>
      </div>
    })
  }
  return (
    <div className='bg-black h-screen p-4 text-white overflow-auto'>
      <div className='flex flex-wrap gap-5 '>
        {printUserData}
      </div>
      <div className='flex  justify-center p-10 items-center gap-10'>
        <button style={{opacity:index==1?0.6:1}} className='text-sm font-bold px-4  rounded-xl py-3 cursor-pointer active:scale-95 bg-amber-300 text-black'
          onClick={()=>{
            if(index>1){
              setIndex(index-1)
              setUserData([])
            }
          }}>
          Prev</button>
        <h3>Page {index}</h3>
        <button className='text-sm font-bold px-4 rounded-xl py-3 bg-amber-300  cursor-pointer active:scale-95 text-black'
          onClick={()=>{
          
              setIndex(index+1)
              setUserData([])
            
          }}>
          Next</button>

      </div>
    </div>
  )
}

export default App