declare var Blockly: any;

export class CustomMutator extends Blockly.Mutator {

    constructor(block) {
        super(block);
    }

    drawIcon_(group: SVGElement) {
        group.setAttribute('width', '40');
        // Necessary to keep symbols under control
        const g = Blockly.utils.dom.createSvgElement('g', {}, group);
        Blockly.utils.dom.createSvgElement('path', {
            'transform': 'scale(0.5) translate(0,4)',
            'fill': '#ffffff',
            'd': 'M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z'
        }, g);
    }

    setVisible(visible: boolean) {
        if (visible) {
            alert('plus button was clicked');
        }
    }
}
