
import './App.css';
import ButtonAppBar from './components/Appbar';
import ControlBar from './components/Appcontrol';
import AddTodoButton from './components/Appaddtodo';
import BasicPagination from './components/Apppagination';
import DenseTable from './components/Apptodotable';
import Student from './components/Apptodolist';
import BasicModal from './components/AppModal';
import TodosList from './components/Apptodos';
import ControlBarOrigial from './components/Appcontroloriginal';

function App() {
  return (
    <div className="App">
      <ButtonAppBar></ButtonAppBar>
      <ControlBarOrigial></ControlBarOrigial>
      {/*<BasicModal></BasicModal>
      <TodosList></TodosList>*/}
      {/*<AddTodoButton></AddTodoButton>*/}
      {/*<Student></Student>*/}
      {/*<DenseTable></DenseTable>*/}
      
    </div>
  );
}

export default App;
