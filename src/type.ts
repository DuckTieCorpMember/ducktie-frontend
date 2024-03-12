export type Task = {
    taskName: string;
    taskNote?: string;
    progress?: number;
    deadlineDate?: Date;
    location?: MapPosition;
}

export type MapPosition = {
    actual?:{
        lat: number;
        lon: number;
    };

    relative?:{
        x:number;
        y:number;
    }
}

export let todoList: Task[] = [];