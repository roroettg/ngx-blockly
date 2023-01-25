import { Blockly, CustomBlock } from 'ngx-blockly';
import { ExampleMutator } from './example.mutator';

export class ExampleBlock extends CustomBlock {

    constructor() {
        super('example_block', new ExampleMutator('example_mutator'));
        this.class = ExampleBlock;
    }

    public defineBlock() {
        this.block.appendDummyInput().appendField('example block');
        this.block.jsonInit({
            'mutator': 'example_mutator'
        });
    }

    public toPythonCode(block: Blockly.Block): string | any[] {
        return '';
    }
}
