## Setup

### Installation

Install from npm repository:
```
npm install ngx-blockly --save
```

Add the blockly scripts in `angular.json`

```json
"scripts": [
    "node_modules/ngx-blockly/scripts/blockly/blockly_compressed.js",
    "node_modules/ngx-blockly/scripts/blockly/blocks_compressed.js",
    "node_modules/ngx-blockly/scripts/blockly/python_compressed.js",
    "node_modules/ngx-blockly/scripts/blockly/msg/js/en.js",
]
```

### Sample
Example app.module.ts
```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NgxBlocklyModule } from 'ngx-blockly';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxBlocklyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```
'Example app.component.ts'
```typescript
import {NgxBlocklyConfig } from 'ngx-blockly';

export class AppComponent {
    
    public config: NgxBlocklyConfig = {
        toolbox: '<xml id="toolbox" style="display: none">' +
                    '<block type="controls_if"></block>' +
                    '<block type="controls_repeat_ext"></block>' +
                    '<block type="logic_compare"></block>' +
                    '<block type="math_number"></block>' +
                    '<block type="math_arithmetic"></block>' +
                    '<block type="text"></block>' +
                    '<block type="text_print"></block>' +
                 '</xml>',
        scrollbars: true,
        trashcan: true
    };
}
```
Example app.component.ts
```html
<ngx-blockly [config]="config"></ngx-blockly>

```
### Styling
```scss
ngx-blockly {
  position: absolute;
  width: 100%;
  height: 100%;
}
```

### Configuration 
Default Blockly Configuration (see https://developers.google.com/blockly/guides/get-started/web#configuration)
```typescript
export class NgxBlocklyConfig {
    collapse?: boolean; // Allows blocks to be collapsed or expanded. Defaults to true if the toolbox has categories, false otherwise.
    comments?: boolean; // Allows blocks to have comments. Defaults to true if the toolbox has categories, false otherwise.
    css?: boolean; // If false, don't inject CSS (providing CSS becomes the document's responsibility). Defaults to true.
    disable?: boolean; // If false, don't inject CSS (providing CSS becomes the document's responsibility). Defaults to true.
    grid?: {
        spacing: number,
        length: number,
        colour: string,
        snap: boolean
    };
    horizontalLayout?: boolean; // If true toolbox is horizontal, if false toolbox is vertical. Defaults to false.
    maxBlocks?: number; // 	Maximum number of blocks that may be created. Useful for student exercises. Defaults to Infinity.
    maxInstances?: object; // Map from block types to maximum number of blocks of that type that may be created. Undeclared types default to Infinity.
    media?: string; // Path from page (or frame) to the Blockly media directory. Defaults to "https://blockly-demo.appspot.com/static/media/"
    oneBasedIndex?: boolean; // If true list and string operations should index from 1, if false index from 0. Defaults to true.
    readonly?: boolean; // If true, prevent the user from editing. Supresses the toolbox and trashcan. Defaults to false.
    rtl?: boolean; // If true, mirror the editor (for Arabic or Hebrew locales). Defaults to false.
    scrollbars?: boolean; // Sets whether the workspace is scrollable or not. Defaults to true if the toolbox has categories, false otherwise
    sounds?: boolean; // If false, don't play sounds (e.g. click and delete). Defaults to true.
    theme?: any; // Defaults to classic theme if no theme is provided. (https://developers.google.com/blockly/guides/configure/web/themes)
    toolbox?: string; // Tree structure of categories and blocks available to the user
    toolboxPosition?: string; // If "start" toolbox is on top (if horizontal) or left (if vertical and LTR) or right (if vertical and RTL). If "end" toolbox is on opposite side. Defaults to "start".
    trashcan?: boolean; // Displays or hides the trashcan. Defaults to true if the toolbox has categories, false otherwise.
    maxTrashcanContents?: number; // Maximum number of deleted items that will appear in the trashcan flyout. '0' disables the feature. Defaults to '32'.
    zoom?: {
        controls: boolean,
        wheel: boolean,
        startScale: number,
        maxScale: number,
        minScale: number,
        scaleSpeed: number
    };

}
```
Blockly Generator Config
```typescript
export class NgxBlocklyGeneratorConfig {
    dart?: boolean;
    javascript?: boolean;
    lua?: boolean;
    php?: boolean;
    python?: boolean;
}

```
### Code Generation
```typescript
import { Component } from '@angular/core';
import { NgxBlocklyConfig, NgxBlocklyGeneratorConfig } from 'ngx-blockly';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    public config: NgxBlocklyConfig = {
        toolbox: '<xml id="toolbox" style="display: none">' +
            '<block type="controls_if"></block>' +
            '<block type="controls_repeat_ext"></block>' +
            '<block type="logic_compare"></block>' +
            '<block type="math_number"></block>' +
            '<block type="math_arithmetic"></block>' +
            '<block type="text"></block>' +
            '<block type="text_print"></block>' +
            '</xml>',
        scrollbars: true,
        trashcan: true
    };


    public generatorConfig: NgxBlocklyGeneratorConfig = {
        dart: true,
        javascript: true,
        lua: true,
        php: true,
        python: true,
    };

    onCode(code: string) {
        console.log(code);
    }
}

```
```html
<ngx-blockly [config]="config" [generatorConfig]="generatorConfig" (javascriptCode)="onCode($event)" (pythonCode)="onCode($event)"></ngx-blockly>

```

