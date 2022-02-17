export default class Error404 {
    error: {
        status: number,
        message: string
    }
    constructor(error: {
        status: number,
        message: string
    }) {
        this.error = error;

    }
}