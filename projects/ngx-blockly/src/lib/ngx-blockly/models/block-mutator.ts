export abstract class BlockMutator {

    private _name: string;

    constructor(name: string) {
        this._name = name;
    }

    public abstract mutationToDom();

    public abstract domToMutation(xml: any);

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }
}
