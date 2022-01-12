import * as Blockly from 'blockly/core';
import { BlockStyle } from './models/theme';

export enum NgxBlocklyGenerator {
    DART = 'Dart',
    JAVASCRIPT = 'JavaScript',
    LUA = 'Lua',
    PHP = 'PHP',
    PYTHON = 'Python',
    XML = 'Xml'
}

export interface NgxBlocklyConfig extends Blockly.BlocklyOptions {
    defaultBlocks?: boolean;
    generators?: NgxBlocklyGenerator[];
    plugins?: { [name: string]: any };
}
