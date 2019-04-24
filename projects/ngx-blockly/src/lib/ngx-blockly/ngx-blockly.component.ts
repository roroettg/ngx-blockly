import { AfterViewInit, Component, HostListener, Input } from '@angular/core';
import { NgxBlocklyConfig } from './ngx-blockly.config';

declare var Blockly: any;

@Component({
    selector: 'ngx-blockly',
    templateUrl: './ngx-blockly.component.html',
    styleUrls: ['./ngx-blockly.component.css']
})
export class NgxBlocklyComponent implements AfterViewInit {
    @Input() public config: NgxBlocklyConfig;

    public workspace: any;

    constructor() {

    }

    ngAfterViewInit() {
        if (!this.workspace) {
            this.workspace = Blockly.inject('blockly', this.config);
            this.resize();
        }

    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        setTimeout(() => this.resize(), 200);
    }

    protected resize() {
        Blockly.svgResize(this.workspace);

    }
}
