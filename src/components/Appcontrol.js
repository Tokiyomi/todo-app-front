import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';


import InputLabel from '@mui/material/InputLabel';

import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';

//import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

export default function ControlBar() {
    const paperStyle={padding:'50px 20px', width:600,margin:"20px auto"}
    const [priority, setPriority] = React.useState('LOW');
    const [flag, setFlag] = React.useState('UNDONE');
    const [creationdate, setCreationDatetime] = React.useState(new Date());
    const [duedate, setDueDate] = React.useState(null);
    const [donedate, setDoneDate] = React.useState(null);
    
    const handleChange_priority = (event) => {
        setPriority(event.target.value);
    };

    const handleChange_flag = (event) => {
        setFlag(event.target.value);
    };

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

    return (
        <Paper sx={{ my: 2 }} style={paperStyle}>
            <h1 style={{color:"blue"}}><u>Add Todo</u></h1>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TextField id="outlined-basic" required label="Todo Content" variant="outlined" fullWidth />
            <div>
                <DesktopDatePicker
                label="Creation Date"
                disabled
                readOnly
                value={creationdate}
                onChange={(newValue) => {
                    setCreationDatetime(newValue);
                }}
                renderInput={(params) => <TextField {...params} sx={{width: '30%'}} /> }
                />
            </div>
            <div>
                
                <FormControl fullWidth>
                <InputLabel id="demo-simple-select-readonly-label">Priority</InputLabel>
                <Select
                //style={{ marginTop: 18}}
                //renderInput={(params) => <TextField {...params} sx={{width: '50%'}} /> }
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={priority}
                label="Priority"
                
                onChange={handleChange_priority}
                >
                    <MenuItem value={"LOW"}>LOW</MenuItem>
                    <MenuItem value={"MEDIUM"}>MEDIUM</MenuItem>
                    <MenuItem value={"HIGH"}>HIGH</MenuItem>
                </Select>
                </FormControl>
                
                <DateTimePicker sx={{ my: 2 }}
                    renderInput={(params) => <TextField {...params} sx={{width: '30%'}}/>}
                    label="Due Date (Optional)"
                    value={duedate}
                    onChange={(newValue) => {
                    setDueDate(newValue);
                    }}
                    //renderInput={(params) => <TextField {...params} helperText="Optional"/>}
                />
            </div>
            
            
            
            <Select 
                labelId="demo-simple-select-label-2"
                id="demo-simple-select-2"
                value={flag}
                label="Status"
                onChange={handleChange_flag}
            >
                <MenuItem value={"UNDONE"}>UNDONE</MenuItem>
                <MenuItem value={"DONE"}>DONE</MenuItem>
            </Select>
            <DateTimePicker
            label="Done Date"
            disabled
            value={donedate}
            onChange={(newValue) => {
                setDoneDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
            />
            </LocalizationProvider>
            <Button variant="contained">Add Todo</Button>
    
        
        </Paper>
        
    );
  }