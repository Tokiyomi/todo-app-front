import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { Container ,Paper,Button, TableFooter} from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import TablePagination from '@mui/material/TablePagination';
import BasicPagination from './Apppagination';
import Pagination from '@mui/material/Pagination';
import Menu from '@mui/material/Menu';
import FilterListIcon from '@mui/icons-material/FilterList';
import ImportExportIcon from '@mui/icons-material/ImportExport';
//import Alert from '@mui/material/Alert';

import DenseTable from './Apptodotable';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

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
    const paperStyle={padding:'20px 20px', margin:'20px auto'}
    const [priority, setPriority] = React.useState('LOW');
    const [flag, setFlag] = React.useState('UNDONE');
    const [searchpriority, setSearchPriority] = React.useState('all');
    const [searchflag, setSearchFlag] = React.useState('all');
    const [searchcontent, setSearchContent] = React.useState('');
    //const [creationdate, setCreationDatetime] = React.useState(null);
    const [due_date, setDue_date] = React.useState(null);
    //const [donedate, setDoneDate] = React.useState(null);
    const[content,setContent]=React.useState('')
    const[todos,setTodo]=React.useState([])
    const [todosperpage, setTodosPerPage]=React.useState(10)
    //const [currentTodos, setCurrentTodos]=React.useState(0)

    const [timeAvg, setTimeAvg] = React.useState(0)
    const [lowTimeAvg, setLowTimeAvg] = React.useState(0)
    const [medTimeAvg, setMedTimeAvg] = React.useState(0)
    const [highTimeAvg, setHighTimeAvg] = React.useState(0)

    const [totalTodos, setTotalTodos] = React.useState(null)
    
    //const [getcontent, setGetContent] = React.useState('none')
    const [orden, setOrden]=React.useState('default')
    const [page, setPage]=React.useState(1)
    const [totalpages, setTotalPages]=React.useState(1)
    //const [getflag, setGetFlag] = React.useState('all')
    //const [getpriority, setGetPriority] = React.useState('all')

    //const [editId, setEditId] = React.useState(null)

    const handlePageChange = (event, page) => {
        setPage(page);
    };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {console.log("modal 1 open");setOpen(true);}
    const handleClose = () => {{setOpen(false); clearAddForm(); setContentError(false); setContentErrorMsg(null); setDue_date(null);setPriority('LOW')}};//reload();
    
    const [openEdit, setOpenEdit] = React.useState(false);
    const handleOpenEdit = () => {console.log("modal 2 open");setOpenEdit(true);}
    const handleCloseEdit = () => {{setOpenEdit(false);clearAddForm(); setContentError(false); setContentErrorMsg(null); setDue_date(null);setPriority('LOW')}};//reload();


    const [anchorEl, setAnchorEl] = React.useState(null);
    const openmenu = Boolean(anchorEl);
    const handleClickMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    //React.useEffect(() => {
        //fetchData();
    //}, [orden]);

    const [asc, setAsc] = React.useState(false)
    const handleClickArrow = () => {
        setAsc(!asc)
        //console.log(asc)
    }
    ;

    const [show, setShow] = React.useState(false)
    const showAll = () => {
        setSearchContent('');
        setSearchFlag('all');
        setSearchPriority('all');
        //fetchData();
        setShow(!show)
    };

    React.useEffect(() => {
        fetchData();
    }, [show,orden,asc,page]);

    const clearAddForm = () => {
        setContent('');
        //setFlag('a');
        setPriority('LOW');
        setDue_date(null);
        //fetchData();
        //setShow(!show)
    };

    const [contentError, setContentError] = React.useState(false);
    const [contentErrorMsg, setContentErrorMsg] = React.useState(null);

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

    const [idTodo, setIdTodo] = React.useState(null)

    const editTodo = (id) => {
        console.log('edit effect')
        const todo={content,priority,due_date}
        console.log(todo)
        axios
        .put('http://localhost:9090/todos/'+String(id),todo)
            .then(fetchData)
            .then(setContentError(false))
            .then(setContentErrorMsg(null))
            //.then(setPage)
            .catch(function (error) {
                console.error(error);
                setContentError(true);
                setContentErrorMsg(error.response.data['validation message']['Invalid content']);
              })
    };
    
    const handleClick2= (e)=>{
        e.preventDefault()
        //const creationdate = new Date()
        const todo={content,priority,flag,due_date}
        console.log(todo)
        axios
            .post('http://localhost:9090/todos',todo)
            .then(fetchData)
            .then(setContentError(false))
            .then(setContentErrorMsg(null))
            //.then(setPage)
            .catch(function (error) {
                console.error(error);
                setContentError(true);
                setContentErrorMsg(error.response.data['validation message']['Invalid content']);
              })
    }

    const handleDoneCheck = (id, status) => {
        console.log('check effect')
        const operation = status==="DONE"?"/undone":"/done"
        //setChecked(status=="DONE"?true:false)
        axios
            .put('http://localhost:9090/todos/'+String(id)+operation)
            .then(fetchData)
            .catch(function (error) {
                console.log('done error')
                console.error(error);
              })
    };


    const deleteTodo = (id) => {
        console.log('delete effect')
        axios
            .delete('http://localhost:9090/todos/'+String(id)+'/delete')
            .then(fetchData)
            .catch(function (error) {
                console.log('delete error')
                console.error(error);
              })
    };

    const fetchData = () => {
            console.log('effect')
            axios
              .get('http://localhost:9090/todos', 
              { params: 
              { orden: orden, 
                content:searchcontent, 
                page : page, 
                flag: searchflag, 
                priority:searchpriority, 
                asc:asc } }
                )
              .then(response => {
                console.log('promise fulfilled')
                //console.log(response.data.items)
                setTodo(response.data.items)
                console.log(response.data.totalPages)
                //setPage(response.data.totalPages)
                setTotalTodos(response.data.totalTodos)
                setTotalPages(response.data.totalPages)
                setTodosPerPage(response.data.todosPerPage)
              })
              .catch(function (error) {
                console.error(error);
              })
    }
    

    //React.useEffect(() => fetchData(), [todos]);

    const fetchAvg = () => {
        console.log('avg effect')
        axios
          .get('http://localhost:9090/todos/avg')
          .then(response => {
            console.log('avg promise fulfilled')
            //console.log(response.data.items)
            setTimeAvg(response.data["GLOBAL"])
            setLowTimeAvg(response.data["LOW"])
            setMedTimeAvg(response.data["MEDIUM"])
            setHighTimeAvg(response.data["HIGH"])
            //console.log(response.data.totalPages)
            //setPage(response.data.totalPages)
          })
          .catch(function (error) {
            console.error(error);
          })
    }

    React.useEffect(() => fetchAvg(), [todos]);

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
            
            <TextField size="small" id="outlined-basic" label="Find by name" variant="outlined" fullWidth 
            value={searchcontent}
            onChange={(e)=>setSearchContent(e.target.value)}/>
            
            <div style={{padding:'15px 0', textAlign:'left'}}>       
                <FormControl size="small" fullWidth>
                <InputLabel  id="demo-simple-select-readonly-label">Priority</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={searchpriority}
                label="Priority"
                //style={{height:'40px', fontSize:'15px'}}
                //onChange={handleChange_priority}
                onChange={(e)=>setSearchPriority(e.target.value)}
                >
                    <MenuItem value={"LOW"}>LOW</MenuItem>
                    <MenuItem value={"MEDIUM"}>MEDIUM</MenuItem>
                    <MenuItem value={"HIGH"}>HIGH</MenuItem>
                    <MenuItem value={"all"}>ALL</MenuItem>
                </Select>
                </FormControl>
            </div>         
            
            <div style={{padding:'0px 0px', textAlign:'left'}}>       
                <FormControl fullWidth size='small'>
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
                    <MenuItem value={"all"}>ALL</MenuItem>
                </Select>
                </FormControl>
            </div>   
            
            </LocalizationProvider>
            <Container style={{padding:'15px 0px 0px 0px', justifyContent:'space-around', display:'flex'}}>
            <Button size='small' variant="contained"  style={{}}
            onClick={
                fetchData
              }
            >Search Todo</Button>  
            <Button size='small' align="left" variant="contained"  onClick={showAll}>Show All</Button>         
            </Container>
        </Paper>

    <Container  style={{display:'flex', justifyContent:'space-between'}}>
        <div style={{margin:'0'}}>
        <Button size='small' align="left" variant="contained"  onClick={handleOpen}>+ Add Todo</Button>
        </div>

        <div>
      <Button variant="contained" size='small'
        id="basic-button"
        aria-controls={openmenu ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={openmenu ? 'true' : undefined}
        onClick={handleClickMenu}
      >
         Sort By <SortIcon size='small'></SortIcon>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openmenu}
        onClose={handleCloseMenu}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      > 
        <MenuItem onClick={() => {handleCloseMenu(); setOrden("default")}} >Unsort</MenuItem>
        <MenuItem onClick={() => {handleCloseMenu(); setOrden("priority")}} >Priority</MenuItem>
        <MenuItem onClick={() => {handleCloseMenu(); setOrden("due_date")}} >Due Date</MenuItem>
        <MenuItem onClick={() => {handleCloseMenu(); setOrden("priority-then-date")}} >Priority, Due Date</MenuItem>
        <MenuItem onClick={() => {handleCloseMenu(); setOrden("date-then-priority")}} >Due Date, Priority</MenuItem>
      </Menu>
    
        <IconButton
            onClick={handleClickArrow}>
            <ImportExportIcon></ImportExportIcon>
        </IconButton>
        </div>
        <p align="left">Sort view: {orden}</p>
        <p align='left'> Reversed order: {String(asc)}</p>
    </Container>


        {/*<p align="left">Total todos: {totalTodos}</p>*/}
        
        <Modal
            open={open}
            //onClose={clearAddForm}
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
            <Typography textAlign="center" id="modal-modal-description" sx={{ mt: 2 }}>
                Fill the form to add a new Todo task!
            </Typography>
            <Paper sx={{ my: 2 }} style={paperStyle}>
            {/*<h1 style={{color:"blue"}}>Add Todo</h1>*/}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            
            <TextField  id="outlined-basic" label="Todo name" variant="outlined" fullWidth 
            value={content} error={contentError} helperText={contentErrorMsg}
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
            
            <div style={{ textAlign:'left'}}>
                <DateTimePicker sx={{ my: 2 }}
                    renderInput={(params) => <TextField {...params} />} // sx={{width: '35%'}}
                    label="Due Date (Optional)"
                    //format="dd/MM/yyyy"
                    value={due_date}
                    onChange={(newValue) => {
                    setDue_date(new Date(newValue));
                    //setDueDate(newValue);
                    }}
                    //renderInput={(params) => <TextField {...params} helperText="Optional"/>}
                />
            </div>
            
            </LocalizationProvider>
            
            
            
            
        </Paper>
        <Container style={{ justifyContent:'space-around', display:'flex'}}>
        
            <Button variant="contained" 
            onClick={
                handleClick2
              }
            >Add New Todo</Button>
            <Button variant="contained" 
                                //onClick={editTodo}
                                onClick={clearAddForm}
                                >Clear</Button>
            
            </Container>   
        </Box>
        </Modal>

        <Modal
            //key={todo.id}
            open={openEdit}
            //onClose={clearAddForm}
            aria-labelledby="modal-modal-title2"
            aria-describedby="modal-modal-description2"
            >
            <Box sx={style} >
            <AppBar justify="flex-end" >
            <CloseIcon onClick={handleCloseEdit} />
            </AppBar>
            <Typography variant="h5" align="center">
            Edit this Todo
            </Typography>
            {/*<Typography id="modal-modal-title" variant="h4" component="h4">
                Add a new Todo
                </Typography>*/}
            <Typography id="modal-modal-description" textAlign="center" sx={{ mt: 2 }}>
                Fill the form to edit the Todo information!
            </Typography>
            <Paper sx={{ my: 2 }} style={paperStyle}>
            {/*<h1 style={{color:"blue"}}>Add Todo</h1>*/}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            
            <TextField id="outlined-basic" label="Todo name" variant="outlined" fullWidth 
            value={content} error={contentError} helperText={contentErrorMsg}
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
            
            <div style={{ textAlign:'left'}}>
                <DateTimePicker sx={{ my: 2 }}
                    renderInput={(params) => <TextField {...params} />} // sx={{width: '35%'}}
                    label="Due Date (Optional)"
                    //format="dd/MM/yyyy"
                    value={due_date}
                    onChange={(newValue) => {
                    setDue_date(new Date(newValue));
                    //setDueDate(newValue);
                    }}
                    //renderInput={(params) => <TextField {...params} helperText="Optional"/>}
                />
            </div>
            
            </LocalizationProvider>

            </Paper>
            <Container style={{ justifyContent:'space-around', display:'flex'}}>
                <Button variant="contained" 
                //onClick={editTodo}
                onClick={async() => {await editTodo(idTodo)}}
                >Edit Todo</Button>
                <Button variant="contained" 
                //onClick={editTodo}
                onClick={async() => {await clearAddForm()}}
                >Clear</Button>
                </Container>   
                </Box>
        </Modal>
        
        <TableContainer component={Paper} sx={{ my: 2}} style={{}}>
        <Table  size="small" aria-label="a dense table">  
            <TableHead
              //numSelected={selected.length}
              //order={order}
             // orderBy={orderBy}
              //onSelectAllClick={handleSelectAllClick}
              //onRequestSort={handleRequestSort}
              //rowCount={todos.length}
            >
            <TableRow>
                <TableCell>Status</TableCell>
                <TableCell >Todo Name</TableCell>
                <TableCell align="right"> 
                    Priority
                    {/*<IconButton><SortIcon/></IconButton>*/}
                </TableCell>
                <TableCell align="right">
                    Due Date
                    {/*<IconButton><SortIcon/></IconButton>*/}
                </TableCell>
                <TableCell align="right">Actions</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {todos.map((todo) => (
                <TableRow
                key={todo.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                style={todo.flag==="DONE"?{textDecoration:'line-through', }:{}}
                >
                <TableCell component="th" scope="row" onClick={async() => {await handleDoneCheck(todo.id, todo.flag)}}>
                    <Checkbox sx={{}} size='medium' checked={todo.flag==="DONE"?true:false}/>
                </TableCell>
                <TableCell>{todo.content}</TableCell>
                <TableCell align="right">{todo.priority}</TableCell>
                {/*<TableCell align="right">{todo.duedate}</TableCell>*/}
                <TableCell align="right">{todo.due_date}</TableCell>
                <TableCell align="right">
                    <IconButton  onClick={async() => {await 
                        handleOpenEdit(); 
                        setIdTodo(todo.id); 
                        setContent(todo.content);
                        setPriority(todo.priority);
                        setDue_date(todo.due_date);
                        }}>
                    <EditIcon/>
                    </IconButton>
                        
                    <IconButton  onClick={async() => {await deleteTodo(todo.id)}}>
                    <DeleteIcon/>
                    </IconButton>
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
            
            
            

        </Table>
        </TableContainer>
        <Container style={{ display: "flex", justifyContent: 'space-between' }}>
            Todos per page: {todosperpage}
            <Pagination count={totalpages} page={page} onChange={handlePageChange} />
            Showing {totalTodos!==0?((page-1)*todosperpage+1):0}-{(page*todosperpage)>totalTodos?totalTodos:(page*todosperpage)} of {totalTodos} todos
        </Container>
           

        
        <Paper component={Paper} sx={{ my: 2  }} style={{ display: "flex", justifyContent: "space-around" }}>
        <div style={{textAlign:'left'}}>
        <br/>Average time to finish tasks:<br/><br/><br/>
            {timeAvg.days} days, {timeAvg.hours} hours and {timeAvg.minutes} minutes
        </div>
        <div style={{textAlign:'center'}}>
        <br/>Average time to finish tasks by priority:<br/><br/>
            Low: {lowTimeAvg.days} days, {lowTimeAvg.hours} hours and {lowTimeAvg.minutes} minutes<br/>
            Medium: {medTimeAvg.days} days, {medTimeAvg.hours} hours and {medTimeAvg.minutes} minutes<br/>
            High: {highTimeAvg.days} days, {highTimeAvg.hours} hours and {highTimeAvg.minutes} minutes<br/><br/>
        </div>
    
        </Paper>
            





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