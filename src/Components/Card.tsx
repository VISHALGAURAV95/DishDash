import React from 'react'

function Card() {
  return (
    <div className="max-w-60 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-5 ml-3  max-h-90">
    <a href="#">
        <img className="rounded-t-lg" src="https://images.pexels.com/photos/9609835/pexels-photo-9609835.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
    </a>
    <div className="p-5">
        
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Card title</h5>
        
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">this is some important text </p>
        <div className="container w-100">
          <select className="m-2 h-100   bg-success rounded">
            {Array.from(Array(6),(e,i)=>{
              return(
                <option key={i+1} value={i+1}>{i+1}</option>
              )
            })}
               
            </select>
            <select className="m-2 h-100   bg-success rounded">
              <option value={"half"}>half</option>
              <option value={"full"}>full</option>
            </select>
            <div className="inline font-normal text-gray-700 dark:text-white"> Total Price </div>
        </div>
      
    </div>
</div>

  )
}

export default Card
