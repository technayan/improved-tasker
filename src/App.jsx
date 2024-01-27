import { useReducer } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import TaskBoard from "./components/task/TaskBoard";
import { TasksContext } from "./contexts";
import { initialTasks } from "./data/data";
import { taskReducer } from "./reducers/taskReducer";

function App() {
  const [state, dispatch] = useReducer(taskReducer, initialTasks);

  return (
    <>
      <TasksContext.Provider value={{ state, dispatch }}>
        <Header />
        <Hero />
        <TaskBoard />
        <ToastContainer />
      </TasksContext.Provider>
    </>
  );
}

export default App;
