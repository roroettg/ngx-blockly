import { Component } from '@angular/core';
import { NgxBlocklyConfig } from '../../projects/ngx-blockly/src/lib/ngx-blockly/ngx-blockly.config';
import { NgxBlocklyGeneratorConfig } from '../../projects/ngx-blockly/src/lib/ngx-blockly/ngx-blockly-generator.config';
import { ExampleMutator } from './blocks/example.mutator';
import { ExampleBlock } from './blocks/example.block';
import { NgxToolboxBuilderService, LOGIC_CATEGORY, LOOP_CATEGORY, MATH_CATEGORY, TEXT_CATEGORY, LISTS_CATEGORY, COLOUR_CATEGORY, VARIABLES_CATEGORY, FUNCTIONS_CATEGORY } from '../../projects/ngx-blockly/src/lib/ngx-blockly/services/ngx-toolbox-builder.service';
import { Separator } from '../../projects/ngx-blockly/src/lib/ngx-blockly/models/separator';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(ngxToolboxBuilder: NgxToolboxBuilderService) {

        ngxToolboxBuilder.nodes = [
            LOGIC_CATEGORY,
            LOOP_CATEGORY,
            MATH_CATEGORY,
            TEXT_CATEGORY,
            LISTS_CATEGORY,
            COLOUR_CATEGORY,
            new Separator(),
            VARIABLES_CATEGORY,
            FUNCTIONS_CATEGORY
        ];
        this.config.toolbox = ngxToolboxBuilder.build();
    }

    public customBlocks = [
        new ExampleBlock(null, new ExampleMutator('example_mutator'))
    ];

    public config: NgxBlocklyConfig = {
        toolbox: '<xml id="toolbox" style="display: none">' +
            '<category name="Logic" colour="%{BKY_LOGIC_HUE}">' +
            '<block type="controls_if"></block>' +
            '<block type="controls_repeat_ext"></block>' +
            '<block type="logic_compare"></block>' +
            '<block type="math_number_property"></block>' +
            '<block type="math_number"></block>' +
            '<block type="math_arithmetic"></block>' +
            '<block type="text"></block>' +
            '<block type="text_print"></block>' +
            '<block type="example_block"></block>' +
            '</category>' +
            '</xml>',
        scrollbars: true,
        trashcan: true,
        search: {
            enabled: true
        }
    };


    public generatorConfig: NgxBlocklyGeneratorConfig = {
        dart: true,
        javascript: true,
        lua: true,
        php: true,
        python: true,
    };

    onCode(code: string) {
        console.log(code);
    }
}
