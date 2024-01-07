import { useMemo, useState } from "react";
import PlusIcon from "../icons/PlusIcon"
import { Column, Id } from "../types";
import ColumnContainer from "./ColumnContainer";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

const KanbanBoard = () => {
    const [columns, setColumns] = useState<Column[]>([]);
    const columnIds = useMemo(() => columns.map(col => col.id), [columns]);
    const [activeColumn, setActiveColumn] = useState<Column | null>(null);

    const deleteColumn = (id:Id) => {
        console.log("delete columns")
        const filteredColumns = columns.filter( (col) => col.id !== id);
        setColumns(filteredColumns);
    }

    const createNewColumn = () => {
        const columnToAdd:Column = {
            id: generateRandomId(),
            title: `Column ${columns.length + 1}`
        }

        setColumns([ ...columns, columnToAdd]);
    }

    const dragStart = (event: DragStartEvent) => {
        if(event.active.data.current?.type === 'column') {
            setActiveColumn(event.active.data.current.column);
            return;
        }
    }

    const dragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if(!over || !over.id)   return;

        const activeId = active.id;
        const overId = over.id;

        if(overId === activeId) return; 

        setColumns((columns) => {
            const activeIdIndex = columns.findIndex((col) => col.id === activeId);
            const overIdIndex = columns.findIndex((col) => col.id === overId);

            return arrayMove(columns, activeIdIndex, overIdIndex);
        });
    }

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 3
            }
        })
    );

    const updateColumnTitle = (id: Id, title: string) => {
        const updatedColumns = columns.map((col) => {
            if(col.id === id)   return {id, title}
            else return col;
        });

        setColumns(updatedColumns);
    }
    return (
    <div className="
        m-auto
        flex
        min-h-screen
        w-full
        items-center
        overflow-x-auto
        overflow-y-hidden
        px-[40px]
    ">
        
        <DndContext sensors={sensors} onDragStart={dragStart} onDragEnd={dragEnd}>
            <div className="m-auto flex gap-4">
                <div className="flex gap-4">
                    <SortableContext items={columnIds}>
                        {columns.map((col) => (
                            <ColumnContainer deleteColumn={deleteColumn} column={col} key={col.id} updateColumnTitle={updateColumnTitle}/>
                        ))}
                    </SortableContext>
                </div>
                <button className="
                    h-[60px]
                    w-[350px]
                    min-w-[350px]
                    cursor-pointer
                    rounded-lg
                    bg-mainBackgroundColor
                    border-2
                    border-columnBackgroundColor
                    p-4
                    ring-rose-500
                    hover:ring-2
                    flex    
                    gap-2
                "
                onClick={ () => createNewColumn() }
                >
                    <PlusIcon />
                    Add Column
                </button>
            </div>
            {createPortal(
                <DragOverlay>
                {activeColumn && (
                    <ColumnContainer
                        column={activeColumn} 
                        deleteColumn={deleteColumn} 
                        updateColumnTitle={updateColumnTitle}
                    />
                )}
                </DragOverlay>,
            document.body)}
        </DndContext>
    </div>
  )
}

const generateRandomId = () => {
    return Math.floor(Math.random() * 10001);
}

export default KanbanBoard;