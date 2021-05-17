import { BlockMutator } from './block-mutator';
import { Block } from './block';

export abstract class CustomBlock extends Block {

    private _block: Blockly.Block;
    private _blockMutator: BlockMutator;
    private _args: any[];


    constructor(type: string, blockMutator?: BlockMutator, ...args: any[]) {
        super(type);
        this._blockMutator = blockMutator ? blockMutator : null;
        this._args = args;
    }

    public init(block: Blockly.Block) {
        this._block = block;
        this.defineBlock();
        this.block.setOnChange(function (event) {
            this.blockInstance.onChange(event);
        });
    }

    public abstract defineBlock();

    public onChange(_: Blockly.Events.Abstract) {
        // nothing to do
    }

    public toXML(): string {
        return `<block type="${this.type}" disabled="${this.disabled}"></block>`;
    }

    public toDartCode(block: Blockly.Block): string | any[] {
        return 'Not implemented';
    }

    public toJavaScriptCode(block: Blockly.Block): string | any[] {
        return 'Not implemented';
    }

    public toLuaCode(block: Blockly.Block): string | any[] {
        return 'Not implemented';
    }

    public toPHPCode(block: Blockly.Block): string | any[] {
        return 'Not implemented';
    }

    public toPythonCode(block: Blockly.Block): string | any[] {
        return 'Not implemented';
    }

    get block(): Blockly.Block {
        return this._block;
    }

    set block(value: Blockly.Block) {
        this._block = value;
    }

    get blockMutator(): BlockMutator {
        return this._blockMutator;
    }

    set blockMutator(value: BlockMutator) {
        this._blockMutator = value;
    }

    get args(): any[] {
        return this._args;
    }

    set args(value: any[]) {
        this._args = value;
    }
}
