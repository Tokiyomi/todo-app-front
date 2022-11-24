import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { Container ,Paper,Button, TableFooter} from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import TablePagination from '@mui/material/TablePagination';
import BasicPagination from './Apppagination';

import DenseTable from './Apptodotable';

import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import AppBar from '@mui/material/AppBar';

import axios from 'axios';


import InputLabel from '@mui/material/InputLabel';

import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';


import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';

export default function ControlBarOrigial() {
    const paperStyle={padding:'20px 20px', margin:"20px auto"}
    const [priority, setPriority] = React.useState('LOW');
    const [flag, setFlag] = React.useState('UNDONE');
    const [searchpriority, setSearchPriority] = React.useState('ALL');
    const [searchflag, setSearchFlag] = React.useState('ALL');
    const [searchcontent, setSearchContent] = React.useState('');
    const [creationdate, setCreationDatetime] = React.useState(new Date());
    const [duedate, setDueDate] = React.useState(null);
    const [donedate, setDoneDate] = React.useState(null);
    const[content,setContent]=React.useState('')
    const[todos,setTodo]=React.useState([])

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {setOpen(false)};//reload(); 

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
    
    const handleClick2= (e)=>{
        e.preventDefault()
        const todo={content,priority,flag,duedate,creationdate}
        console.log(todo)
        axios
            .post('http://localhost:9090/todos',todo)
            .then(fetchData)
    }

    const fetchData = () => {
            console.log('effect')
            axios
              .get('http://localhost:9090/todos')
              .then(response => {
                console.log('promise fulfilled')
                setTodo(response.data)
              })
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
        <Paper sx={{ my: 2, maxWidth: 750  }} style={paperStyle} >
            {/*<h1 style={{color:"blue"}}>Search Todo</h1>*/}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            
            <TextField id="outlined-basic" label="Find by name" variant="outlined" fullWidth 
            value={searchcontent}
            onChange={(e)=>setSearchContent(e.target.value)}/>
            
            <div style={{padding:'15px 0px', textAlign:'left'}}>       
                <FormControl fullWidth>
                <InputLabel id="demo-simple-select-readonly-label">Priority</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={searchpriority}
                label="Priority"
                //onChange={handleChange_priority}
                onChange={(e)=>setSearchPriority(e.target.value)}
                >
                    <MenuItem value={"LOW"}>LOW</MenuItem>
                    <MenuItem value={"MEDIUM"}>MEDIUM</MenuItem>
                    <MenuItem value={"HIGH"}>HIGH</MenuItem>
                    <MenuItem value={"ALL"}>ALL</MenuItem>
                </Select>
                </FormControl>
            </div>         
            
            <div style={{padding:'15px 0px', textAlign:'left'}}>       
                <FormControl fullWidth>
                <InputLabel id="demo-simple-select-readonly-label">State</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={searchflag}
                label="Priority"
                //onChange={handleChange_priority}
                onChange={(e)=>setSearchFlag(e.target.value)}
                >
                    <MenuItem value={"DONE"}>DONE</MenuItem>
                    <MenuItem value={"UNDONE"}>UNDONE</MenuItem>
                    <MenuItem value={"ALL"}>ALL</MenuItem>
                </Select>
                </FormControl>
            </div>   
            
            </LocalizationProvider>
            <div style={{padding:'15px 0px'}}>
            <Button variant="contained" 
            onClick={
                fetchData
              }
            >Search Todo</Button>           
            </div>
        </Paper>
        <Button align="left" variant="contained"  onClick={handleOpen}>+ Add Todo</Button>
        <Button align="left" variant="contained"  onClick={fetchData}>Clear All</Button>
        <p align="left">Total todos: {todos.length}</p>
        <Modal
            open={open}
            //onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} >
            <AppBar justify="flex-end" >
            <CloseIcon onClick={handleClose} />
            </AppBar>
            <Typography variant="h5" align="center">
            Add a new Todo
            </Typography>
            {/*<Typography id="modal-modal-title" variant="h4" component="h4">
                Add a new Todo
                </Typography>*/}
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Fill the form to add a new todo task!
            </Typography>
            <Paper sx={{ my: 2 }} style={paperStyle}>
            {/*<h1 style={{color:"blue"}}>Add Todo</h1>*/}
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
            
            <div style={{padding:'8px 0px', textAlign:'left'}}>
                <DateTimePicker sx={{ my: 2 }}
                    renderInput={(params) => <TextField {...params} />} // sx={{width: '35%'}}
                    label="Due Date (Optional)"
                    //format="dd/MM/yyyy"
                    value={duedate}
                    onChange={(newValue) => {
                    setDueDate(new Date(newValue));
                    }}
                    //renderInput={(params) => <TextField {...params} helperText="Optional"/>}
                />
            </div>
            
            </LocalizationProvider>
            
            
            
            
        </Paper>
        <Box textAlign='center' style={{padding:'15px 0px'}}>
            <Button variant="contained" 
            onClick={
                handleClick2
              }
            >Add New Todo</Button>
            </Box>   
            </Box>
        </Modal>
        
        <TableContainer component={Paper} sx={{ my: 2 }}>
        <Table  >  
            <TableHead
              //numSelected={selected.length}
              //order={order}
             // orderBy={orderBy}
              //onSelectAllClick={handleSelectAllClick}
              //onRequestSort={handleRequestSort}
              rowCount={todos.length}
            >
            <TableRow>
                <TableCell>Check</TableCell>
                <TableCell >Todo Name</TableCell>
                <TableCell align="right"> 
                    Priority
                    <IconButton><SortIcon/></IconButton>
                </TableCell>
                <TableCell align="right">
                    Due Date
                    <IconButton><SortIcon/></IconButton>
                </TableCell>
                <TableCell align="right">Actions</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {todos.map((todo) => (
                <TableRow
                key={todo.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row">
                    <Checkbox />
                </TableCell>
                <TableCell>{todo.content}</TableCell>
                <TableCell align="right">{todo.priority}</TableCell>
                <TableCell align="right">{todo.due_date}</TableCell>
                <TableCell align="right">
                    <IconButton>
                    <EditIcon/>
                    </IconButton>
                    <IconButton>
                    <DeleteIcon/>
                    </IconButton>
                </TableCell>
                </TableRow>
            ))}
            </TableBody>

            

        </Table>
        </TableContainer>
        <BasicPagination ></BasicPagination>
            





        {/*<Paper style={{padding:'20px 20px', width:600,margin:"20px auto"}}>
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


        
</Paper>*/}
        </Container>
    );
  }