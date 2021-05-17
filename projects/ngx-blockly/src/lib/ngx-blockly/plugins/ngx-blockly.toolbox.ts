import { UUID } from 'angular2-uuid';

export class NgxBlocklyToolbox extends Blockly.Toolbox {

    private readonly _SEARCHBAR_CLASS = 'searchbar';
    private readonly _TOOLBAR_CLASS = 'toolbar';

    protected _toolboxDefHolder: any;
    protected _timeout: any;
    protected _input: HTMLInputElement;
    protected _categoryId = UUID.UUID();
    protected _categoryExpandedCache: Map<String, boolean> = new Map<String, boolean>();

    constructor(workspace) {
        super(workspace);
        workspace.addChangeListener(this._onWorkspaceChange.bind(this));
    }

    init() {
        super.init();
        this._initSearchbar();
    }

    render(parsedToolboxDef) {
        if (parsedToolboxDef.contents.length === 0 || parsedToolboxDef.contents[0].toolboxitemid !== this._categoryId) {
            const name = Blockly.Msg.SEARCH_CATEGORY ? Blockly.Msg.SEARCH_CATEGORY : 'Search';
            const xmlDef =
            '<xml>' +
                '<category colour="#ccc" expanded="false" name="' + name + '" hidden="true" toolboxitemid="' + this._categoryId + '"></category>' +
            '</xml>';
            const jsonDef = Blockly.utils.toolbox.convertToolboxDefToJson(xmlDef);
            parsedToolboxDef.contents = [jsonDef.contents[0]].concat(parsedToolboxDef.contents);
        }
        super.render(parsedToolboxDef);
        this._restoreExpandedState();
    }

    clearSearch() {
        this._clearSearchResult();
        if (this._input) {
            this._input.value = '';
        }
    }

    private _initSearchbar() {
        this._input = document.createElement('input');
        this._input.placeholder = Blockly.Msg.SEARCH_PLACEHOLDER ? Blockly.Msg.SEARCH_PLACEHOLDER : 'search';
        this._input.className = this._SEARCHBAR_CLASS;
        this._input.size = 1;
        this._input.addEventListener ('keyup', this._search.bind(this));
        (this.HtmlDiv.firstChild as Element).classList.add(this._TOOLBAR_CLASS);
        this.HtmlDiv.insertBefore(this._input, this.HtmlDiv.firstChild);
    }

    private _search(event) {

        clearTimeout(this._timeout);
        this._timeout = setTimeout(() => {

            const searchKey = event.target.value.trim();
            if (searchKey.length > 0) {

                const result = this._recursiveSearch(searchKey, this.toolboxDef_);
                if (result.length > 0) {
                    const category = this.getToolboxItemById(this._categoryId) as Blockly.ToolboxCategory;
                    category.updateFlyoutContents(result);
                    category.show();
                    this.setSelectedItem(category);
                } else {
                    this._clearSearchResult();
                }
            } else {
                this._clearSearchResult();
            }
        }, 100);
    }

    private _recursiveSearch(searchKey, child): any[] {
        let blockDefs = [];
        if (child.contents && Array.isArray(child.contents)) {
            if (child.toolboxitemid && child.toolboxitemid === this._categoryId) {
                return blockDefs;
            }
            for (let i = 0; i < child.contents.length; i++) {
                if (typeof(child.contents[i]) === 'object' && child.contents[i].kind) {
                    if (child.contents[i].kind === 'BLOCK' && child.contents[i].type) {
                        const type = child.contents[i].type;
                        if (this._compare(searchKey, type)) {
                            blockDefs.push(child.contents[i]);
                        } else {
                            const workspace = new Blockly.Workspace();
                            const searchblock = workspace.newBlock(type);
                            if (this._compare(searchKey, searchblock.tooltip as string)) {
                                blockDefs.push(child.contents[i]);
                            }
                            workspace.dispose();
                        }
                    } else if (child.contents[i].kind === 'CATEGORY') {
                        const result = this._recursiveSearch(searchKey, child.contents[i]);
                        blockDefs = [...blockDefs, ...result];
                    }
                }
            }
        }
        return blockDefs;
    }

    private _clearSearchResult() {
        const flyout = this.workspace_.getFlyout();
        if (flyout) {
            flyout.hide();
        }
        const category = this.getToolboxItemById(this._categoryId) as Blockly.ToolboxCategory;
        if (category) {
            category.hide();
        }
    }

    private _storeExpandedState() {
        this.getToolboxItems().forEach((item: Blockly.CollapsibleToolboxCategory) => {
            if (item.getId() !== this._categoryId && typeof item.isExpanded === 'function') {
                this._categoryExpandedCache.set(item.getId(), item.isExpanded() ? true : false);
            }
        });
    }

    private _restoreExpandedState() {
        this._categoryExpandedCache.forEach((expanded: boolean, id: string) => {
            const item = this.getToolboxItemById(id) as Blockly.CollapsibleToolboxCategory;
            if (item && typeof item.setExpanded === 'function') {
                item.setExpanded(expanded);
            }
        });
    }

    private _onWorkspaceChange(event: any) {
        if (event.type === Blockly.Events.TOOLBOX_ITEM_SELECT) {
            this._storeExpandedState();
        }
    }

    private _compare(str1: string, str2: string): boolean {
        if (typeof str1 === 'string' && typeof str2 === 'string') {
            str1 = this._prepareString(str1);
            str2 = this._prepareString(str2);
            if (str1.length > 0 && str2.length > 0) {
                const array1: string[] = str1.split('_');
                const array2: string[] = str2.split('_');
                for (let i1 = 0; i1 < array1.length; i1++) {
                    for (let i2 = 0; i2 < array2.length; i2++) {
                        if (array2[i2].startsWith(array1[i1])) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

    private _prepareString(str): string {
        str = this._breakUpCamelCase(str);
        str = str.toLowerCase().trim();
        return this._replaceWhitespaceWithUnderscore(str);
    }

    private _breakUpCamelCase(str): string {
        return str.replace( /([A-Z])/g, ' $1');
    }

    private _replaceWhitespaceWithUnderscore(str): string {
        return str.replace(/\s+/g, '_');
    }
}
