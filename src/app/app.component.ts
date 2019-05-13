import { Component } from '@angular/core';
import { NgxBlocklyConfig } from '../../projects/ngx-blockly/src/lib/ngx-blockly/ngx-blockly.config';
import { NgxBlocklyGeneratorConfig } from '../../projects/ngx-blockly/src/lib/ngx-blockly/ngx-blockly-generator.config';
import { Block } from '../../projects/ngx-blockly/src/lib/ngx-blockly/models/block';
import { TestBlock } from './block/test-block';
import { DeviceBlock } from './block/device-block';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    public config: NgxBlocklyConfig = {
        toolbox: '<xml id="toolbox" style="display: none">' +
            '<category name="Fischertechnik" colour="#FF0000">' +
            '<block type="device"></block>' +
            '<block type="test"></block>' +
            '</category>' +
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

    public customBlocks: Block[] = [
        new TestBlock('test', [], null),
        new DeviceBlock('device', [], null)
    ];


    constructor() {
    }

    onCode(code: string) {
        console.log(code);
    }
}
