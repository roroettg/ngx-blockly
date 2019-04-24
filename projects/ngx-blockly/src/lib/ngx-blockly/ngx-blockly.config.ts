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
