import AddTodo from "@/components/AddTodo";
import TodoList from "@/components/TodoList";

export default function Home() {
  return (
    <main className="bg-gradient-to-tr from-primary to-secondary h-screen flex justify-center items-center">
      <div className="p-4 rounded-xl bg-gradient-to-br from-[#D9D9D9]/50 to-[#D9D9D9]/30 w-full max-w-xl">
        {/* @ts-ignore it is used to ignore ts error on any component which is async,TodoList conponent export default function in async*/}
        <TodoList />
        <AddTodo />
        <div className="w-1/2 h-1 bg-black/70 rounded mx-auto mt-6"></div>
      </div>
    </main>
  );
}
