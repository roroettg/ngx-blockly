import { BlockMutator, CustomBlock } from 'ngx-blockly';

export class ExampleBlock extends CustomBlock {

    constructor(block: any, blockMutator: BlockMutator) {
        super('example_block', block, blockMutator);
        this.class = ExampleBlock;
    }

    public defineBlock() {
        this.block.appendDummyInput().appendField('example block');
        this.block.jsonInit({
            'mutator': 'example_mutator'
        });
    }

    public toPythonCode(block: ExampleBlock): string | any[] {
        return '';
    }
}
