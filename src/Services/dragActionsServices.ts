import { AxiosResponse } from "axios";
import { Column, DBColumn, Id, Task } from "../types";
import axiosService from "./axiosService";
import localStorageService from "./localStorageServices";

const dragActionsServices = {
    onColumnsChange: (columns: Column[], lastActiveColumn: Column | null): void => {
        const columnState = columns.map((col, index) => {
            const {id, title} = col;
            return{
                id,
                name: title,
                index
            }
        });
        const body = {
            columnId: lastActiveColumn?.id,
            columnState
        }
        try {
            const responsePromise = axiosService("/col/update", "put", body);
            responsePromise.then((response: AxiosResponse) => {
                if(response.data.success) {
                    let userColumns: [DBColumn] = response.data.body.userColumns;
                    userColumns = userColumns.sort((a,b) => a.index - b.index);
                    localStorageService.setItem("columns", userColumns);
                }
            })
            return;
        } catch (error) {
            console.log(error)
        }
    },
    onTasksChange: (tasks: Task[], taskId: string): void => {
        let index = 0, cPrevId: Id = "";
        const tasksState = tasks.map((task) => {
            const {id, columnId} = task;
            if(cPrevId === columnId)    index++;
            else index = 0;
            cPrevId = columnId;
            return {
                id,
                columnId,
                index,
                content: task.content
            }
        });
        const user: any = localStorageService.getItem("user");
        const body = {
            taskId: taskId,
            tasksState: tasksState,
            userId: user._id,
        }
        try {
            const responsePromise = axiosService("/task/update", "put", body);
            responsePromise.then((response: AxiosResponse) => {
                const tasks = response.data.body.tasks;
                localStorageService.setItem("tasks", tasks);
            })
        } catch (error) {
            console.log(error)
        }
        return;
    },
}

export default dragActionsServices;