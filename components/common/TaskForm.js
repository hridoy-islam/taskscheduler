import { useForm } from "react-hook-form";

const TaskForm = ({ onSubmit }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmitForm = async (data) => {
    await onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="flex space-x-2">
      <input
        {...register("taskName", { required: true })}
        type="text"
        placeholder="Add a task"
        className="flex-1"
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default TaskForm;
