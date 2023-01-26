import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxBlocklyModule } from 'ngx-blockly';


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
