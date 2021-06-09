import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {
    Button,
    Category,
    COLOUR_CATEGORY,
    CustomBlock,
    FUNCTIONS_CATEGORY,
    Label,
    LISTS_CATEGORY,
    LOGIC_CATEGORY,
    LOOP_CATEGORY,
    MATH_CATEGORY,
    NgxBlocklyComponent,
    NgxBlocklyConfig,
    NgxBlocklyGenerator,
    NgxToolboxBuilderService,
    Separator,
    TEXT_CATEGORY,
    VARIABLES_CATEGORY
} from 'ngx-blockly';
import { ExampleBlock } from './blocks/example.block';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

    public readonly = false;

    public customBlocks: CustomBlock[] = [
        new ExampleBlock()
    ];
    public button: Button = new Button('asd', 'asdasd');
    public label: Label = new Label('asd', 'asdasd');

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
        trashcan: true,
        generators: [
            NgxBlocklyGenerator.DART,
            NgxBlocklyGenerator.LUA,
            NgxBlocklyGenerator.JAVASCRIPT,
            NgxBlocklyGenerator.PHP,
            NgxBlocklyGenerator.PYTHON,
            NgxBlocklyGenerator.XML
        ],
        defaultBlocks: true,
        move: {
            scrollbars: true
        }

        // plugins: {
        //     'toolbox': NgxBlocklyToolbox
        // },

    };

    @ViewChild('blockly') blocklyComponent: NgxBlocklyComponent;

    constructor(ngxToolboxBuilder: NgxToolboxBuilderService) {
        ngxToolboxBuilder.nodes = [
            LOGIC_CATEGORY,
            new Category('bla', '#ff0000', [...this.customBlocks, this.button, this.label]),
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

    ngAfterViewInit(): void {
        // Blockly.Variables.createVariable(this.blocklyComponent.workspace, null, 'asdasd');
        // this.blocklyComponent.workspace.createVariable('asdads', null, null);
    }

    onCode(code: string) {
        console.log(code);
    }
}
