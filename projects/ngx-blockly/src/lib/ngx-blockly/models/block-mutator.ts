export abstract class BlockMutator {

    private _name: string;
    private _blockList: string[];

    constructor(name: string, blockList: string[] = null) {
        this._name = name;
        this._blockList = blockList;
    }

    public abstract decompose(block: any, workspace: any);

    public abstract compose(block: any, topBlock: any);

    public abstract saveConnections(block: any, containerBlock: any);

    public abstract afterBlockInit(block: any);

    public abstract saveExtraState();

    public abstract loadExtraState(state);

    /**
     * @deprecated Use saveExtraState instead
     * https://developers.google.com/blockly/guides/create-custom-blocks/extensions#saveextrastate_and_loadextra
     */
    public mutationToDom(block: any) {
    }

    /**
     * @deprecated Use loadExtraState instead
     * https://developers.google.com/blockly/guides/create-custom-blocks/extensions#saveextrastate_and_loadextrastate
     */
    public domToMutation(block: any, xmlElement: any) {
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get blockList(): string[] {
        return this._blockList;
    }

    set blockList(value: string[]) {
        this._blockList = value;
    }
}
