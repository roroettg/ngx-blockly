export abstract class BlockMutator {

    private _name: string;

    constructor(name: string) {
        this._name = name;
    }

    public abstract mutationToDom();

    public abstract domToMutation(xmlElement: any);

    public abstract decompose(workspace: any);

    public abstract compose(topBlock: any);

    public abstract saveConnections(containerBlock: any);

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }
}
