import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

const TaskItem = ({
  task,
  onMarkAsImportant,
  onToggleTaskCompletion,
  onTaskClick,
}) => (
  <div
    className={`flex items-center space-x-2 p-3 rounded-lg shadow ${
      task.important ? "bg-yellow-100" : ""
    }`}
  >
    <Checkbox
      checked={task.status === "completed"}
      onCheckedChange={() => onToggleTaskCompletion(task._id)}
    />
    <span
      className={`flex-1 ${
        task.status === "completed" ? "line-through text-gray-500" : ""
      }`}
    >
      {task.taskName}
    </span>
    <Button onClick={() => onMarkAsImportant(task._id)}>Mark Important</Button>
    <Button onClick={() => onTaskClick(task)}>View Details</Button>
  </div>
);

export default TaskItem;
