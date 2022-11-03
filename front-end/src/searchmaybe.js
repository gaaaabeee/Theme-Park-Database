import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import {createAPIEndpoint,ENDPOINTS} from './api';

function Search(){
   // const { id } = useParams()
    const [employee, setEmployee] = useState(null);

    let content = null

   useEffect(() => {
    createAPIEndpoint(ENDPOINTS.employee)
    .then(response => {
        setEmployee(response.data)

    })
   }, [url])

   if(employee){
    return(
        content =
        <div> 
            <h1 className="text-xl font-bold mb-3">
                {employee.fname} 
            </h1>
        
        <div> 
        <h1 className="text-xl font-bold mb-3">
            {employee.lname} 
        </h1>
    </div>
    <div> 
    <h1 className="text-xl font-bold mb-3">
        {employee.employee_id} 
    </h1>
</div>
<div> 
            <h1 className="text-xl font-bold mb-3">
                {employee.dob} 
            </h1>
        </div>
        <div> 
        <h1 className="text-xl font-bold mb-3">
            {employee.supervisor_id} 
        </h1>
    </div>
    <div> 
    <h1 className="text-xl font-bold mb-3">
        {employee.job_title} 
    </h1>
</div>
</div>
    )   
   }
   return (
    <div> 
       {content}
        </div>
   )
    
       
    
    
}

export default Search