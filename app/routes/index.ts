import * as express from 'express';

module Route {

    export class Index {
        public ReceiveTask(req: express.Request, res: express.Response, next: express.NextFunction): void {
            console.log(req.body);
        };
    }
}

export = Route;
