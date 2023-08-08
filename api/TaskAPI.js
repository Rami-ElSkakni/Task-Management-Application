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

        console.log(details)
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}`, details);
        console.log(res)
        return res.data
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
}

export {
    getAllTasks,
    addTask
}
