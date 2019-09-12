declare var Blockly: any;

export class Theme {
  constructor(
    private blockStyles: BlockStyles,
    private categoryStyles: CategoryStyles
  ) {
  }

  createBlocklyTheme(): any {
    return new Blockly.Theme(this.blockStyles, this.categoryStyles);
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
