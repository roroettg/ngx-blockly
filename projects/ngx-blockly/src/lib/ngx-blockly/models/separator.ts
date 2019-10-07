import { Node } from './node';

export class Separator implements Node {
    public toXML(): string {
        return '<sep></sep>';
    }
}
