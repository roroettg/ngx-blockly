import { Node } from './node';

export class Separator implements Node {

    public kind = 'SEP';

    public toXML(): string {
        return '<sep></sep>';
    }
}
