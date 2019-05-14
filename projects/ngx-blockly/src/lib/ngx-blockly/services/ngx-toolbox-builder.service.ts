import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { XmlBlock } from '../models/xml-block';

export const LOGIC_CATEGORY: Category = new Category([
    new XmlBlock('controls_if'),
    new XmlBlock('logic_compare'),
    new XmlBlock('logic_operation'),
    new XmlBlock('logic_negate'),
    new XmlBlock('logic_boolean'),
    new XmlBlock('logic_null'),
    new XmlBlock('logic_ternary'),
], '%{BKY_LOGIC_HUE}', 'Logic', null);

export const LOOP_CATEGORY: Category = new Category([
    new XmlBlock('controls_repeat_ext'),
    new XmlBlock('controls_whileUntil'),
    new XmlBlock('controls_for'),
    new XmlBlock('controls_forEach'),
    new XmlBlock('controls_flow_statements'),
    new XmlBlock('controls_flow_statements')
], '%{BKY_LOOPS_HUE}', 'Loops', null);


export const MATH_CATEGORY: Category = new Category([
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
], '%{BKY_MATH_HUE}', 'Math', null);

export const TEXT_CATEGORY: Category = new Category([
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
    new XmlBlock('text_prompt_ext'),
], '%{BKY_TEXTS_HUE}', 'Text', null);

export const LISTS_CATEGORY: Category = new Category([
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
], '%{BKY_LISTS_HUE}', 'Lists', null);

export const COLOUR_CATEGORY: Category = new Category([
    new XmlBlock('colour_picker'),
    new XmlBlock('colour_random'),
    new XmlBlock('colour_random'),
    new XmlBlock('colour_blend')
], '%{BKY_COLOUR_HUE}', 'Colours', '');

export const VARIABLES_CATEGORY: Category = new Category([], '%{BKY_VARIABLES_HUE}', 'Variables', 'VARIABLE');

export const FUNCTIONS_CATEGORY: Category = new Category([], '%{BKY_PROCEDURES_HUE}', 'Functions', 'PROCEDURE');

@Injectable()
export class NgxToolboxBuilderService {

    private _categories: Category[];

    public build(): string {
        let xml = '<xml id="toolbox" style="display: none">\n';
        if (this.categories) {
            for (const category of this.categories) {
                xml += category.toXML() + '\n';
            }
        }
        // xml += LOGIC_CATEGORY.toXML();
        // xml += this.loopOperators ? LOOP_CATEGORY.toXML() : '';
        // xml += this.mathOperators ? MATH_CATEGORY.toXML() : '';
        // xml += this.textOperators ? TEXT_CATEGORY.toXML() : '';
        // xml += this.listOperators ? LISTS_CATEGORY.toXML() : '';
        // xml += this.colourOperators ? COLOUR_CATEGORY.toXML() : '';
        // xml += this.variableOperators ? VARIABLES_CATEGORY.toXML() : '';
        // xml += this.functionOperators ? FUNCTIONS_CATEGORY.toXML() : '';
        xml += '</xml>';
        console.log(xml);

        return xml;
    }

    get categories(): Category[] {
        return this._categories;
    }

    set categories(value: Category[]) {
        this._categories = value;
    }
}
