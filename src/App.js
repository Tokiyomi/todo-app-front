
import './App.css';
import ButtonAppBar from './components/Appbar';
import ControlBar from './components/Appcontrol';
import AddTodoButton from './components/Appaddtodo';
import BasicPagination from './components/Apppagination';
import DenseTable from './components/Apptodotable';

function App() {
  return (
    <div className="App">
      <ButtonAppBar></ButtonAppBar>
      <ControlBar></ControlBar>
      <AddTodoButton></AddTodoButton>
      <DenseTable></DenseTable>
      <BasicPagination></BasicPagination>
    </div>
  );
}

export default App;
