import { Router } from "express";
import { TodosController } from "./controllers";
import { TodoDataSourceImpl } from "../../infraestructure/datasource/todo.datasource.impl";
import { TodoRepositoryImpl } from "../../infraestructure/repositories/todo.repository.impl";


export class TodoRoutes {

    static get routes(): Router {

        const router = Router();

        const datasource = new TodoDataSourceImpl();
        const todoRepository = new TodoRepositoryImpl(datasource );
        const todoController = new TodosController( todoRepository );

        //router.get('/api/todos',  (req, res) => todoController.getTodos(req, res) );
        router.get('/', todoController.getTodos );
        router.get('/:id', todoController.getById );
        router.post('/', todoController.create );
        router.put('/:id', todoController.update);
        router.delete('/:id', todoController.delete);
        


        return router;
    }

} 