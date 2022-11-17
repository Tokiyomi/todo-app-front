import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Container ,Paper,Button} from '@mui/material';

export default function Student() {
    const paperStyle={padding:'50px 20px', width:600,margin:"20px auto"}
    const[content,setName]=useState('')
    const[priority,setAddress]=useState('')
    const[students,setStudents]=useState([])

  const handleClick=(e)=>{
    e.preventDefault()
    const student={content,priority}
    console.log(student)
    fetch("http://localhost:9090/todos",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(student)

  }).then(()=>{
    console.log("New Student added")
  })
}

useEffect(()=>{
  fetch("http://localhost:9090/todos", {
    method:"GET"
  })
  .then(res=>res.json())
  .then((result)=>{ setStudents(result);
  }
)
},[])
  return (

    <Container>
        <Paper elevation={3} style={paperStyle}>
            <h1 style={{color:"blue"}}><u>Add Student</u></h1>

    <form noValidate autoComplete="off">
    
      <TextField id="outlined-basic" label="Student Name" variant="outlined" fullWidth 
      value={content}
      onChange={(e)=>setName(e.target.value)}
      />
      <TextField id="outlined-basic" label="Student Adress" variant="outlined" fullWidth
      value={priority}
      onChange={(e)=>setAddress(e.target.value)}
      />
      <Button variant="contained" color="secondary" onClick={handleClick}>
  Submit
</Button>
    </form>
   
    </Paper>
    <h1>Students</h1>

    <Paper elevation={3} style={paperStyle}>

      {students.map(student=>(
        <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} key={student.id}>
         Id:{student.id}<br/>
         Content:{student.content}<br/>
         Done:{student.flag}<br/>
         Priority:{student.priority}<br/>
         Creation Date:{student.creation_date}<br/>
         Due Date:{student.due_date}<br/>
         Done Date:{student.done_date}

        </Paper>
      ))
}


    </Paper>



    </Container>
  );
}