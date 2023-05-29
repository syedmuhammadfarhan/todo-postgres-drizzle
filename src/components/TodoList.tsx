import { Todo } from "@/lib/drizzle";
import React from "react";

const getData = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/todo", {
            // method: "GET",
            cache:"no-store",
        // headers: {
        //     "Content-Type": "application/json"
        // }
});
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return await res.json();
  } catch (error) {
    console.log((error as { message: string }).message);
  }
};

export default async function TodoList() {
  const res:Todo[] = await getData();
  console.log(res);
  return (
    <>
      {res.map((items, i) => (
        <div key={i} className="bg-gray-100 py-4 px-4 flex items-center shadow rounded-lg gap-x-3 mb-5">
          <div className="h-3 w-3 rounded-full bg-secondary"></div>
          <p className="text-lg font-md">{items.task}</p>
        </div>
      ))}
    </>
  );
}
