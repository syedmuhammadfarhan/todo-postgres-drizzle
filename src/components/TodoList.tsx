"use client";
import { Todo, todoTable } from "@/lib/drizzle";
import React from "react";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";

const getData = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/todo", {
      // method: "GET",
      cache: "no-store",
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
  const { refresh } = useRouter();
  const res: Todo[] = await getData();
  // console.log(res);

  // const handleDelete = async (id:any) => {
  //   try {
  //     if (id) {
  //       const res = await fetch("/api/todo", {
  //         method: "DELETE",
  //         body: JSON.stringify({ id }),
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });
  //       refresh();
  //     }
  //   } catch (error) {
  //     console.log("error");
  //   }
  // };
  const handleDelete = async (id: any) => {
    console.log(`this is`, id);
    try {
      if (id) {
        const response = await fetch("/api/todo", {
          method: "DELETE",
          body: JSON.stringify({ id: id.id,}),
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
    <>
      {res.map((items, i) => (
        <div
          key={i}
          className="bg-red-100 px-2 py-3 flex items-center shadow rounded-lg gap-x-2 mb-5"
        >
          <div className="h-2.5 w-2.5 rounded-full bg-secondary"></div>
          <div className="flex justify-between items-center w-full">
            <p className="text-lg font-md">{items.task}</p>
            <div className="p-1 rounded-lg mr-1 hover:scale-110">
              <MdDelete
                size={22}
                type="button"
                onClick={() => {
                  handleDelete({ id: items.id });
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

