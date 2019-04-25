import { AfterViewInit, Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { NgxBlocklyConfig } from './ngx-blockly.config';
import { NgxBlocklyGeneratorConfig } from './ngx-blockly-generator.config';

declare var Blockly: any;

@Component({
    selector: 'ngx-blockly',
    templateUrl: './ngx-blockly.component.html',
    styleUrls: ['./ngx-blockly.component.css']
})
export class NgxBlocklyComponent implements AfterViewInit {
    @Input() public config: NgxBlocklyConfig = {};
    @Input() public generatorConfig: NgxBlocklyGeneratorConfig = {};
    @Output() public dartCode: EventEmitter<string> = new EventEmitter<string>();
    @Output() public javascriptCode: EventEmitter<string> = new EventEmitter<string>();
    @Output() public luaCode: EventEmitter<string> = new EventEmitter<string>();
    @Output() public phpCode: EventEmitter<string> = new EventEmitter<string>();
    @Output() public pythonCode: EventEmitter<string> = new EventEmitter<string>();

    public workspace: any;

    constructor() {

    }

    ngAfterViewInit() {
        if (!this.workspace) {
            this.workspace = Blockly.inject('blockly', this.config);
            this.workspace.addChangeListener(($event) => {
                this.onWorkspaceChange($event);
            });
            this.resize();
        }

    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        setTimeout(() => this.resize(), 200);
    }

    protected resize() {
        Blockly.svgResize(this.workspace);

    }

    private onWorkspaceChange($event: any) {
        if ($event.type === 'move' || $event.type === 'delete') {
            this.workspaceToCode($event.workspaceId);
        }
    }

    private workspaceToCode(workspaceId: string) {
        if (this.generatorConfig.dart) {
            this.dartCode.emit(Blockly.Dart.workspaceToCode(Blockly.Workspace.getById(workspaceId)));
        }
        if (this.generatorConfig.javascript) {
            this.javascriptCode.emit(Blockly.JavaScript.workspaceToCode(Blockly.Workspace.getById(workspaceId)));
        }
        if (this.generatorConfig.lua) {
            this.luaCode.emit(Blockly.Lua.workspaceToCode(Blockly.Workspace.getById(workspaceId)));
        }
        if (this.generatorConfig.php) {
            this.phpCode.emit(Blockly.PHP.workspaceToCode(Blockly.Workspace.getById(workspaceId)));
        }
        if (this.generatorConfig.python) {
            this.pythonCode.emit(Blockly.Python.workspaceToCode(Blockly.Workspace.getById(workspaceId)));
        }
    }
}
