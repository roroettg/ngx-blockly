export abstract class Block {

    private _type: string;

    constructor(type: string) {
        this._type = type;
    }

    get type(): string {
        return this._type;
    }

    set type(value: string) {
        this._type = value;
    }

    public abstract toXML();
}
