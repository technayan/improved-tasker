import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { TasksContext } from "../../contexts";
import AddTaskModal from "./AddTaskModal";
import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";

export default function TaskBoard() {
  const [showAddModal, setShowAddModal] = useState(false);

  const [taskToUpdate, setTaskToUpdate] = useState(null);
  const { state, dispatch } = useContext(TasksContext);

  const [searchText, setSearchText] = useState("");

  const handleAddEditTask = (newTask, isAdd) => {
    if (isAdd) {
      dispatch({
        type: "ADD_TASK",
        payload: newTask,
      });

      toast.success("Task created successfully.", { position: "bottom-right" });
    } else {
      dispatch({
        type: "EDIT_TASK",
        payload: newTask,
      });

      toast.success("Task updated successfully.", { position: "bottom-right" });
    }
    setShowAddModal(false);
    setTaskToUpdate(null);
  };

  const handleEditTask = (task) => {
    setTaskToUpdate(task);
    setShowAddModal(true);
  };

  const handleDelete = (deletedTask) => {
    let confirm = window.confirm("Do you want to delete this task?");

    if (!confirm) return;

    dispatch({
      type: "DELETE_TASK",
      payload: deletedTask,
    });

    toast.success("Task deleted successfully.", { position: "bottom-right" });
  };

  const handleDeleteAll = () => {
    const confirm = window.confirm("Do you want to delete all tasks?");

    if (!confirm) return;

    dispatch({
      type: "DELETE_ALL",
    });

    toast.success("All tasks deleted successfully.", {
      position: "bottom-right",
    });
  };

  const handleFavourite = (favTask) => {
    const taskIndex = state.findIndex((task) => task.id === favTask.id);

    const newTasks = [...state];

    newTasks[taskIndex].isFavourite = !newTasks[taskIndex].isFavourite;
    dispatch({
      type: "FAVOURITE",
      payload: newTasks,
    });
  };

  // const handleSearch = (text) => {
  //   const filtered = filteredTasks.filter((task) =>
  //     task.title.toLowerCase().includes(text.toLowerCase())
  //   );
  //   // dispatch({
  //   //   type: "SEARCH",
  //   //   payload: filtered,
  //   // });
  //   setFilteredTasks([...filtered]);
  // };

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const handleCloseModal = () => {
    setTaskToUpdate(null);
    setShowAddModal(false);
  };

  return (
    <section className="mb-20" id="tasks">
      {showAddModal && (
        <AddTaskModal
          onClose={handleCloseModal}
          onSave={handleAddEditTask}
          taskToUpdate={taskToUpdate}
        />
      )}

      <div className="container">
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <div className="mb-14 items-center justify-between sm:flex">
            <h2 className="text-2xl font-semibold max-sm:mb-4">Your Tasks</h2>
            <div className="flex items-center space-x-5">
              <SearchTask onSearch={handleSearch} />

              <TaskActions
                onAddClick={() => setShowAddModal(true)}
                onDeleteAll={handleDeleteAll}
              />
            </div>
          </div>

          <TaskList
            tasks={state}
            onEditClick={handleEditTask}
            onDelete={handleDelete}
            onFav={handleFavourite}
            searchText={searchText}
          />
        </div>
      </div>
    </section>
  );
}
