import { Node } from './node';

export class Label implements Node {

    private _text: string;
    private _webClass: string;

    constructor(text: string, _webClass: string) {
        this._text = text;
        this._webClass = _webClass;
    }

    get text(): string {
        return this._text;
    }

    set text(value: string) {
        this._text = value;
    }

    get webClass(): string {
        return this._webClass;
    }

    set webClass(value: string) {
        this._webClass = value;
    }

    public toXML(): string {
        return `<label text="${this.text}" web-class="${this.webClass}"></label>`;
    }
}
