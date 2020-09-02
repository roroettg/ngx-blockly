import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { XmlBlock } from '../models/xml-block';
import { Node } from '../models/node';

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
    new XmlBlock('controls_flow_statements'),
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
    new XmlBlock('text_isEmpty'),
    new XmlBlock('text_indexOf'),
    new XmlBlock('text_charAt'),
    new XmlBlock('text_getSubstring'),
    new XmlBlock('text_changeCase'),
    new XmlBlock('text_trim'),
    new XmlBlock('text_print'),
    new XmlBlock('text_prompt_ext')
]);

export const LISTS_CATEGORY: Category = new Category('Lists', '%{BKY_LISTS_HUE}', [
    new XmlBlock('lists_create_with'),
    new XmlBlock('lists_create_with'),
    new XmlBlock('lists_repeat'),
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
    new XmlBlock('colour_random'),
    new XmlBlock('colour_blend')
]);

export const VARIABLES_CATEGORY: Category = new Category('Variables', '%{BKY_VARIABLES_HUE}', [], [], 'VARIABLE');

export const FUNCTIONS_CATEGORY: Category = new Category('Functions', '%{BKY_PROCEDURES_HUE}', [], [], 'PROCEDURE');

@Injectable()
export class NgxToolboxBuilderService {

    private _nodes: Node[];

    public build(): string {
        let xml = '<xml id="toolbox" style="display: none">';
        if (this._nodes) {
            for (const node of this._nodes) {
                xml += node.toXML();
            }
        }
        xml += '</xml>';
        return xml;
    }

    get nodes(): Node[] {
        return this._nodes;
    }

    set nodes(value: Node[]) {
        this._nodes = value;
    }
}
