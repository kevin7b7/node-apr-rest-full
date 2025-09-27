import { Router } from "express";
import { TodosController } from "./controllers";


export class TodoRoutes {

    static get routes(): Router {

        const router = Router();
        const todoController = new TodosController();

        //router.get('/api/todos',  (req, res) => todoController.getTodos(req, res) );
        router.get('/', todoController.getTodos );
        router.get('/:id', todoController.getById );
        router.post('/', todoController.create );
        router.put('/:id', todoController.update);
        router.delete('/:id', todoController.delete);
        


        return router;
    }

} 