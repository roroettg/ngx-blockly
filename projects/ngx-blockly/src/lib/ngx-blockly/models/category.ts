import { Block } from './block';
import { Node } from './node';

export class Category implements Node {

    private _blocks: Block[];
    private _categories: Category[];
    private _colour: string;
    private _name: string;
    private _custom: string;
    private _style: string;
    private _cssClass: string;
    private _toolboxitemid: string;

    constructor(name: string,
                colour: string,
                blocks?: Block[],
                categories?: Category[],
                custom?: string,
                style?: string,
                cssClass?: string,
                toolboxitemid?: string) {
        this._name = name;
        this._colour = colour;
        this._blocks = blocks ? blocks : [];
        this._categories = categories ? categories : [];
        this._custom = custom;
        this._style = style;
        this._cssClass = cssClass;
        this._toolboxitemid = toolboxitemid;
    }

    get blocks(): Block[] {
        return this._blocks;
    }

    set blocks(value: Block[]) {
        this._blocks = value;
    }

    get categories(): Category[] {
        return this._categories;
    }

    set categories(value: Category[]) {
        this._categories = value;
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

    get cssClass(): string {
        return this._cssClass;
    }

    set cssClass(value: string) {
        this._cssClass = value;
    }

    get toolboxitemid(): string {
        return this._toolboxitemid;
    }

    set toolboxitemid(value: string) {
        this._toolboxitemid = value;
    }

    public toXML(): string {
        let xml = `<category name="${this._name}"`;

        if (this.toolboxitemid) {
            xml += ` toolboxitemid="${this.toolboxitemid}"`;
        }

        if (!this.style) {
            xml += ` colour="${this._colour}"`;
        } else {
            xml += ` categorystyle="${this._style}"`;
        }

        xml += this.cssClass ? ` categoryclass="${this._cssClass}"` : '';
        xml += this.custom ? ` custom="${this._custom}">` : '>';

        for (const category of this._categories) {
            xml += category.toXML();
        }

        for (const block of this._blocks) {
            xml += block.toXML();
        }
        xml += '</category>';

        return xml;
    }
}
