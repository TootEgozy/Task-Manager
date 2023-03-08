// import { UserRepository } from './user-repository';
// import * as express from 'express';
//
// export class App {
//     public app;
//
//     constructor() {
//         this.app = express();
//         this.config();
//         this.mountRoutes();
//     }
//
//     private mountRoutes() {
//         // Definition of the possible API routes
//         this.app.route('/users')
//             .get((req, res) => {
//                 var repo = new UserRepository();
//                 // we catch the result with the typical "then"
//                 repo.getUsers().then((x) => {
//                     // .json(x) instead of .send(x) should also be okay
//                     res.status(200).send(x);
//                 });
//             });
//
//         //               here with parameter
//         //                      |
//         //                      v
//         this.app.route('/users/:id')
//             .get((req, res) => {
//                 var repo = new UserRepository();
//
//                 repo.getUser(req.params.id).then((x) => {
//                     res.status(200).send(x);
//                 });
//             });
//     }
// }
//
// export default new App().app;