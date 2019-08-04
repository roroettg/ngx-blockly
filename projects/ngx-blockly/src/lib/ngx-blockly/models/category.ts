import { Block } from './block';

export class Category {

    private _blocks: Block[] = [];
    private _colour: string;
    private _name: string;
    private _custom: string;
    private _style: string;

    constructor(
        blocks: Block[], 
        colour: string, 
        name: string, 
        custom: string, 
        style?: string
    ) {
        this._blocks = blocks;
        this._colour = colour;
        this._name = name;
        this._custom = custom;
        this._style = style;
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

    get style(): string {
        return this._style;
    }

    set style(value: string) {
        this._style = value;
    }

    public toXML(): string {
        let xml = `<category name="${this.name}" `;

        if (this.style === undefined) {
            xml += `colour="${this.colour}" `
        } else {
            xml += `categorystyle="${this.style}" `
        }

        xml += this.custom ? ` custom="${this.custom}">` : '>';
        for (const block of this.blocks) {
            xml += block.toXML();
        }
        xml += '</category>';

        return xml;
    }
}