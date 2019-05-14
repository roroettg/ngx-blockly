import { Block } from './block';

export class Category {

    private _blocks: Block[] = [];
    private _colour: string;
    private _name: string;
    private _custom: string;

    constructor(blocks: Block[], colour: string, name: string, custom: string) {
        this._blocks = blocks;
        this._colour = colour;
        this._name = name;
        this._custom = custom;
    }

    get blocks(): Block[] {
        return this._blocks;
    }

    set blocks(value: Block[]) {
        this._blocks = value;
    }

    get colour(): string {
        return this._colour;
    }

    set colour(value: string) {
        this._colour = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get custom(): string {
        return this._custom;
    }

    set custom(value: string) {
        this._custom = value;
    }

    public toXML(): string {
        let xml = `<category name="${this.name}" colour="${this.colour}"`;
        xml += this.custom ? ` custom="${this.custom}">` : '>';
        for (const block of this.blocks) {
            xml += block.toXML();
        }
        xml += '</category>';

        return xml;
    }
}
