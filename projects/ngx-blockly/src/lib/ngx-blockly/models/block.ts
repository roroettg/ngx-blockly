export abstract class Block {

    private _type: string;
    private _class: any;

    constructor(type: string) {
        this._type = type;
    }

    get type(): string {
        return this._type;
    }

    set type(value: string) {
        this._type = value;
    }

    get class(): any {
        return this._class;
    }

    set class(value: any) {
        this._class = value;
    }

    public abstract toXML();
}
