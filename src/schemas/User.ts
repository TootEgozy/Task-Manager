import {buildSchema, prop, Ref} from '@typegoose/typegoose';
import { Task } from './Task';

//TODO limit the fields permissions by user degree

class User {

    @prop({ required: true })
    public name!: string;

    @prop({ required: true, unique: true })
    public email!: string;

    @prop({ ref: () => Task, default: [] })
    public tasks!: Ref<Task>[];
}

const UserSchema = buildSchema(User);

export {User, UserSchema};