import { Component } from '@angular/core';
import { NgxBlocklyConfig } from '../../projects/ngx-blockly/src/lib/ngx-blockly/ngx-blockly.config';
import { NgxBlocklyGeneratorConfig } from '../../projects/ngx-blockly/src/lib/ngx-blockly/ngx-blockly-generator.config';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    public config: NgxBlocklyConfig = {
        toolbox: '<xml id="toolbox" style="display: none">' +
            '<block type="controls_if"></block>' +
            '<block type="controls_repeat_ext"></block>' +
            '<block type="logic_compare"></block>' +
            '<block type="math_number"></block>' +
            '<block type="math_arithmetic"></block>' +
            '<block type="text"></block>' +
            '<block type="text_print"></block>' +
            '</xml>',
        scrollbars: true,
        trashcan: true
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
