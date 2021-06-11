import { Node } from './node';

export class Button implements Node {

    private _text: string;
    private _callbackKey: string;

    constructor(text: string, callbackKey: string) {
        this._text = text;
        this._callbackKey = callbackKey;
    }

    get text(): string {
        return this._text;
    }

    set text(value: string) {
        this._text = value;
    }

    get callbackKey(): string {
        return this._callbackKey;
    }

    set callbackKey(value: string) {
        this._callbackKey = value;
    }

    public toXML(): string {
        return `<button text="${this.text}" callbackKey="${this.callbackKey}"></button>`;
    }
}
