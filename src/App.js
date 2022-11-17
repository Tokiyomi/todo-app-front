
import './App.css';
import ButtonAppBar from './components/Appbar';
import ControlBar from './components/Appcontrol';
import AddTodoButton from './components/Appaddtodo';
import BasicPagination from './components/Apppagination';
import DenseTable from './components/Apptodotable';
import Student from './components/Apptodolist';

function App() {
  return (
    <div className="App">
      <ButtonAppBar></ButtonAppBar>
      <ControlBar></ControlBar>
      <AddTodoButton></AddTodoButton>
      <DenseTable></DenseTable>
      <BasicPagination></BasicPagination>
      <Student></Student>
    </div>
  );
}

export default App;
