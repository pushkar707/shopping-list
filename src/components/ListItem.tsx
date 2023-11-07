import React, { Dispatch, FormEvent, SetStateAction } from 'react'
import Trash from '~/icons/Trash'
import { itemsType } from '~/types/ItemsType'
import { api } from '~/utils/api'

const ListItem = ({id,item,checked,index,setitems}:itemsType & {index:number,setitems:Dispatch<SetStateAction<itemsType[]>>}) => {
  const checkItemFunction = api.shoppingList.checkItem.useMutation()
  const deleteItemFunction = api.shoppingList.deleteItem.useMutation()

  const handleCheckBoxesClient = (e: FormEvent<HTMLInputElement>, id: string) => {
    const checked = e.currentTarget.checked
    checkItemFunction.mutate({ id, checked })
  }

  const deleteItem = (id:string) => {
    deleteItemFunction.mutate({id})
    setitems((prevItems:any) => {
      const newItems = prevItems.filter((item:itemsType) => {
        if(item.id !== id){
          return item
        }
      })
      return newItems
    })
  }


  return (
    <tr key={id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{index + 1}</td>
        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-base">{item}</td>
        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex gap-3">
          <input type="checkbox" id={id} defaultChecked={checked} onInput={(e) => handleCheckBoxesClient(e, id)}/>
          <Trash onClick={() => deleteItem(id)} className='cursor-pointer'/>
        </td>
    </tr>
  )
}

export default ListItem
