import { UUID } from 'angular2-uuid';
import { Block } from './block';
import { Node } from './node';
import { Button } from './button';
import { Label } from './label';

export class Category implements Node {

    private _elements: (Block | Category | Button | Label) [];
    private _colour: string;
    private _name: string;
    private _custom: string;
    private _style: string;
    private _cssClass: string;
    private _toolboxItemId: string;

    constructor(name: string,
                colour: string,
                elements?: (Block | Category | Button | Label) [],
                custom?: string,
                style?: string,
                cssClass?: string,
                toolboxItemId?: string) {
        this._name = name;
        this._elements = elements ? elements : [];
        this._colour = colour;
        this._custom = custom;
        this._style = style;
        this._cssClass = cssClass;
        this._toolboxItemId = toolboxItemId ? toolboxItemId : UUID.UUID();
    }

    get elements(): (Block | Category | Button | Label)[] {
        return this._elements;
    }

    set elements(value: (Block | Category | Button | Label)[]) {
        this._elements = value;
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

    get toolboxItemId(): string {
        return this._toolboxItemId;
    }

    set toolboxItemId(value: string) {
        this._toolboxItemId = value;
    }

    public toXML(): string {
        let xml = `<category expanded="false" name="${this.name}"`;

        if (this.toolboxItemId) {
            xml += ` toolboxitemid="${this.toolboxItemId}"`;
        }

        if (!this.style) {
            xml += ` colour="${this.colour}"`;
        } else {
            xml += ` categorystyle="${this.style}"`;
        }

        xml += this.cssClass ? ` categoryclass="${this.cssClass}"` : '';
        xml += this.custom ? ` custom="${this.custom}">` : '>';

        for (const element of this.elements) {
            xml += element.toXML();
        }

        xml += '</category>';

        return xml;
    }
}
