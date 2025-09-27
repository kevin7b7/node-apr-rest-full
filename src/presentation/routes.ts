import { Router } from "express";
import { TodosController } from "./todos/controllers";
import { TodoRoutes } from "./todos/routes";


export class AppRoutes {

    static get routes(): Router {

        const router = Router();
        //router.get('/api/todos',  (req, res) => todoController.getTodos(req, res) );
        router.use('/api/todos', TodoRoutes.routes);
        


        return router;
    }

}