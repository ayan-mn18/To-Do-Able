import { useMemo, useState } from "react";
import PlusIcon from "../icons/PlusIcon"
import { Column, Id, Task } from "../types";
import ColumnContainer from "./ColumnContainer";
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "./TaskCard";
import localStorageService from "../Services/localStorageServices";
import { useNavigate } from "react-router-dom";


const generateRandomId = () => {
    return Math.floor(Math.random() * 10001);
}

interface KanbanProps {
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialColumns: Column[] = localStorageService.getColumns();

  const initialTasks: Task[] = localStorageService.getTasks();

const KanbanBoard= ({setIsLoggedIn}: KanbanProps) => {
    const [columns, setColumns] = useState<Column[]>(initialColumns);
    const columnIds = useMemo(() => columns.map(col => col.id), [columns]);
    const [activeColumn, setActiveColumn] = useState<Column | null>(null);
    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const [activeTask, setActiveTask] = useState<Task | null>(null);

    const navigate = useNavigate();

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

        if(event.active.data.current?.type === 'task') {
            setActiveTask(event.active.data.current.task);
            return;
        }
    }

    const dragEnd = (event: DragEndEvent) => {
        setActiveColumn(null);
        setActiveTask(null);
        const { active, over } = event;

        if(!over || !over.id)   return;

        const activeId = active.id;
        const overId = over.id;

        if(overId === activeId) return; 

        const isActiveAColumn = active.data.current?.type === 'column';
        const isOverAColumn = over.data.current?.type === 'column';

        if(isActiveAColumn && isOverAColumn) {
            setColumns((columns) => {
                const activeIdIndex = columns.findIndex((col) => col.id === activeId);
                const overIdIndex = columns.findIndex((col) => col.id === overId);
    
                return arrayMove(columns, activeIdIndex, overIdIndex);
            });
        }
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

    const createTasks = (columndId: Id) => {
        const newTask:Task = {
            id: generateRandomId(),
            columnId: columndId,
            content: `Task ${tasks.length + 1}`,
            originalContent: `Task ${tasks.length + 1}`
        }

        setTasks([ ...tasks, newTask ]);
    }

    const deleteTask = (taskId: Id) => {
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        setTasks(updatedTasks);
    }

    const updateTask = (taskId: Id, content: string) => {
        const updatedTasks = tasks.map((task) => {
            if(task.id === taskId) return { ...task, content}
            else return task;
        });

        setTasks(updatedTasks);
    }

    const dragOver = (event: DragOverEvent) => {
        const { active, over } = event;

        if(!over || !over.id)   return;

        const activeId = active.id;
        const overId = over.id;

        if(overId === activeId) return; 

        const isActiveATask = active.data.current?.type === "task";
        const isOverATask = over.data.current?.type === "task";

        if(!isActiveATask)  return;

        //When dropping a task over a task
        if(isActiveATask && isOverATask) {
            setTasks((tasks) => {
                const activeIndexId = tasks.findIndex((t) => t.id === activeId);
                const overIndexId = tasks.findIndex((t) => t.id === overId);

                //For the case when dropping a task on another task in differen columns
                tasks[activeIndexId].columnId = tasks[overIndexId].columnId;

                return arrayMove(tasks, activeIndexId, overIndexId);
            })
        }

        const isOverAColumn = over.data.current?.type === 'column';

        //When dropping a task over a column
        if(isActiveATask && isOverAColumn) {
            setTasks((tasks) => {
                const activeIndexId = tasks.findIndex((t) => t.id === activeId);

                tasks[activeIndexId].columnId = overId;
                return arrayMove(tasks, activeIndexId, activeIndexId);
            })
        }
    }

    const logout = () => {
        localStorageService.logout();
        setIsLoggedIn(false);
        navigate("/login");
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
         <button
            className="absolute top-4 right-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
            onClick={logout}
            >
            Logout
        </button>
        
        <DndContext sensors={sensors} onDragStart={dragStart} onDragEnd={dragEnd} onDragOver={dragOver}>
            <div className="m-auto flex gap-4">
                <div className="flex gap-4">
                    <SortableContext items={columnIds}>
                        {columns.map((col) => (
                            <ColumnContainer deleteColumn={deleteColumn} column={col} key={col.id} updateColumnTitle={updateColumnTitle} createTask={createTasks} tasks={tasks.filter(task => task.columnId === col.id)} deleteTask={deleteTask} updateTask={updateTask}/>
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
                        createTask={createTasks}
                        tasks={tasks.filter(task => task.columnId === activeColumn.id)}
                        deleteTask={deleteTask}
                        updateTask={updateTask}
                    />
                )}
                {activeTask && (
                    <TaskCard task={activeTask} updateTask={updateTask} deleteTask={deleteTask}  />
                )}
                </DragOverlay>,
            document.body)}
        </DndContext>
    </div>
  )
}

export default KanbanBoard;