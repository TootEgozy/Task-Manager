class ExpandedError extends Error {

    name: string;

    stack: any;

    constructor(name: string, message: string) {
        super(message);
        this.name = name;
    }


}

class TaskManagerError extends ExpandedError {
    constructor(message: string) {
        super( 'TaskManagerError', message);
    }
    createError() {

    }
}

export { ExpandedError, TaskManagerError };