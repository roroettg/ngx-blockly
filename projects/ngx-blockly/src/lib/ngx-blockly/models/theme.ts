declare var Blockly: any;

export class Theme {
    constructor(private name: string,
                private blockStyles: BlockStyles,
                private categoryStyles: CategoryStyles,
                private componentStyle: ComponentStyle) {
    }

    createBlocklyTheme(): any {
        return new Blockly.Theme(this.name, this.blockStyles, this.categoryStyles, this.componentStyle);
    }


}

export interface BlockStyles {
    [blockStyleName: string]: BlockStyle;
}

export interface CategoryStyles {
    [categoryStyleName: string]: CategoryStyle;
}


export class BlockStyle {
    colourPrimary: string;
    colourSecondary?: string;
    colourTertiary?: string;
    hat?: string;
}

export class CategoryStyle {
    colour: string;
}

export class ComponentStyle {
    workspaceBackgroundColour?: string;
    toolboxBackgroundColour?: string;
    toolboxForegroundColour?: string;
    flyoutBackgroundColour?: string;
    flyoutForegroundColour?: string;
    flyoutOpacity?: number;
    scrollbarColour?: string;
    scrollbarOpacity?: number;
    insertionMarkerColour?: string;
    insertionMarkerOpacity?: number;
    markerColour?: string;
    cursorColour?: string;
    selectedGlowColour?: string;
    selectedGlowOpacity?: number;
    replacementGlowColour?: string;
    replacementGlowOpacity?: number;
}
