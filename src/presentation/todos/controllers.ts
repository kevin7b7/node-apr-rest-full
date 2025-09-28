import { Request, Response } from "express";
import { CreateTodo, CreateTodoDto, GetTodo, GetTodos, TodoRepository, UpdateTodoDto, UpdateTodo, DeleteTodo } from "../../domain";


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
    constructor(
        private readonly todoRepository: TodoRepository,
    ) { }


    public getTodos = async (req: Request, res: Response) => {

        new GetTodos(this.todoRepository)
            .execute()
            .then(todos => res.json(todos))
            .catch(error => res.status(400).json({ error }));

    }

    public getById = async (req: Request, res: Response) => {

        const id = +req.params.id;

        new GetTodo(this.todoRepository)
            .execute(id)
            .then(todo => res.json(todo))
            .catch(error => res.status(400).json({ error }));

    }

    public create = async (req: Request, res: Response) => {

        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        if (error) return res.status(400).json({ error });

        new CreateTodo(this.todoRepository)
            .execute(createTodoDto)
            .then(todo => res.json(todo))
            .catch(error => res.status(400).json({ error }));

    }

    public update = async (req: Request, res: Response) => {

        const id = +req.params.id;


        const [, updateTodoDto] = UpdateTodoDto.update({ ...req.body, id });
        new UpdateTodo(this.todoRepository)
            .execute(updateTodoDto)
            .then(todo => res.json(todo))
            .catch(error => res.status(400).json({ error }))

    }

    public delete = async (req: Request, res: Response) => {

        const id = +req.params.id;

        new DeleteTodo(this.todoRepository)
            .execute(id)
            .then(todo => res.json(todo))
            .catch(error => res.status(400).json({ error }));
    }
}