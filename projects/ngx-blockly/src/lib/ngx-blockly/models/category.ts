import { UUID } from 'angular2-uuid';
import { Node } from './node';
import { XmlBlock } from './xml-block';

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

export const LOGIC_CATEGORY: Category = new Category('Logic', '%{BKY_LOGIC_HUE}', [
    new XmlBlock('controls_if'),
    new XmlBlock('logic_compare'),
    new XmlBlock('logic_operation'),
    new XmlBlock('logic_negate'),
    new XmlBlock('logic_boolean'),
    new XmlBlock('logic_null'),
    new XmlBlock('logic_ternary'),
]);

export const LOOP_CATEGORY: Category = new Category('Loops', '%{BKY_LOOPS_HUE}', [
    new XmlBlock('controls_repeat_ext'),
    new XmlBlock('controls_whileUntil'),
    new XmlBlock('controls_for'),
    new XmlBlock('controls_forEach'),
    new XmlBlock('controls_flow_statements')
]);

export const MATH_CATEGORY: Category = new Category('Math', '%{BKY_MATH_HUE}', [
    new XmlBlock('math_number'),
    new XmlBlock('math_arithmetic'),
    new XmlBlock('math_single'),
    new XmlBlock('math_trig'),
    new XmlBlock('math_constant'),
    new XmlBlock('math_number_property'),
    new XmlBlock('math_round'),
    new XmlBlock('math_on_list'),
    new XmlBlock('math_modulo'),
    new XmlBlock('math_constrain'),
    new XmlBlock('math_random_int'),
    new XmlBlock('math_random_float'),
    new XmlBlock('math_atan2')
]);

export const TEXT_CATEGORY: Category = new Category('Text', '%{BKY_TEXTS_HUE}', [
    new XmlBlock('text'),
    new XmlBlock('text_join'),
    new XmlBlock('text_append'),
    new XmlBlock('text_length'),
    new XmlBlock('text_count'),
    new XmlBlock('text_isEmpty'),
    new XmlBlock('text_indexOf'),
    new XmlBlock('text_charAt'),
    new XmlBlock('text_getSubstring'),
    new XmlBlock('text_changeCase'),
    new XmlBlock('text_multiline'),
    new XmlBlock('text_replace'),
    new XmlBlock('text_reverse'),
    new XmlBlock('text_trim'),
    new XmlBlock('text_print'),
    new XmlBlock('text_prompt'),
    new XmlBlock('text_prompt_ext')
]);

export const LISTS_CATEGORY: Category = new Category('Lists', '%{BKY_LISTS_HUE}', [
    new XmlBlock('lists_create_with'),
    new XmlBlock('lists_create_empty'),
    new XmlBlock('lists_repeat'),
    new XmlBlock('lists_reverse'),
    new XmlBlock('lists_length'),
    new XmlBlock('lists_isEmpty'),
    new XmlBlock('lists_indexOf'),
    new XmlBlock('lists_getIndex'),
    new XmlBlock('lists_setIndex'),
    new XmlBlock('lists_getSublist'),
    new XmlBlock('lists_split'),
    new XmlBlock('lists_sort'),
]);

export const COLOUR_CATEGORY: Category = new Category('Colours', '%{BKY_COLOUR_HUE}', [
    new XmlBlock('colour_picker'),
    new XmlBlock('colour_random'),
    new XmlBlock('colour_rgb'),
    new XmlBlock('colour_blend')
]);

export const VARIABLES_CATEGORY: Category = new Category('Variables', '%{BKY_VARIABLES_HUE}', [], 'VARIABLE');

export const FUNCTIONS_CATEGORY: Category = new Category('Functions', '%{BKY_PROCEDURES_HUE}', [], 'PROCEDURE');
