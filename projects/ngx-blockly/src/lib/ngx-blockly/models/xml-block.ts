import { Block } from './block';

export class XmlBlock extends Block {

    private _values: Value[] = [];
    private _field: Field;
    private _mutation: Mutation;
    private _shadow: boolean;

    constructor(type: string, shadow = false) {
        super(type);
        this._shadow = shadow;
    }

    get values(): Value[] {
        return this._values;
    }

    set values(value: Value[]) {
        this._values = value;
    }

    get field(): Field {
        return this._field;
    }

    set field(value: Field) {
        this._field = value;
    }

    get mutation(): Mutation {
        return this._mutation;
    }

    set mutation(mutation: Mutation) {
        this._mutation = mutation;
    }

    public toXML(): string {
        const tagName = this._shadow ? 'shadow' : 'block';
        let xml = '<' + tagName + ' type="' + this.type + '">';
        for (const value of this.values) {
            xml += value.toXML();
        }
        xml += this.field ? this.field.toXML() : '';
        if (this._mutation) {
            xml += this._mutation.toXML();
        }
        xml += '</' + tagName + '>';
        return xml;
    }
}

export class Value {
    private _name: string;
    private _block: XmlBlock;

    constructor(name: string, block: XmlBlock) {
        this._name = name;
        this._block = block;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get block(): XmlBlock {
        return this._block;
    }

    set block(value: XmlBlock) {
        this._block = value;
    }

    public toXML(): string {
        return `<value name="${this.name}">` + this.block.toXML() + '</value>';
    }
}

export class Field {
    private _name: string;
    private _value: string;

    constructor(name: string, value: string) {
        this._name = name;
        this._value = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get value(): string {
        return this._value;
    }

    set value(value: string) {
        this._value = value;
    }

    public toXML(): string {
        return `<field name="${this.name}">` + this.value + '</field>';
    }
}

export class Mutation {

    private _name: string;
    private _value: string;

    constructor(name: string, value: string) {
        this._name = name;
        this._value = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get value(): string {
        return this._value;
    }

    set value(value: string) {
        this._value = value;
    }

    public toXML(): string {
        return '<mutation ' + this.name + ' = "' + this.value + '"></mutation>';
    }
}
