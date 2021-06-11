import { UUID } from 'angular2-uuid';
import { Node } from './node';

export class Category implements Node {

    private _nodes: Node [];
    private _colour: string;
    private _name: string;
    private _custom: string;
    private _style: string;
    private _cssClass: string;
    private _toolboxItemId: string;
    private _hidden: boolean;

    constructor(name: string,
                colour: string,
                nodes?: Node [],
                custom?: string,
                style?: string,
                cssClass?: string,
                toolboxItemId?: string,
                hidden?: boolean) {
        this._name = name;
        this._nodes = nodes ? nodes : [];
        this._colour = colour;
        this._custom = custom;
        this._style = style;
        this._cssClass = cssClass;
        this._toolboxItemId = toolboxItemId ? toolboxItemId : UUID.UUID();
        this._hidden = hidden;
    }

    get nodes(): Node[] {
        return this._nodes;
    }

    set nodes(nodes: Node[]) {
        this._nodes = nodes;
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

    get hidden(): boolean {
        return this._hidden;
    }

    set hidden(value: boolean) {
        this._hidden = value;
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

        if (this.hidden) {
            xml += ' hidden="true"';
        }

        xml += this.cssClass ? ` categoryclass="${this.cssClass}"` : '';
        xml += this.custom ? ` custom="${this.custom}">` : '>';

        for (const element of this.nodes) {
            xml += element.toXML();
        }

        xml += '</category>';

        return xml;
    }
}
