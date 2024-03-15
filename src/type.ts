export interface Task {
    taskName: string;
    taskNote?: string;
    progress?: number;
    deadlineDate?: Date;
    location?: MapPosition;
}

export interface MapPosition {
    actual?:{
        lat: number;
        lon: number;
    };

    relative?:{
        x:number;
        y:number;
    }
}

export function formatDate(date: Date):string{
    const yyyy = date.getFullYear() as unknown as string;
    let mm = (date.getMonth() + 1) as unknown as string;
    let dd = date.getDate() as unknown as string;

    if ((dd as unknown as number) < 10) dd = '0' + dd;
    if ((mm as unknown as number) < 10) mm = '0' + mm;

    const formatted = dd + '/' + mm + '/' + yyyy;
    return formatted;
}