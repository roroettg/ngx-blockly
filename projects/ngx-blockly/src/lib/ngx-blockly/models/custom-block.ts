import { BlockMutator } from './block-mutator';
import { Block } from './block';

export abstract class CustomBlock extends Block {

    private _block: any;
    private _blockMutator: BlockMutator;


    constructor(type: string, block: any, blockMutator: BlockMutator) {
        super(type);
        this._block = block;
        this._blockMutator = blockMutator;
    }

    public init(block: any) {
        this.block = block;
        this.defineBlock();
    }

    public abstract defineBlock();

    public toXML(): string {
        return `<block type="${this.type}"></block>`;
    }

    public toDartCode(): string | any[] {
        return 'Not implemented';
    }

    public toJavaScriptCode(): string | any[] {
        return 'Not implemented';
    }

    public toLuaCode(): string | any[] {
        return 'Not implemented';
    }

    public toPHPCode(): string | any[] {
        return 'Not implemented';
    }

    public toPythonCode(): string | any[] {
        return 'Not implemented';
    }

    get block() {
        return this._block;
    }

    set block(value) {
        this._block = value;
    }

    get blockMutator(): BlockMutator {
        return this._blockMutator;
    }

    set blockMutator(value: BlockMutator) {
        this._blockMutator = value;
    }
}
