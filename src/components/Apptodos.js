import * as React from 'react';

import { Container ,Paper,Button} from '@mui/material';

import axios from 'axios';

import { styled } from '@mui/material/styles';

//export const fetchData = () => {}

export default function TodosList() {
    const[todos,setTodo]=React.useState([])
    //const[change, setChange]=React.useState(false)

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
      //setChange((prevState) => !prevState);
    //}, [])
    }

    /*const fetchData = () => {
            //e.preventDefault()
        //React.useEffect(() => {
            console.log('effect')
            axios
              .get('http://localhost:9090/todos')
              .then(response => {
                console.log('promise fulfilled')
                setTodo(response.data)
              })
            //setChange((prevState) => !prevState);
        //}, [])
    }*/
    
    //fetchData();
    React.useEffect( () => fetchData, []);

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

    return (
        <Container>
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
            Done Date:{todo.done_date}
            </Paper> 
        ))
    }
        </Paper>
        </Container>
    );
  }