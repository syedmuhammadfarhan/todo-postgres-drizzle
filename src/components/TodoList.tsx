"use client";
import { Todo, todoTable } from "@/lib/drizzle";
import React from "react";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";

const BASE_URL =
  process.env.NODE_ENV == "development"
    ? "http://localhost:3000"
    : "https://todo-postgres-blue.vercel.app";

async function getData() {
  try {
    const res = await fetch(`${BASE_URL}/api/todo`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return await res.json();
  } catch (error) {
    console.log((error as { message: string }).message);
  }
}

export default async function TodoList() {
  const { refresh } = useRouter();
  const res: Todo[] = await getData();

  const handleDelete = async (id: any) => {
    try {
      if (id) {
        const response = await fetch(`/api/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          refresh();
        } else {
          console.log("Delete request failed with status:", response.status);
        }
      }
    } catch (error) {
      console.log("An error occurred during the delete request:", error);
    }
  };

  return (
    <div className="max-h-[300px] overflow-auto scroll-smooth">
      {res?.map((items, i) => (
        <div
          key={i}
          className="bg-white px-2 py-3 flex items-center shadow rounded-lg gap-x-2 mb-6 mr-2"
        >
          <div className="h-2.5 w-2.5 rounded-full bg-secondary"></div>
          <div className="flex justify-between items-center w-full">
            <p className="text-lg font-md">{items.task}</p>
            <div className="p-1 rounded-lg mr-1 hover:scale-110">
              <MdDelete
                size={22}
                type="button"
                onClick={() => {
                  handleDelete(items.id);
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
