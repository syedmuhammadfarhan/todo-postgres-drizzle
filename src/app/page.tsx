import AddTodo from "@/components/AddTodo";
import TodoList from "@/components/TodoList";

export default function Home() {
  return (
    <main className="bg-gradient-to-tr from-primary to-secondary h-screen flex justify-center items-center">
      <div className="px-3 py-4 rounded-xl bg-white w-full max-w-md">
        {/* @ts-ignore it is used to ignore ts error on any component which is async,TodoList conponent export default function in async*/}
        <TodoList />
        <AddTodo />
        <div className="w-1/2 h-2 bg-black rounded mx-auto my-6"></div>
      </div>
    </main>
  );
}
