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
        recursiveSearch(this.tree_);
    }

    function recursiveSearch(child) {
        if (child.children_ && child.children_.length > 0) {
            for (let i = 0; i < child.children_.length; i++) {
                recursiveSearch(child.children_[i]);
            }
        } else if (child.contents && Array.isArray(child.contents)) {
            for (let i = 0; i < child.contents.length; i++) {
                if (typeof(child.contents[i]) === 'object') {
                    if (child.contents[i].type && child.contents[i].kind) {
                        if (child.contents[i].kind === 'BLOCK') {
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
                        }
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
