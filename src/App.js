
import './App.css';
import TodoAppBar from './components/Appbar';
import TodoApplication from './components/TodoApplication';

function App() {
  return (
    <div className="App">
      <TodoAppBar></TodoAppBar>
      <TodoApplication></TodoApplication>
    </div>
  );
}

export default App;
