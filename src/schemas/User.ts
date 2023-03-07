import { prop, Ref } from 'typegoose';
import TaskSchema from './Task';

//TODO limit the fields permissions by user degree

class UserSchema {

    @prop({ required: true })
    public name?: string;

    @prop({ required: true, unique: true })
    public email?: string;

    @prop({ ref: () => TaskSchema })
    public tasks?: Ref<TaskSchema>[];
}

export default UserSchema;