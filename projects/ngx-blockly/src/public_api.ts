/*
 * Public API Surface of ngx-blockly
 */
import * as Blockly from 'blockly/core';

export { Blockly };

// Locales
import * as EN from 'blockly/msg/en';

Blockly.setLocale(EN);

export * from './lib/ngx-blockly/ngx-blockly.component';
export * from './lib/ngx-blockly/ngx-blockly.config';
export * from './lib/ngx-blockly/ngx-blockly-generator.config';
export * from './lib/ngx-blockly/models/block';
export * from './lib/ngx-blockly/models/custom-block';
export * from './lib/ngx-blockly/models/xml-block';
export * from './lib/ngx-blockly/models/category';
export * from './lib/ngx-blockly/models/button';
export * from './lib/ngx-blockly/models/label';
export * from './lib/ngx-blockly/models/separator';
export * from './lib/ngx-blockly/models/theme';
export * from './lib/ngx-blockly/models/node';
export * from './lib/ngx-blockly/models/block-mutator';
export * from './lib/ngx-blockly/plugins/ngx-blockly.toolbox';
export * from './lib/ngx-blockly/services/ngx-toolbox-builder.service';
export * from './lib/ngx-blockly.module';










