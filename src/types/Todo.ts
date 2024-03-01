export type Todo = {
    id: number;
    name: string;
    description: string;
    completed: boolean;
    due?: string;
}