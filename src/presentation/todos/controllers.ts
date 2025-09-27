import { Request, Response } from "express";

interface Todo {
    id: number,
    text: string,
    completedAt: Date | null
}

const todos: Todo[] = [
    { id: 1, text: 'Buy milk', completedAt: new Date() },
    { id: 2, text: 'Buy bread', completedAt: null },
    { id: 3, text: 'Buy butter', completedAt: new Date() }
]

export class TodosController {

    //* DI
    constructor() { }


    public getTodos = (req: Request, res: Response) => {

        return res.json(todos)

    }

    public getById = (req: Request, res: Response) => {

        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' });

        const todo = todos.find(todo => todo.id === id);
        return (todo)
            ? res.json(todo)
            : res.status(404).json({ error: `TODO with id ${id} not found ` })

    }

    public create = (req: Request, res: Response) => {
        const todo: Todo = req.body;
        if (!todo.text) return res.status(400).json({ error: 'Text property is required' });
        const newTodo: Todo = {
            id: todos.length + 1,
            text: todo.text,
            completedAt: null
        }

        todos.push(newTodo);
        return res.json(todos);

    }

    public update = ( req: Request, res: Response ) => {

        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' });

        const todo = todos.find( todo => todo.id === id );
        if( !todo ) return res.status( 404 ).json({ error: 'Todo does not exist' });

        const { text, completedAt } = req.body;

        todo.text = text || todo.text;
        ( completedAt  === 'null')
        ? todo.completedAt = null
        : todo.completedAt = new Date( completedAt || todo.completedAt )


        res.json( todo );

    }

    public delete = ( req: Request, res: Response ) => {

        const id = +req.params.id;
        if( isNaN(id) ) return res.status( 400 ).json({ error: 'ID argument is not a number'});

        const todo = todos.find( todo => todo.id === id );
        if( !todo ) return res.status( 404 ).json({ error: 'Todo does not exist' });

        const index = todos.findIndex( todo => todo.id === id );

        if( index !== -1 ){
            todos.splice(index,1);
            return res.json(todo);
        }
        




    }
}