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

  const handleFile = file =>{z
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
    <div className='bg-white min-h-screen flex flex-col items-stretch justify-stretch'>
      <div className = 'flex-[3] bg-gray-100 flex justify-center items-end'>
        <h1 className='m-5 text-6xl font-bold'>Article Evaluator</h1>
      </div>
      <div className = 'flex flex-[4] bg-gray-100 items-center flex-col justify-start'>
        <input type="file" name="file" onChange={handleChange} ref={hiddenFileInput} className='hidden'/>
        <button onClick={handleClick} className="bg-green-100 hover:bg-green-200 shadow-lg h-16 w-36 rounded-lg m-4">
          <h1 className='text-xl font-light'>{isloading?"Processing":"Upload File"}</h1>
        </button>
        <h1>{uploadedFile?uploadedFile.name:""}</h1>
      </div>
      <div className='flex flex-row flex-[10] bg-gray-100  justify-between p-8'>
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
