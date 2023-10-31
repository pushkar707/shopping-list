import Head from "next/head";
import { FormEvent, useEffect, useRef, useState } from "react";

import { api } from "~/utils/api";

export default function Home() {
  const addItemFunction = api.shoppingList.addItem.useMutation()
  const checkItemFunction = api.shoppingList.checkItem.useMutation()
  const inputref = useRef<HTMLInputElement>(null)

  const saveItem = (e:FormEvent) => {
    e.preventDefault()
    if(inputref.current && inputref.current.value.length){
      const item = inputref.current.value
      addItemFunction.mutate({item})
      items.push({item: inputref.current.value, checked: false , id:"Null"})
      inputref.current.value = ""
    }
  }

  // SHOWCSING ITEMS
  const [items, setItems] = useState<Array<{item:string, checked: boolean ,id: string}>>(api.shoppingList.getItems.useQuery().data || [{ item: 'string', checked: false, id: 'string' }]);

  // checkbox

  const handleCheckBoxesClient = (e:FormEvent<HTMLInputElement>,id:string) => {
    const checked = e.currentTarget.checked
    checkItemFunction.mutate({id,checked:!checked})

    const newItems = items.map(item => {
      if(id === item.id){
        return {...item, checked: !item.checked}
      }
      return item
    })

    setItems(newItems)
  }
  
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-[70vw] mx-auto my-20">
          <h1 className="text-xl">Shopping List</h1>

          <form className="my-5 flex gap-2" onSubmit={(e) => {saveItem(e)}}>
            <input type="text" ref={inputref} placeholder="Enter Item" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
            <button className="px-8 py-2 bg-green-600 text-white rounded">Add</button>
          </form>
          <table className="border w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className="border-b">
                <th className="px-6 py-3">S No.</th>
                <th className="px-6 py-3">Item</th>
                <th className="px-6 py-3">Checked</th>
              </tr>
            </thead>
            <tbody>
              {items.map(({item,checked,id}: {item:string, checked: boolean ,id: string},index:number) => {
                return <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{index+1}</td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-base">{item}</td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"><input type="checkbox" id={id} checked={checked} onInput={(e) => handleCheckBoxesClient(e,id)}/></td>
                </tr>
              })}
            </tbody>
            </table>
      </main>
    </>
  );
}
