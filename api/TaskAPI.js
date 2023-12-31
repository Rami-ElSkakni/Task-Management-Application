import axios from "axios";

const getAllTasks = async () => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}`);

    return res.data.data;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

const addTask = async (details) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}`, details);
    return res.data.data;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

const deleteTask = async (id) => {
  try {
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/${id}`);

    return res.data;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

const editTask = async (details) => {
  try {
    const body = {
      title: details.title,
      description: details.description,
      dueDate: details.dueDate
    }
    const res = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/${details._id}`, body);

    return res.data;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};
const markComplete = async (details) => {
  try {
    const body = {
      completed: true,
    }
    const res = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/${details._id}`, body);

    return res.data;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};
const unmarkComplete = async (details) => {
  try {
    const body = {
      completed: false,
    }
    const res = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/${details._id}`, body);

    return res.data;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

 

export { getAllTasks, addTask, deleteTask, editTask, markComplete, unmarkComplete };
