
export class Theme {
    constructor(private name: string,
                private blockStyles: BlockStyles,
                private categoryStyles: CategoryStyles,
                private componentStyle: Blockly.Theme.ComponentStyle) {
    }

    createBlocklyTheme(): any {
        return new Blockly.Theme(this.name, this.blockStyles, this.categoryStyles, this.componentStyle);
    }


}

export interface BlockStyles {
    [blockStyleName: string]: Blockly.Theme.BlockStyle;
}

export interface CategoryStyles {
    [categoryStyleName: string]: Blockly.Theme.CategoryStyle;
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
