import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const userId = "123"; // temporary

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/tasks/${userId}`)
      .then(res => setTasks(res.data));
  }, []);

  const addTask = () => {
    axios
      .post("http://localhost:5000/api/tasks", {
        userId,
        title
      })
      .then(res => setTasks([...tasks, res.data]));

    setTitle("");
  };

  return (
    <div>
      <h2>QuickTask</h2>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task"
      />
      <button onClick={addTask}>Add</button>

      {tasks.map(task => (
        <p key={task._id}>{task.title}</p>
      ))}
    </div>
  );
}

export default App;
