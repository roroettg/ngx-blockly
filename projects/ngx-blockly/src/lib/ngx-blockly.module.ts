import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgxBlocklyComponent } from './ngx-blockly/ngx-blockly.component';
import { NgxToolboxBuilderService } from './ngx-blockly/services/ngx-toolbox-builder.service';
import { XmlBlock } from './ngx-blockly/models/xml-block';

declare var Blockly: any;

@NgModule({
    declarations: [NgxBlocklyComponent],
    imports: [],
    exports: [NgxBlocklyComponent],
    providers: [NgxToolboxBuilderService],
    schemas: [NO_ERRORS_SCHEMA]
})
export class NgxBlocklyModule {
}

/**
* A search block function
* @param value The search string
* @return blocks
*/
Blockly.Toolbox.prototype.searchBlocks =  function(value) {

    const blockTypes = new Set<string>();
    const searchWorkspace = new Blockly.Workspace();

    value = value.trim();
    if (value.length > 0) {
        recursiveSearch(this.toolboxDef_);
    }

    function recursiveSearch(child) {
        if (child.contents && Array.isArray(child.contents)) {
            for (let i = 0; i < child.contents.length; i++) {
                if (typeof(child.contents[i]) === 'object' && child.contents[i].kind) {
                    if (child.contents[i].kind === 'BLOCK' && child.contents[i].type) {
                        const type = child.contents[i].type;
                        if (compare(value, type)) {
                        blockTypes.add(type);
                        } else {
                            const searchblock = searchWorkspace.newBlock(type);
                            if (compare(value, searchblock.tooltip)) {
                                blockTypes.add(type);
                            }
                            searchWorkspace.clear();
                        }
                    } else if (child.contents[i].kind === 'CATEGORY') {
                        recursiveSearch(child.contents[i]);
                    }
                }
            }
        }
    }

    function compare(str1: string, str2: string) {
        if (typeof str1 === 'string' && typeof str2 === 'string') {
            str1 = prepareString(str1);
            str2 = prepareString(str2);
            if (str1.length > 0 && str2.length > 0) {
                const array1: string[] = str1.split('_');
                const array2: string[] = str2.split('_');
                for (let i1 = 0; i1 < array1.length; i1++) {
                    for (let i2 = 0; i2 < array2.length; i2++) {
                        if (array2[i2].startsWith(array1[i1])) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

    function prepareString(str) {
        str = breakUpCamelCase(str);
        str = str.toLowerCase().trim();
        return replaceWhitespaceWithUnderscore(str);
    }

    function breakUpCamelCase(str) {
        return str.replace( /([A-Z])/g, ' $1');
    }

    function replaceWhitespaceWithUnderscore(str) {
        return str.replace(/\s+/g, '_');
    }

    searchWorkspace.dispose();

    // create blocks by type
    const result = [];
    blockTypes.forEach(function(blockType) {
        result.push(new XmlBlock(blockType));
    });

    return result;
};

Blockly.ToolboxCategory.prototype.parseContents_ = function(categoryDef) {
    const contents = categoryDef['contents'];
    if (categoryDef['custom']) {
      this.flyoutItems_ = categoryDef['custom'];
    } else if (contents) {
        for (let i = 0, itemDef; (itemDef = contents[i]); i++) {
            const flyoutItem = /** @type {Blockly.utils.toolbox.FlyoutItemInfo} */ (itemDef);
            this.flyoutItems_.push(flyoutItem);
        }
    }
    if (categoryDef['categoryclass']) {
        this.cssConfig_.row += ' ' + categoryDef['categoryclass'];
    }
};

Blockly.CollapsibleToolboxCategory.prototype.parseContents_ = function(categoryDef) {
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
                const flyoutItem = /** @type {Blockly.utils.toolbox.FlyoutItemInfo} */ (itemDef);
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
