import express, {Request, Response} from 'express';
import config from './config';

const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
    // @ts-ignore
    res.send('test');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
    mongoose.connect('mongodb://127.0.0.1:27017/test');

    const Cat = mongoose.model('Cat', { name: String });

    const kitty = new Cat({ name: 'Zildjian' });
    kitty.save().then(() => console.log('meow'));
});