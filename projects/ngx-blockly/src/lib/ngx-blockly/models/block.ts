export abstract class Block {

    private _type: string;
    private _class: any;
    private _disabled = false;

    constructor(type: string) {
        this._type = type;
    }

    get type(): string {
        return this._type;
    }

    set type(value: string) {
        this._type = value;
    }

    get disabled(): boolean {
        return this._disabled;
    }

    set disabled(value: boolean) {
        this._disabled = value;
    }

    get class(): any {
        return this._class;
    }

    set class(value: any) {
        this._class = value;
    }

    public abstract toXML();
}
