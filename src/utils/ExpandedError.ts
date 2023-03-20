class ExpandedError extends Error {

    name: string;

    stack: any;

    constructor(name: string, message: string) {
        super(message);
        this.name = name;
    }
}

class AppError extends ExpandedError {
    // constructor(message: string) {
    //     super('' , message);
    //     this.name = errorName;
    // }
}

export default ExpandedError;