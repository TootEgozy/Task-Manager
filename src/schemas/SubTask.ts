import {buildSchema, prop} from '@typegoose/typegoose';
import {Schema} from "mongoose";

//TODO limit the fields permissions by user degree

class SubTask {

    // TODO: add validation so order is included in the number of subTasks existing for the task
// (cannot be order 7 when there are 3 tasks) and unique among the subTasks of the parent task.
@prop({ required: true, type: Schema.Types.Number })
order!: number;

@prop({
    required: true,
    validate: {
        validator: (title: string) => !!title.length,
        message: 'A task must include a content'
    },
    type: Schema.Types.String
})
public text!: string;

@prop({ default: false, type: Schema.Types.Boolean })
public done!: boolean;
}

const SubTaskSchema = buildSchema(SubTask);

export {SubTask, SubTaskSchema};