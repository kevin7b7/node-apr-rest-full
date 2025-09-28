import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain";


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


    public getTodos = async(req: Request, res: Response) => {

        const todos = await prisma.todo.findMany();

        return res.json(todos)

    }

    public getById = async(req: Request, res: Response) => {

        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' });


        const todo = await prisma.todo.findFirst({
            where: { id }
        });
        
        return (todo)
            ? res.json(todo)
            : res.status(404).json({ error: `TODO with id ${id} not found ` })

    }

    public create = async(req: Request, res: Response) => {

        const [error, createTodoDto] = CreateTodoDto.create( req.body );
        if ( error ) return res.status( 400 ).json( { error } );

        const todo = await prisma.todo.create({ data:createTodoDto  });
        
        return res.json(todo);

    }

    public update = async( req: Request, res: Response ) => {

        const id = +req.params.id;

        const [error, updateTodoDto] = UpdateTodoDto.update({...req.body, id});
        if( error ) return res.status(400).json({ error });

         const todoDb = await prisma.todo.findFirst({
            where: { id }
        });
        if( !todoDb ) return res.status( 404 ).json({ error: 'Todo does not exist' });


        const todoUpdated = await prisma.todo.update({
            where: { id },
            data: updateTodoDto.values
        })

        res.json( todoUpdated );

    }

    public delete = async( req: Request, res: Response ) => {

        const id = +req.params.id;
        if( isNaN(id) ) return res.status( 400 ).json({ error: 'ID argument is not a number'});

        const deleted = await prisma.todo.delete({ 
            where: { id }
         });

         ( deleted )
            ? res.json(deleted)
            : res.status(400).json( { error: 'Todo does not exist' } );
        
    }
}