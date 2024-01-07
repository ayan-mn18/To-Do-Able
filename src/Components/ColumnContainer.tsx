import { useSortable } from "@dnd-kit/sortable";
import TrashIcon from "../icons/TrashIcon";
import { Column, Id } from "../types"
import { CSS } from '@dnd-kit/utilities';
import { useState } from "react";

interface Props {
    column: Column;
    deleteColumn: (id: Id) => void;
    updateColumnTitle: (id: Id, title: string) => void;
}

const ColumnContainer = (props: Props) => {
    const {column, deleteColumn, updateColumnTitle} = props;
    const [editMode, setEditMode] = useState(false);

    const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
        id: column.id,
        data: {
            type: "column",
            column
        },
        disabled: editMode
    });

    const style = {
        transform: CSS.Transform.toString(transform) ,
        transition
    }

    if(isDragging){
        return (
            <div 
            ref={setNodeRef}
            style={style}
            className="
            bg-columnBackgroundColor
            opacity-40
            border-2
            border-pink-500
            w-[350px]
            h-[500px]
            max-h-[500px]
            rounded-md
            flex
            flex-col
           " >

            </div>
        )
    }

    return (
        <div
         ref={setNodeRef}
         style={style}
         className="
        bg-columnBackgroundColor
        w-[350px]
        h-[500px]
        max-h-[500px]
        rounded-md
        flex
        flex-col
        " >
            <div
            {...attributes} 
            {...listeners} 
            className="
            bg-mainBackgroundColor
            text-md
            h-[60px]
            cursor-grab
            rounded-md
            rounded-b-none
            p-3
            font-bold
            border-columnBackgroundColor
            border-4
            flex
            items-center
            justify-between"
            onClick={() => setEditMode(true)}
            >
                <div className="flex gap-2">
                    <div
                        className="
                    flex
                    justify-center
                    items-center
                    bg-columnBackgroundColor
                    px-2
                    py-1
                    text-sm
                    rounded-full
                    "
                    >
                        0
                    </div>
                    {!editMode && column.title}
                    {editMode && 
                        <input
                        autoFocus
                        onBlur={() => {
                            setEditMode(false)
                        }} 
                        value={column.title}
                        onKeyDown={(e) => {
                            if(e.key !== "Enter") return;
                            else setEditMode(false);
                        }}
                        onChange={(e) => updateColumnTitle(column.id, e.target.value)}
                        className="bg-black focus:border-rose-500 border rounded outline-none px-2"
                        ></input>
                    }
                </div>
                <button onClick={() => deleteColumn(column.id)} className="
                    stroke-gray-500
                    hover:stroke-white
                    hover:bg-columnBackgroundColor
                    rounded
                    px-1
                    py-2
                " >
                    <TrashIcon />
                </button>
            </div>
            <div  className="flex flex-grow" >content</div>
            <div>Footer</div>
        </div>
    )
}

export default ColumnContainer;