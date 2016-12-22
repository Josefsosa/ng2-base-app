interface Callback { (data: any): void; }

declare class EventSource {
    onopen: Callback;
    onmessage: Callback;
    onerror: Callback;
    close(): void;
    addEventListener(event: string, cb: Callback): void;
    constructor(name: string);
}
