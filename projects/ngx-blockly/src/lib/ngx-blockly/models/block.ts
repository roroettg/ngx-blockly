import { BlockMutator } from './block-mutator';
import { CustomBlock } from './custom-block';

export type Constructor = new (type: string, blockMutator?: BlockMutator, ...args: any[]) => CustomBlock;

export abstract class Block {

    private _type: string;
    private _class: Constructor;
    private _disabled = false;

    protected constructor(type: string) {
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

    get class(): Constructor  {
        return this._class;
    }

    set class(value: Constructor ) {
        this._class = value;
    }

    public abstract toXML();
}
