"use client"

import Head from "next/head";
import { FormEvent, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { api } from "~/utils/api";
import { itemsType } from "~/types/ItemsType";
import ListItem from "~/components/ListItem";


export default function Home() {
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("userExists")
    if(isAuthenticated !== "true"){
      window.location.href = "/login"
    }
  },[])

  const addItemFunction = api.shoppingList.addItem.useMutation()
  const inputref = useRef<HTMLInputElement>(null)

  const saveItem = (e: FormEvent) => {
    e.preventDefault()
    if (inputref.current && inputref.current.value.length) {
      const item = inputref.current.value
      const itemId = uuidv4()
      setitems((prevItems) => {
        if(inputref.current)
          return [...prevItems, { item, checked: false, id: itemId }]
        return prevItems
      })
      addItemFunction.mutate({ item, id: itemId })
      inputref.current.value = ""
    }
  }

  const [items, setitems] = useState<itemsType[]>([])

  const itemsData = api.shoppingList.getItems.useQuery().data

  useEffect(() => {
    if(itemsData)
      setitems(itemsData)
  }, [itemsData])

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-[70vw] mx-auto my-20">
        <h1 className="text-xl">Shopping List</h1>

        <form className="my-5 flex gap-2" onSubmit={(e) => { saveItem(e) }}>
          <input type="text" ref={inputref} placeholder="Enter Item" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          <button className="px-8 py-2 bg-green-600 text-white rounded">Add</button>
        </form>

        <table className="border w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="border-b">
              <th className="px-6 py-3">S No.</th>
              <th className="px-6 py-3">Item</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items?.map((item: itemsType, index: number) => {
              return <ListItem {...item} index={index} setitems={setitems} />
            })}
          </tbody>
        </table>
      </main>
    </>
  );
}