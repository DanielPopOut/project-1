"use strict";
var Route;
(function (Route) {
    class Index {
        ReceiveTask(req, res, next) {
            console.log(req.body);
        }
        ;
    }
    Route.Index = Index;
})(Route || (Route = {}));
module.exports = Route;
//# sourceMappingURL=index.js.map