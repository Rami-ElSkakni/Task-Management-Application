import Header from "@/components/Header"
import Task from "@/components/Task"

export default function Home() {
  return (
    <div className="w-4/5 m-auto px-4 max-w-screen-md">
      <Header />
      <br />
      <h1 className="text-center font-bold text-xl">TODO TASKS</h1>
      <Task />
    </div>
  )
}
