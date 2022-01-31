import { Blockly, BlockMutator } from 'ngx-blockly';
import { CustomMutator } from './custom-mutator';

export class ExampleMutator extends BlockMutator {

    constructor(name, blockList = null) {
        super(name, blockList);
    }

    mutationToDom(block: any) {
        console.log('mutationToDom');
        const container = Blockly.utils.xml.createElement('mutation');
        return container;
    }

    domToMutation(block: any, xmlElement: any) {
        console.log('domToMutation');
    }

    decompose(block: any, workspace: any) {
        console.log('decompose');
        const containerBlock = workspace.newBlock('math_number');
        containerBlock.initSvg();
        return containerBlock;
    }

    compose(block: any, topBlock: any) {
        console.log('compose');
    }

    saveConnections(block: any, containerBlock: any) {
        console.log('saveConnections');
    }

    afterBlockInit(block: any) {
        console.log('afterBlockInit');
        block.setMutator(new CustomMutator(block));
    }

    loadExtraState(state: any): any {
    }

    saveExtraState(): any {
    }


}
