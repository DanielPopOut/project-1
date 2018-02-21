"use strict";
/**
 * app.ts - Configures an Express application.
 *
 * @authors Nicolas Richard, Emilio Riviera
 * @date 2017/01/09
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const indexRoute = require("./routes/index");
const bdImplementation_1 = require("./bdImplementation");
class Application {
    /**
     * Constructor.
     *
     * @class Server
     * @constructor
     */
    constructor() {
        // Application instantiation
        this.app = express();
        // configure this.application
        this.config();
        // configure routes
        this.routes();
    }
    /**
     * Bootstrap the application.
     *
     * @class Server
     * @method bootstrap
     * @static
     * @return {ng.auto.IInjectorService} Returns the newly created injector for this this.app.
     */
    static bootstrap() {
        return new Application();
    }
    /**
     * The routes function.
     *
     * @class Server
     * @method routes
     */
    routes() {
        let db = new bdImplementation_1.BdImplementation();
        let router;
        router = express.Router();
        // create routes
        const index = new indexRoute.Index();
        router.post('/description', index.ReceiveTask.bind(index.ReceiveTask));
        // use router middleware
        this.app.use(router);
        this.app.get('/', function (req, res) {
            res.sendFile(path.join(__dirname + '/angular_build/index.html'));
        });
        this.app.post('/deepthoughts', function (req, res) {
            console.log(req.body);
            db.insertDocument('deepthoughts', req, res);
        });
        this.app.get('/deepthoughts', function (req, res) {
            db.getDocument('deepthoughts', req, res);
        });
        // Gestion des erreurs
        this.app.use((req, res, next) => {
            const err = new Error('Not Found');
            next(err);
        });
        // development error handler
        // will print stacktrace
        if (this.app.get('env') === 'development') {
            this.app.use((err, req, res, next) => {
                res.status(err.status || 500);
                res.send({
                    message: err.message,
                    error: err
                });
            });
        }
        // production error handler
        // no stacktraces leaked to user (in production env only)
        this.app.use((err, req, res, next) => {
            res.status(err.status || 500);
            res.send({
                message: err.message,
                error: {}
            });
        });
    }
    /**
     * The config function.
     *
     * @class Server
     * @method config
     */
    config() {
        // Middlewares configuration
        this.app.use(logger('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(cookieParser());
        this.app.use(express.static(path.join(__dirname, '/angular_build')));
        this.app.use(cors());
    }
}
exports.Application = Application;
//# sourceMappingURL=app.js.map