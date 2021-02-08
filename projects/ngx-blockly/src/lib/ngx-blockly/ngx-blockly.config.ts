declare var Blockly: any;

export class NgxBlocklyConfig extends Blockly.BlocklyOptions {
    search?: {
        enabled: boolean,
        placeholder?: string
        category?: {
            name?: string,
            color?: string
        }
    };
}
