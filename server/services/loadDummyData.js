const { Column, Task } = require("../models");

const loadDummyData = async (userId) => {
    const dummyColumns = [
        {
            userId: userId,
            name: 'To Do',
            index: 0
        },
        {
            userId: userId,
            name: 'In Progress',
            index: 1
        },
        {
            userId: userId,
            name: 'Done',
            index: 2
        },
    ];
    const columns = await Column.create(dummyColumns);
    const dummyTasks = [
        {
            index: 0,
            columnId: columns[0].id,
            content: 'Go to the gym',
            originalContent: 'Go to the gym',
            userId: columns[0].userId,
        },
        {
            index: 1,
            columnId: columns[0].id,
            content: 'Call mom',
            originalContent: 'Call mom',
            userId: columns[0].userId,
        },
        {
            index: 2,
            columnId: columns[0].id,
            content: 'Read a book',
            originalContent: 'Read a book',
            userId: columns[0].userId,
        },
        {
            index: 0,
            columnId: columns[1].id,
            content: 'Prepare for meeting with client',
            originalContent: 'Prepare for meeting with client',
            userId: columns[1].userId,
        },
        {
            index: 1,
            columnId: columns[1].id,
            content: 'Review project timeline',
            originalContent: 'Review project timeline',
            userId: columns[1].userId,
        },
        {
            index: 2,
            columnId: columns[1].id,
            content: 'Write report',
            originalContent: 'Write report',
            userId: columns[1].userId,
        },
        {
            index: 0,
            columnId: columns[2].id,
            content: 'Buy birthday gift for friend',
            originalContent: 'Buy birthday gift for friend',
            userId: columns[2].userId,
        },
        {
            index: 1,
            columnId: columns[2].id,
            content: 'Pick up dry cleaning',
            originalContent: 'Pick up dry cleaning',
            userId: columns[2].userId,
        },
        {
            index: 2,
            columnId: columns[2].id,
            content: 'Buy earrings for mom',
            originalContent: 'Buy earrings for mom',
            userId: columns[2].userId,
        },
        {
            index: 3,
            columnId: columns[2].id,
            content: 'Shop for groceries',
            originalContent: 'Shop for groceries',
            userId: columns[2].userId,
        },
    ];
    const tasks = await Task.create(dummyTasks);
    return { columns, tasks };
}

module.exports = loadDummyData;