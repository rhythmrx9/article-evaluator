import './App.css';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';

function App() {
  const [uploadedFile, setuploadedFile] = useState(null)
  const [grades, setgrades] = useState(null)
  const [isloading, setloading] = useState(null)


  const hiddenFileInput = React.useRef(null);
  const handleClick = event => {
    hiddenFileInput.current.click();
  }

  const handleFile = file =>{
    setloading(true)
    axios.post('/getgrades', file).then((res)=>{
      if (res.data){
        console.log(res.data)
        setgrades(res.data)
        setloading(false)
      }
    })

    setloading(false)
  }

  const handleChange = event =>{
    const fileUploaded = event.target.files
    setuploadedFile(fileUploaded)
    handleFile(uploadedFile)
    
  }


  return (
    <div className ="h-full">
      <nav className="flex flex-[10] justify-end px-0">
           
    <ul className="flex justify-end">
        
       <a href="https://github.com/rhythmrx9/article-evaluator"target="_blank" ><img src={require('./git-logo-fotor-bg-remover-20230507121235.png')} className="w-24 "  alt=""/></a>
    </ul>
</nav>
    <div className='bg-white  flex flex-col items-stretch justify-stretch'>
    <div className="flex flex-col h-[20rem] justify-end items-center bg-white ">
      <img className="w-24 h-24" src={require('./ullu.png')} alt=""/>
      <h1 className="text-3xl text-gray-500" ><span className=" text-3xl  ">ARTICL</span><span className="text-5xl font-extrabold font-mono text-black">E</span>VALUATER</h1>
      </div>   
      <div className="flex flex-row h-[4rem] justify-center items-center bg-white">
    
<h1 className="text-gray-300 font-medium text-lg">"Better insights for a better world, through trusted article evaluation."</h1>

</div>        
      

    <div className = 'flex flex-[4] bg-white items-center flex-col justify-start'>
    <input type="file" name="file" onChange={handleChange} ref={hiddenFileInput} className='hidden'/>
       
    <button onClick={handleClick} className="bg-white rounded-lg px-12 py-3 border border-gray-400 hover:bg-slate-300 active:bg-slate-500 ">
    <h1 className='text-xl font-light'>{isloading?"Processing":"Upload File"}</h1></button>
    
       
            
</div>
        <h1>{uploadedFile?uploadedFile.name:""}</h1>
      </div>
      <div className='flex flex-row flex-[8] justify-between p-8'>
        <div className= 'flex-col flex  items-center'>
          <h1 className='text-4xl'>{grades?"cohesion":""}</h1>
          <h1 className='text-2xl font-light'>{grades?grades.cohesion:""} </h1>
        </div>
        <div className= 'flex-col flex  items-center'>
          <h1 className='text-4xl'>{grades?"conventions":""}</h1>
          <h1 className='text-2xl font-light'>{grades?grades.conventions:""} </h1>
        </div>
        <div className= 'flex-col flex  items-center'>
          <h1 className='text-4xl'>{grades?"grammar":""}</h1>
          <h1 className='text-2xl font-light'>{grades?grades.grammar:""} </h1>
        </div>
        <div className= 'flex-col flex  items-center'>
          <h1 className='text-4xl'>{grades?"phraseology":""}</h1>
          <h1 className='text-2xl font-light'>{grades?grades.phraseology:""} </h1>
        </div>
        <div className= 'flex-col flex  items-center'>
          <h1 className='text-4xl'>{grades?"syntax":""}</h1>
          <h1 className='text-2xl font-light'>{grades?grades.syntax:""} </h1>
        </div>
        <div className= 'flex-col flex  items-center'>
          <h1 className='text-4xl'>{grades?"vocabulary":""}</h1>
          <h1 className='text-2xl font-light'>{grades?grades.vocabulary:""} </h1>
        </div>
      </div>
    </div>
  );
}

export default App;
