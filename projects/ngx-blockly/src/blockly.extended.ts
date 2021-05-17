/// <reference path="./blockly.ts" />

declare module Blockly {
    const Python: Generator;
    const Dart: Generator;
    const JavaScript: Generator;
    const Lua: Generator;
    const PHP: Generator;
    
    let clipboardXml_: any;
    let clipboardSource_: any;
    let clipboardTypeCounts_: any;

    module Msg {
        var SEARCH_CATEGORY: string;
        var SEARCH_PLACEHOLDER: string;
    }
}