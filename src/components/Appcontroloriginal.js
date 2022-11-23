import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { Container ,Paper,Button} from '@mui/material';

import axios from 'axios';


import InputLabel from '@mui/material/InputLabel';

import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';


import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import TodosList from './Apptodos';

export default function ControlBarOrigial() {
    const paperStyle={padding:'20px 20px', margin:"20px auto"}
    const [priority, setPriority] = React.useState('LOW');
    const [flag, setFlag] = React.useState('UNDONE');
    const [creationdate, setCreationDatetime] = React.useState(new Date());
    const [duedate, setDueDate] = React.useState(null);
    const [donedate, setDoneDate] = React.useState(null);
    const[content,setContent]=React.useState('')
    const[todos,setTodo]=React.useState([])
    //const[change,setChange]=React.useState(false)
    
    /*const handleChange_priority = (event) => {
        setPriority(event.target.value);
    };

    const handleChange_flag = (event) => {
        setFlag(event.target.value);
    };

    const handleChange_content = (event) => {
        setContent(event.target.value);
    };*/

    /*const handleClick=(e)=>{
        e.preventDefault()
        const todo={content,priority,flag,duedate,creationdate}
        console.log(todo)
        fetch("http://localhost:9090/todos",{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(todo)
    
      }).then(()=>{
        console.log("New todo added")
      })
    }*/
    
    /*React.useEffect(()=>{
      fetch("http://localhost:9090/todos", {
        method:"GET"
      })
      .then(res=>res.json())
      .then((result)=>{ setTodo(result);
      }
    )
    },[])*/
    
    const handleClick2= (e)=>{
        e.preventDefault()
        const todo={content,priority,flag,duedate,creationdate}
        console.log(todo)
        axios
            .post('http://localhost:9090/todos',todo)
            .then(fetchData)
            //.then(response => todo.innerHTML = response.data.id )
        /*fetch("http://localhost:9090/todos",{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(todo)
    
      }).then(()=>{
        console.log("New todo added")
      })*/
    }

    const fetchData = () => {
            //e.preventDefault()
        //React.useEffect(() => {
            console.log('effect')
            axios
              .get('http://localhost:9090/todos')
              .then(response => {
                console.log('promise fulfilled')
                setTodo(response.data)
              })
        //}, [])
    }
    

    React.useEffect(() => fetchData(), []);

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

    return (
        <Container>
        <Paper sx={{ my: 2 }} style={paperStyle}>
            <h1 style={{color:"blue"}}>Add Todo</h1>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            
            <TextField id="outlined-basic" label="Todo name" variant="outlined" fullWidth 
            value={content}
            onChange={(e)=>setContent(e.target.value)}/>
            
            <div style={{padding:'15px 0px', textAlign:'left'}}>       
                <FormControl fullWidth>
                <InputLabel id="demo-simple-select-readonly-label">Priority</InputLabel>
                <Select
                //style={{ marginTop: 18}}
                //renderInput={(params) => <TextField {...params} sx={{width: '50%'}} /> }
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={priority}
                label="Priority"
                //onChange={handleChange_priority}
                onChange={(e)=>setPriority(e.target.value)}
                >
                    <MenuItem value={"LOW"}>LOW</MenuItem>
                    <MenuItem value={"MEDIUM"}>MEDIUM</MenuItem>
                    <MenuItem value={"HIGH"}>HIGH</MenuItem>
                </Select>
                </FormControl>
            </div>         
            {/*<div style={{padding:'8px 0px', textAlign:'left'}}>
                <DesktopDatePicker
                label="Creation Date"
                disabled
                readOnly
                value={creationdate}
                onChange={(newValue) => {
                    setCreationDatetime(newValue);
                }}
                renderInput={(params) => <TextField {...params} /> } // sx={{width: '35%'}}
                />
            </div>*/}
            <div style={{padding:'8px 0px', textAlign:'left'}}>
                <DateTimePicker sx={{ my: 2 }}
                    renderInput={(params) => <TextField {...params} />} // sx={{width: '35%'}}
                    label="Due Date (Optional)"
                    //format="dd/MM/yyyy"
                    value={duedate}
                    onChange={(newValue) => {
                    setDueDate(new Date(newValue).toUTCString());
                    }}
                    //renderInput={(params) => <TextField {...params} helperText="Optional"/>}
                />
            </div>
            {/*<div style={{padding:'15px 0px', textAlign:'left'}}>
            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-readonly-label">Status</InputLabel>
            <Select 
                labelId="demo-simple-select-label-2"
                id="demo-simple-select-2"
                value={flag}
                label="Status"
                //onChange={handleChange_flag}
                onChange={(e)=>setFlag(e.target.value)}
            >
                <MenuItem value={"UNDONE"}>UNDONE</MenuItem>
                <MenuItem value={"DONE"}>DONE</MenuItem>
            </Select>
            </FormControl>
            </div>
            <div style={{padding:'8px 0px', textAlign:'left'}}>
            <DateTimePicker
            label="Done Date"
            disabled
            value={donedate}
            onChange={(newValue) => {
                setDoneDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
            />
        </div>*/}
            </LocalizationProvider>
            <div style={{padding:'15px 0px'}}>
            <Button variant="contained" 
            onClick={
                handleClick2
              }
            >Add New Todo</Button>           
            </div>
        </Paper> 
        <Paper style={{padding:'20px 20px', width:600,margin:"20px auto"}}>
        <h1>Todo's List</h1>

        

        {todos.map(todo=>(
            <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} key={todo.id}>
            Id:{todo.id}<br/>
            Content:{todo.content}<br/>
            Done:{todo.flag}<br/>
            Priority:{todo.priority}<br/>
            Creation Date:{todo.creation_date}<br/>
            Due Date:{todo.due_date}<br/>
            Due Date:{duedate}<br/>
            Done Date:{todo.done_date}

            </Paper>
        
        ))
    }


        
</Paper>
        </Container>
    );
  }