import React, { useEffect, useState } from "react";

function Todo() {
  const [text, setText] = useState("");
  const [task, setTask] = useState([]);
  const [status] = useState("Incomplete");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTask(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    if (task.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(task));
    }
  }, [task]);

  const handleAddTask = () => {
    if (text) {
      setTask([
        ...task,
        {
          task: text,
          status: status,
        },
      ]);
    }
    setText("");
  };

  const handleTaskDelete = (id) => {
    const filteredTask = task.filter((_, index) => index !== id);
    setTask(filteredTask);
  };

  const toggleStatus = (id) => {
    const updateTask = task.map((e, index) => {
      if (index === id) {
        return {
          ...e,
          status: e.status === "Incomplete" ? "Complete" : "Incomplete",
        };
      }
      return e;
    });
    setTask(updateTask);
  };

  const handleSearchTask = (e) => {
    setSearchText(e.target.value);
    const searchedData = task.filter((e) =>
      e.task.toLowerCase().includes(searchText.toLowerCase())
    );
    setTask(searchedData);
  };

  console.log(task);

  return (
    <div style={{ width: "", height: "full" }}>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          gap: "10px",
        }}
      >
        <input
          placeholder="Enter task"
          type="text"
          style={{ width: "60%" }}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <input
        placeholder="Search task"
        type="text"
        style={{ width: "60%" }}
        value={searchText}
        onChange={(e) => handleSearchTask(e)}
      />
      <div
        style={{ display: "flex", flexDirection: "column", textAlign: "start" }}
      >
        {task.length === 0 ? (
          <p style={{ color: "red" }}>No Tasks</p>
        ) : (
          task?.map((e, index) => (
            <h4 key={index}>
              <span>
                {index}. <strong>{e.task}</strong> -{" "}
                <button
                  style={{
                    backgroundColor:
                      e.status === "Incomplete" ? "red" : "green",
                    color: "white",
                  }}
                  onClick={() => toggleStatus(index)}
                >
                  {e.status}
                </button>
              </span>{" "}
              <button
                style={{
                  backgroundColor: "red",
                  color: "white",
                }}
                onClick={() => handleTaskDelete(index)}
              >
                Delete
              </button>
            </h4>
          ))
        )}
      </div>
    </div>
  );
}

export default Todo;
