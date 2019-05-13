import { Block } from './block';

export class XmlBlock extends Block {

    private _values: Value[] = [];
    private _field: Field;

    constructor(type: string) {
        super(type);
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

    public toXML(): string {
        let xml = `<block type="${this.type}">`;

        for (const value of this.values) {
            xml += value.toXML();
        }
        xml += this.field ? this.field.toXML() : '';
        xml += '</block>';
        return xml;
    }
}

export class Value {
    private _name: string;
    private _shadow: XmlBlock;
    private _block: XmlBlock;

    constructor(name: string, shadow: XmlBlock, block: XmlBlock) {
        this._name = name;
        this._shadow = shadow;
        this._block = block;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get shadow(): XmlBlock {
        return this._shadow;
    }

    set shadow(value: XmlBlock) {
        this._shadow = value;
    }

    get block(): XmlBlock {
        return this._block;
    }

    set block(value: XmlBlock) {
        this._block = value;
    }

    public toXML(): string {
        return `<value name="${this.name}">` +
        this.block ? this.block.toXML() : '' +
        this.shadow ? this.shadow.toXML() : '' +
            '</value>';
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
