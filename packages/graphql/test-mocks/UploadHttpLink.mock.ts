type RequestHandler = (...args: unknown[]) => unknown;

export default class UploadHttpLink {
    request: RequestHandler;

    constructor() {
        this.request = () => null;
    }
}
