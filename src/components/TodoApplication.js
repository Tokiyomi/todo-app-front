// useful imports
import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { Container ,Paper,Button} from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import Pagination from '@mui/material/Pagination';
import Menu from '@mui/material/Menu';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import ClearIcon from '@mui/icons-material/Clear';
import AppBar from '@mui/material/AppBar';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import { styled } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

export default function TodoApplication() {

    // Styles
    const style = { // Modal style
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

    const paperStyle={ // Paper style
        padding:'20px 20px', 
        margin:'20px auto'
    };

    const Item = styled(Paper)(({ theme }) => ({ // Table items style 
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

    // Todo properties initial states
    const [idTodo, setIdTodo] = React.useState(null)
    const [priority, setPriority] = React.useState('LOW');
    const [flag, setFlag] = React.useState('UNDONE');
    const [due_date, setDue_date] = React.useState(null);
    const[content,setContent]=React.useState('')

    // Todos list
    const[todos,setTodo]=React.useState([]) 

    // Todos filter and ascending order arrows
    const [orden, setOrden]=React.useState('default')
    const [asc, setAsc] = React.useState(false)

    const handleClickArrow = () => {
        setAsc(!asc) // ascending or descending order button activation  
    };

    // Sort by menu
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openmenu = Boolean(anchorEl);
    
    const handleClickMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };
    

    // Pagination 
    const [todosperpage, setTodosPerPage]=React.useState(10)
    const [totalTodos, setTotalTodos] = React.useState(0)
    const [totalpages, setTotalPages]=React.useState(1)
    const [page, setPage]=React.useState(1)

    const handlePageChange = (event, page) => {
        setPage(page);
    };

    // Search control variables
    const [searchpriority, setSearchPriority] = React.useState('all');
    const [searchflag, setSearchFlag] = React.useState('all');
    const [searchcontent, setSearchContent] = React.useState('');

    const [show, setShow] = React.useState(false)
    const showAll = () => {
        setAsc(false)
        setSearchContent('');
        setSearchFlag('all');
        setSearchPriority('all');
        setShow(!show)
    };
    
    // Priority Finish Time Average states
    const [timeAvg, setTimeAvg] = React.useState(0)
    const [lowTimeAvg, setLowTimeAvg] = React.useState(0)
    const [medTimeAvg, setMedTimeAvg] = React.useState(0)
    const [highTimeAvg, setHighTimeAvg] = React.useState(0)


    // Add new todo - Modal
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {console.log("modal add todo open");setOpen(true);}
    const handleClose = () => {{setOpen(false); clearAddForm(); setContentError(false); setContentErrorMsg(null); setDue_date(null);setPriority('LOW')}};//reload();
    
    const clearAddForm = () => { // When clicked, restore modal form to default values
        setContent('');
        setPriority('LOW');
        setDue_date(null);  
    };

    const [contentError, setContentError] = React.useState(false);
    const [contentErrorMsg, setContentErrorMsg] = React.useState(null);

    // Edit todo - Modal
    const [openEdit, setOpenEdit] = React.useState(false);
    const handleOpenEdit = () => {console.log("modal edit todo open");setOpenEdit(true);}
    const handleCloseEdit = () => {{setOpenEdit(false);clearAddForm(); setContentError(false); setContentErrorMsg(null); setDue_date(null);setPriority('LOW')}};//reload();

    
    // Rendering todos list each time the show, sort, asc and/or page buttons are re-rendered
    React.useEffect(() => {
        fetchData();
    }, [show,asc,orden,page]);

    
    // CONTROLLER REQUESTS

    // PUT - EDIT
    const editTodo = (id) => { 
        console.log('edit effect')
        const todo={content,priority,due_date}
        console.log(todo)
        axios
        .put('http://localhost:9090/todos/'+String(id),todo)
            .then(fetchData)
            .then(setContentError(false))
            .then(setContentErrorMsg(null))
            .catch(function (error) {
                console.error(error);
                setContentError(true);
                setContentErrorMsg(error.response.data['validation message']['Invalid content']);
              })
    };
    
    // POST - NEW TODO
    const addNewTodo= (e)=>{
        e.preventDefault()
        const todo={content,priority,flag,due_date}
        console.log(todo)
        axios
            .post('http://localhost:9090/todos',todo)
            .then(fetchData)
            .then(setContentError(false))
            .then(setContentErrorMsg(null))
            .catch(function (error) {
                console.error(error);
                setContentError(true);
                setContentErrorMsg(error.response.data['validation message']['Invalid content']);
              })
    }

    // PUT - DONE/UNDONE 
    const handleDoneCheck = (id, status) => {
        console.log('status flag effect')
        const operation = status==="DONE"?"/undone":"/done"
        //setChecked(status=="DONE"?true:false)
        axios
            .put('http://localhost:9090/todos/'+String(id)+operation)
            .then(setAsc(false))
            .then(fetchData)
            .catch(function (error) {
                console.log('done error')
                console.error(error);
              })
    };

    // DELETE TODO
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

    // GET - SHOW TODO SELECTED PAGE
    const fetchData = () => {
            
            console.log(asc)
            console.log('get effect')
            axios
              .get('http://localhost:9090/todos', 
              { params: 
              { orden: orden, 
                content:searchcontent.toLowerCase(), 
                page : page, 
                flag: searchflag, 
                priority:searchpriority, 
                asc:asc } }
                )
              .then(response => {
                //console.log('get promise fulfilled')
                setTodo(response.data.items)
                console.log(response.request.responseURL)
                //console.log(response.data.totalPages)
                setTotalTodos(response.data.totalTodos)
                setTotalPages(response.data.totalPages)
                setTodosPerPage(response.data.todosPerPage)
              })
              .catch(function (error) {
                console.error(error);
              })
    }
    

    // GET - Average finish time for each priority group
    const fetchAvg = () => {
        console.log('avg effect')
        axios
          .get('http://localhost:9090/todos/avg')
          .then(response => {
            console.log('avg promise fulfilled')
            setTimeAvg(response.data["GLOBAL"])
            setLowTimeAvg(response.data["LOW"])
            setMedTimeAvg(response.data["MEDIUM"])
            setHighTimeAvg(response.data["HIGH"])
          })
          .catch(function (error) {
            console.error(error);
          })
    }

    // GET average effect will be performed each time the todos list is re-rendered
    React.useEffect(() => fetchAvg(), [todos]);

    
    return (
        <Container>

        {/* Search Control Bar */}

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
            onClick={() => {fetchData(); setPage(1)}
                
              }
            >Search Todo</Button>  
            <Button size='small' align="left" variant="contained"  onClick={() => {showAll(); setPage(1)}}>Show All</Button>         
            </Container>
        </Paper>

    {/* Sorting view */}

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
            onClick={handleClickArrow}
            >
            <ImportExportIcon></ImportExportIcon>
        </IconButton>
        </div>
        <p align="left">Sort view: {orden}</p>
        <p align='left'> Reversed order: {String(asc)}</p>
    </Container>


        {/*Add new todo Modal*/}
        
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
                <IconButton  onClick={async() => {await setDue_date(null)}} style={{margin:'8px 5px'}}>
                    <ClearIcon></ClearIcon>
                 </IconButton>
            </div>
            
            
            </LocalizationProvider>
            
            
            
            
        </Paper>
        <Container style={{ justifyContent:'space-around', display:'flex'}}>
        
            <Button variant="contained" 
            onClick={
                addNewTodo
              }
            >Add New Todo</Button>
            <Button variant="contained" 
                                //onClick={editTodo}
                                onClick={clearAddForm}
                                >Clear</Button>
            
            </Container>   
        </Box>
        </Modal>

    {/* Edit Todo Modal */}
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
                <IconButton  onClick={async() => {await setDue_date(null)}} style={{margin:'8px 5px'}}>
                    <ClearIcon></ClearIcon>
                 </IconButton>
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

        {/* Todos table */}
        
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

        {/* Pagination */}
        <Container style={{ display: "flex", justifyContent: 'space-between' }}>
            Todos per page: {todosperpage}
            <Pagination count={totalpages} page={page} onChange={handlePageChange} />
            Showing {totalTodos!==0?((page-1)*todosperpage+1):0}-{(page*todosperpage)>totalTodos?totalTodos:(page*todosperpage)} of {totalTodos} todos
        </Container>
           

        {/* Finish Time Metrics */}
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
        </Container>
    );
  }