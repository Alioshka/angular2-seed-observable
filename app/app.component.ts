/// <reference path="../typings/tsd.d.ts" />

import {Component} from 'angular2/core';
import {Observable} from 'rxjs/Rx';
import {SpotifyComponent} from './spotify.component'

@Component({
    selector: 'my-app',
    template: `
        <input id="search" type="text" class="form-control" placeholder="Search for artists...">
        <results></results>
    `,
    directives: [SpotifyComponent]
})
export class AppComponent {
    constructor() {
    }
}