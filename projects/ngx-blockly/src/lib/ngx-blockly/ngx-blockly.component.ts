import { AfterViewInit, Component, EventEmitter, HostListener, Input, OnInit, Output, OnChanges, SimpleChange } from '@angular/core';
import { NgxBlocklyConfig } from './ngx-blockly.config';
import { NgxBlocklyGeneratorConfig } from './ngx-blockly-generator.config';
import { CustomBlock } from './models/custom-block';
import { NgxToolboxBuilderService } from './services/ngx-toolbox-builder.service';
import { Category } from './models/category';

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

    private _xml = null;
    private _searchbarTimeout;
    private readonly _SEARCHBAR_CLASS = 'searchbar';
    private readonly _TOOLBAR_CLASS = 'toolbar';

    constructor(
        private _ngxToolboxBuilder: NgxToolboxBuilderService
    ) {}

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
       this._initWorkspace();
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        setTimeout(() => this.resize(), 200);
    }

    ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
        if (changes.config && !changes.config.firstChange) {
            this._initWorkspace();
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
        if (this.generatorConfig.xml && this._xml) {
            this.xmlCode.emit(this._xml);
        }
    }

    public toXml(): string {
        if (this._xml) {
            return this._xml;
        }
        return Blockly.Xml.domToPrettyText(Blockly.Xml.workspaceToDom(this.workspace));
    }

    public fromXml(xml: string) {
        this._xml = xml;
        Blockly.Xml.clearWorkspaceAndLoadFromXml(Blockly.Xml.textToDom(xml), this.workspace);
    }

    public appendFromXml(xml: string) {
        const workspace = new Blockly.Workspace();
        Blockly.Xml.clearWorkspaceAndLoadFromXml(Blockly.Xml.textToDom(this.toXml()), workspace);
        Blockly.Xml.appendDomToWorkspace(Blockly.Xml.textToDom(xml), workspace);
        this.fromXml(Blockly.Xml.domToPrettyText(Blockly.Xml.workspaceToDom(workspace)));
        workspace.dispose();
    }

    public clear() {
        if (this.workspace) {
            this.workspace.clear();
        }
        if (this._searchbarInput) {
            this._searchbarInput.value = '';
        }
    }

    protected resize() {
        Blockly.svgResize(this.workspace);
    }

    private _initWorkspace() {

        if (this.workspace) {
            this.workspace.dispose();
        }

        this.workspace = Blockly.inject('blockly', this.config);
        this.workspace.addChangeListener((event) => {
            this._onWorkspaceChange(event);
        });

        if (this._xml) {
            this.fromXml(this._xml);
        }

        this._initSearchbar();
        this.resize();
    }

    private _onWorkspaceChange(event: any) {
        if (!this.config.readOnly) {
            this._xml = Blockly.Xml.domToPrettyText(Blockly.Xml.workspaceToDom(Blockly.Workspace.getById(event.workspaceId)));
        }
        this.workspaceChange.emit(event);
        this.workspaceToCode(event.workspaceId);
    }

    private _initSearchbar() {
        if (this.config.search) {
            if (this.workspace) {
                const toolbox = this.workspace.getToolbox();
                if (toolbox) {
                    if (!this._searchbarInput && this.config.search.enabled) {
                        const input = document.createElement('input');
                        input.placeholder = this.config.search.placeholder ? this.config.search.placeholder : 'Search ...';
                        input.className = this._SEARCHBAR_CLASS;
                        input.size = 1;
                        input.addEventListener ('keyup', this._searchBlocks.bind(this));
                        toolbox.HtmlDiv.firstChild.classList.add(this._TOOLBAR_CLASS);
                        toolbox.HtmlDiv.insertBefore(input, toolbox.HtmlDiv.firstChild);
                    } else if (this._searchbarInput && !this.config.search.enabled) {
                        toolbox.HtmlDiv.removeChild(this._searchbarInput);
                        toolbox.HtmlDiv.firstChild.classList.remove(this._TOOLBAR_CLASS);
                    }
                }
            }
        }
    }

    private _searchBlocks(event) {
        clearTimeout(this._searchbarTimeout);
        if (this.workspace) {
            const toolbox = this.workspace.getToolbox();
            if (toolbox) {
                this._searchbarTimeout = setTimeout(() => {
                    const blocks = toolbox.searchBlocks(event.target.value);
                    if (blocks.length > 0) {
                        // build search result xml
                        const category = this.config.search.category;
                        this._ngxToolboxBuilder.nodes = [
                            new Category(
                                category && category.name ? category.name : 'Search',
                                category && category.color ? category.color : '#ccc',
                                blocks
                            )
                        ];
                        const searchResultXmlString = this._ngxToolboxBuilder.build();
                        const searchResultXml: any = Blockly.Options.parseToolboxTree(searchResultXmlString);
                        // add first node of search result xml to toolbox
                        const toolboxXml: any = Blockly.Options.parseToolboxTree(this.config.toolbox);
                        toolboxXml.insertBefore(searchResultXml.firstChild, toolboxXml.firstChild);
                        // parse toolbox xml back to string
                        const toolboxXmlString = Blockly.Xml.domToText(toolboxXml);
                        // update toolbox
                        this.workspace.updateToolbox(toolboxXmlString);
                        toolbox.selectFirstCategory();
                    } else {
                        this.workspace.updateToolbox(this.config.toolbox);
                        const flyout = this.workspace.getFlyout();
                        if (flyout) {
                            flyout.hide();
                        }
                    }
                }, 100);
            }
        }
    }

    private get _searchbarInput() {
        let searchbar = null;
        if (this.workspace) {
            const toolbox = this.workspace.getToolbox();
            if (toolbox) {
                const elements = toolbox.HtmlDiv.getElementsByClassName(this._SEARCHBAR_CLASS);
                searchbar = elements.length > 0 ? elements[0] : null;
            }
        }
        return searchbar;
    }
}
