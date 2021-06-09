import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgxBlocklyComponent } from './ngx-blockly/ngx-blockly.component';
import { NgxToolboxBuilderService } from './ngx-blockly/services/ngx-toolbox-builder.service';
import * as Blockly from 'blockly/core';

@NgModule({
    declarations: [NgxBlocklyComponent],
    imports: [],
    exports: [NgxBlocklyComponent],
    providers: [NgxToolboxBuilderService],
    schemas: [NO_ERRORS_SCHEMA]
})
export class NgxBlocklyModule {
}

Blockly.ToolboxCategory.prototype.parseContents_ = function (categoryDef) {
    const contents = categoryDef['contents'];
    if (categoryDef['custom']) {
        this.flyoutItems_ = categoryDef['custom'];
    } else if (contents) {
        for (let i = 0, itemDef; (itemDef = contents[i]); i++) {
            const flyoutItem = (itemDef);
            this.flyoutItems_.push(flyoutItem);
        }
    }
    if (categoryDef['categoryclass']) {
        this.cssConfig_.row += ' ' + categoryDef['categoryclass'];
    }
};

Blockly.CollapsibleToolboxCategory.prototype.parseContents_ = function (categoryDef) {
    const contents = categoryDef['contents'];
    let prevIsFlyoutItem = true;
    if (categoryDef['custom']) {
        this.flyoutItems_ = categoryDef['custom'];
    } else if (contents) {
        for (let i = 0, itemDef; (itemDef = contents[i]); i++) {
            // Separators can exist as either a flyout item or a toolbox item so
            // decide where it goes based on the type of the previous item.
            if (!Blockly.registry.hasItem(Blockly.registry.Type.TOOLBOX_ITEM, itemDef['kind']) ||
                (itemDef['kind'].toLowerCase() === Blockly.ToolboxSeparator.registrationName &&
                    prevIsFlyoutItem)) {
                const flyoutItem = (itemDef);
                this.flyoutItems_.push(flyoutItem);
                prevIsFlyoutItem = true;
            } else {
                this.createToolboxItem_(itemDef);
                prevIsFlyoutItem = false;
            }
        }
    }
    if (categoryDef['categoryclass']) {
        this.cssConfig_.row += ' ' + categoryDef['categoryclass'];
    }
};

