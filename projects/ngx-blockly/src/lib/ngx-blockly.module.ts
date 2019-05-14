import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgxBlocklyComponent } from './ngx-blockly/ngx-blockly.component';
import { NgxToolboxBuilderService } from './ngx-blockly/services/ngx-toolbox-builder.service';

@NgModule({
    declarations: [NgxBlocklyComponent],
    imports: [],
    exports: [NgxBlocklyComponent],
    providers: [NgxToolboxBuilderService],
    schemas: [NO_ERRORS_SCHEMA]
})
export class NgxBlocklyModule {
}
