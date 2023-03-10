import {buildSchema, prop, Ref} from '@typegoose/typegoose';
import { TaskClass } from './Task';

//TODO limit the fields permissions by user degree

class UserClass {

    @prop({ required: true })
    public name?: string;

    @prop({ required: true, unique: true })
    public email?: string;

    @prop({ ref: () => TaskClass, default: [] })
    public tasks?: Ref<TaskClass>[];
}

const UserSchema = buildSchema(UserClass);

export {UserClass, UserSchema};