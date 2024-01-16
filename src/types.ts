export type Id = string | number;

export type Column = {
    id: Id,
    title: string
}

export type DBColumn = {
    type: Id,
    name: string,
    index: number
}

export type Task = {
    id: Id,
    columnId: Id,
    content: string,
    originalContent: string
}