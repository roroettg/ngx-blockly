import { AfterViewInit, Component, EventEmitter, HostListener, Input, OnInit, Output, OnChanges, SimpleChange } from '@angular/core';
import { NgxBlocklyConfig } from './ngx-blockly.config';
import { NgxBlocklyGeneratorConfig } from './ngx-blockly-generator.config';
import { CustomBlock } from './models/custom-block';

declare var Blockly: any;

@Component({
    selector: 'ngx-blockly',
    templateUrl: './ngx-blockly.component.html',
    styleUrls: ['./ngx-blockly.component.css']
})
export class NgxBlocklyComponent implements OnInit, AfterViewInit, OnChanges {

    @Input() public config: NgxBlocklyConfig = {};
    @Input() public generatorConfig: NgxBlocklyGeneratorConfig = {};
    @Input() public customBlocks: CustomBlock[] = [];
    @Output() public workspaceChange: EventEmitter<any> = new EventEmitter<any>();
    @Output() public dartCode: EventEmitter<string> = new EventEmitter<string>();
    @Output() public javascriptCode: EventEmitter<string> = new EventEmitter<string>();
    @Output() public luaCode: EventEmitter<string> = new EventEmitter<string>();
    @Output() public phpCode: EventEmitter<string> = new EventEmitter<string>();
    @Output() public pythonCode: EventEmitter<string> = new EventEmitter<string>();
    @Output() public xmlCode: EventEmitter<string> = new EventEmitter<string>();

    public workspace: any;

    constructor() {
    }

    ngOnInit(): void {
        if (this.customBlocks) {
            for (const customBlock of this.customBlocks) {
                Blockly.Blocks[customBlock.type] = {
                    init: function () {
                        const block = new customBlock.class(customBlock.type, this, customBlock.blockMutator, ...customBlock.args);
                        block.init(this);
                        this.mixin({
                                blockInstance: block
                            }
                        );
                    }
                };
                if (typeof Blockly.Python !== 'undefined') {
                    Blockly.Python[customBlock.type] = function (b) {
                        return b.blockInstance.toPythonCode(b);
                    };
                }
                if (typeof Blockly.Dart !== 'undefined') {
                    Blockly.Dart[customBlock.type] = function (b) {
                        return b.blockInstance.toDartCode(b);
                    };
                }
                if (typeof Blockly.JavaScript !== 'undefined') {
                    Blockly.JavaScript[customBlock.type] = function (b) {
                        return b.blockInstance.toJavaScriptCode(b);
                    };
                }
                if (typeof Blockly.Lua !== 'undefined') {
                    Blockly.Lua[customBlock.type] = function (b) {
                        return b.blockInstance.toLuaCode(b);
                    };
                }
                if (typeof Blockly.PHP !== 'undefined') {
                    Blockly.PHP[customBlock.type] = function (b) {
                        return b.blockInstance.toPHPCode(b);
                    };
                }
                if (customBlock.blockMutator) {
                    const mutator_mixin: any = {
                        mutationToDom: function () {
                            return customBlock.blockMutator.mutationToDom.call(customBlock.blockMutator, this);
                        },
                        domToMutation: function (xmlElement: any) {
                            customBlock.blockMutator.domToMutation.call(customBlock.blockMutator, this, xmlElement);
                        }
                    };
                    if (customBlock.blockMutator.blockList && customBlock.blockMutator.blockList.length > 0) {
                        mutator_mixin.decompose = function(workspace: any) {
                            return customBlock.blockMutator.decompose.call(customBlock.blockMutator, this, workspace);
                        };
                        mutator_mixin.compose = function(topBlock: any) {
                            customBlock.blockMutator.compose.call(customBlock.blockMutator, this, topBlock);
                        };
                        mutator_mixin.saveConnections = function(containerBlock: any) {
                            customBlock.blockMutator.saveConnections.call(customBlock.blockMutator, this, containerBlock);
                        };
                    }
                    Blockly.Extensions.unregister(customBlock.blockMutator.name);
                    Blockly.Extensions.registerMutator(
                        customBlock.blockMutator.name,
                        mutator_mixin,
                        function() {
                            customBlock.blockMutator.afterBlockInit.call(customBlock.blockMutator, this);
                        },
                        customBlock.blockMutator.blockList
                    );
                }
            }
        }
    }

    ngAfterViewInit() {
       this._init();
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        setTimeout(() => this.resize(), 200);
    }

    ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
        if (changes.config && !changes.config.firstChange) {
            this._init();
        }
    }

    public workspaceToCode(workspaceId: string) {
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
        if (this.generatorConfig.xml) {
            this.xmlCode.emit(Blockly.Xml.domToPrettyText(Blockly.Xml.workspaceToDom(Blockly.Workspace.getById(workspaceId))));
        }
    }

    public toXml(): string {
        return Blockly.Xml.domToPrettyText(Blockly.Xml.workspaceToDom(this.workspace));
    }

    public fromXml(xml: string) {
        Blockly.Xml.clearWorkspaceAndLoadFromXml(Blockly.Xml.textToDom(xml), this.workspace);
    }

    public appendFromXml(xml: string) {
        Blockly.Xml.appendDomToWorkspace(Blockly.Xml.textToDom(xml), this.workspace);
    }

    protected resize() {
        Blockly.svgResize(this.workspace);
    }

    private _init() {
        let xml: string;
        if (this.workspace) {
            xml = this.toXml();
            this.workspace.dispose();
        }
        this.workspace = Blockly.inject('blockly', this.config);
        this.workspace.addChangeListener(($event) => {
            this._onWorkspaceChange($event);
        });
        if (xml) {
            this.fromXml(xml);
        }
        this.resize();
    }

    private _onWorkspaceChange($event: any) {
        this.workspaceChange.emit($event);
        this.workspaceToCode($event.workspaceId);
    }
}
