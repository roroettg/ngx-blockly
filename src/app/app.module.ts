import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxBlocklyModule } from '../../projects/ngx-blockly/src/lib/ngx-blockly.module';


import 'blockly/blocks';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        NgxBlocklyModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
