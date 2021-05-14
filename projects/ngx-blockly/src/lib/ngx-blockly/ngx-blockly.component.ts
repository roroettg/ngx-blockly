import {
    Component, OnInit, OnDestroy, AfterViewInit, OnChanges,
    EventEmitter, HostListener, Input, Output, SimpleChange, ViewChild, ElementRef
} from '@angular/core';
import { NgxBlocklyConfig } from './ngx-blockly.config';
import { NgxBlocklyGeneratorConfig } from './ngx-blockly-generator.config';
import { CustomBlock } from './models/custom-block';

declare var Blockly: any;

@Component({
    selector: 'ngx-blockly',
    templateUrl: './ngx-blockly.component.html',
    styleUrls: ['./ngx-blockly.component.css']
})
export class NgxBlocklyComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

    @Input() public readonly = false;
    @Input() public config: NgxBlocklyConfig = {};
    @Input() public generatorConfig: NgxBlocklyGeneratorConfig = {};
    @Input() public customBlocks: CustomBlock[] = [];
    @Output() public workspaceChange: EventEmitter<any> = new EventEmitter<any>();
    @Output() public toolboxChange: EventEmitter<any> = new EventEmitter<any>();
    @Output() public dartCode: EventEmitter<string> = new EventEmitter<string>();
    @Output() public javascriptCode: EventEmitter<string> = new EventEmitter<string>();
    @Output() public luaCode: EventEmitter<string> = new EventEmitter<string>();
    @Output() public phpCode: EventEmitter<string> = new EventEmitter<string>();
    @Output() public pythonCode: EventEmitter<string> = new EventEmitter<string>();
    @Output() public xmlCode: EventEmitter<string> = new EventEmitter<string>();

    @ViewChild('primaryContainer') primaryContainer: ElementRef;
    @ViewChild('secondaryContainer') secondaryContainer: ElementRef;
    public workspace: any;
    private _secondaryWorkspace: any;
    private _resizeTimeout;

    ngOnInit(): void {

        if (this.customBlocks) {
            for (const customBlock of this.customBlocks) {
                Blockly.Blocks[customBlock.type] = {
                    init: function () {
                        const block = new customBlock.class(customBlock.type, customBlock.blockMutator, ...customBlock.args);
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
        this.config.readOnly = false;
        this.workspace = Blockly.inject(this.primaryContainer.nativeElement, this.config);
        this.workspace.addChangeListener(this._onWorkspaceChange.bind(this));
        this.resize();
    }

    ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
        if (changes.readonly) {
            this.setReadonly(changes.readonly.currentValue);
        }
    }

    ngOnDestroy() {
        if (this.workspace) {
            this.workspace.dispose();
        }
        if (this._secondaryWorkspace) {
            this._secondaryWorkspace.dispose();
        }
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        clearTimeout(this._resizeTimeout);
        this._resizeTimeout = setTimeout(() => this.resize(), 200);
    }

    /**
     * Generate code for all blocks in the workspace to the specified output.
     * @param workspaceId Workspace to generate code from.
     */
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

    /**
     * Converts a DOM structure into properly indented text.
     * @return Text representation.
     */
    public toXml(): string {
        return Blockly.Xml.domToPrettyText(Blockly.Xml.workspaceToDom(this.workspace));
    }

    /**
     * Clear the given workspace then decode an XML DOM and
     * create blocks on the workspace.
     * @param xml XML DOM..
     */
    public fromXml(xml: string) {
        Blockly.Xml.clearWorkspaceAndLoadFromXml(Blockly.Xml.textToDom(xml), this.workspace);
        if (this._secondaryWorkspace) {
            Blockly.Xml.clearWorkspaceAndLoadFromXml(Blockly.Xml.textToDom(xml), this._secondaryWorkspace);
        }
    }

    /**
     * Decode an XML DOM and create blocks on the workspace. Position the new
     * blocks immediately below prior blocks, aligned by their starting edge.
     * @param xml The XML DOM.
     */
    public appendFromXml(xml: string) {
        Blockly.Xml.appendDomToWorkspace(Blockly.Xml.textToDom(xml), this.workspace);
        if (this._secondaryWorkspace) {
            Blockly.Xml.appendDomToWorkspace(Blockly.Xml.textToDom(xml), this._secondaryWorkspace);
        }
    }

    /**
     * Dispose of all blocks in workspace, with an optimization to prevent resizes.
     */
    public clear() {
        if (this.workspace) {
            this.workspace.clear();
        }
    }

    /**
     * Clear the undo/redo stacks.
     */
    public clearUndo() {
        if (this.workspace) {
            this.workspace.clearUndo();
        }
    }

    /**
     * Clear the reference to the current gesture.
     */
    public clearGesture() {
        if (this.workspace) {
            this.workspace.clearGesture();
        }
    }

    /**
     * Clear search input and result set.
     */
    public clearSearch() {
        if (this.workspace) {
            const toolbox = this.workspace.getToolbox();
            if (toolbox && typeof toolbox.clearSearch === 'function') {
                this.workspace.getToolbox().clearSearch();
            }
        }
    }

    /**
     * Clear the clipboard.
     */
    public clearClipboard() {
        Blockly.clipboardXml_ = null;
        Blockly.clipboardSource_ = null;
        Blockly.clipboardTypeCounts_ = null;
    }

    /**
     * Size the workspace when the contents change. This also updates
     * scrollbars accordingly.
     */
    public resize() {
        if (this.workspace) {
            Blockly.svgResize(this.workspace);
        }
    }

    public setReadonly(readonly: boolean) {
        if (readonly) {
            this.secondaryContainer.nativeElement.classList.remove('hidden');
            if (!this._secondaryWorkspace) {
                const config = {...this.config};
                config.readOnly = true;
                this._secondaryWorkspace = Blockly.inject(this.secondaryContainer.nativeElement, config);
            }
            Blockly.Xml.clearWorkspaceAndLoadFromXml(Blockly.Xml.textToDom(this.toXml()), this._secondaryWorkspace);
        } else {
            if (this._secondaryWorkspace) {
                this._secondaryWorkspace.dispose();
                this.secondaryContainer.nativeElement.classList.add('hidden');
            }
        }
    }

    public highlightBlock(blockId: string) {
        if (this.workspace) {
            this.workspace.highlightBlock(blockId);
        }
        if (this._secondaryWorkspace) {
            this._secondaryWorkspace.highlightBlock(blockId);
        }
    }

    private _onWorkspaceChange(event: any) {
        this.workspaceToCode(event.workspaceId);
        this.workspaceChange.emit(event);
        if (event.type === Blockly.Events.TOOLBOX_ITEM_SELECT) {
            this.toolboxChange.emit(event);
        }
    }
}
