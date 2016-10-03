import {Component} from 'angular2/core'
import {SpotifyService} from './spotify.service'
import {Observable} from 'rxjs/Rx';

@Component({
    selector: 'results',
    template: `
        <div *ngIf="!loaded">
            <h2><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i></h2>
        </div>
        <h2 *ngIf="loaded">{{ title }}</h2>
            <div class="row">
                <div class="col-sm-6 col-md-4" *ngFor="#artist of artists">
                    <div class="thumbnail">
                      <img src={{artist.images[0].url}}>
                      <div class="caption">
                        <h3>{{artist.name}}</h3>
                      </div>
                    </div>
                  </div>
            </div>
        `,
    providers: [SpotifyService]
})
export class SpotifyComponent {
    loaded = true;
    title = "Welcome! Try to find your favorite artists!";
    artists = [];

    constructor(courseService:SpotifyService) {
        var keyups = courseService.getResults();

        keyups.subscribe(data => {
            this.artists = [];
            data.artists.items.map(artist => {
                if(artist.name && artist.images.length > 0){
                    this.artists.push(artist);
                }
            });
            this.loaded = true;
            if(this.artists.length <= 0){
                this.title = 'Seems like there are no results for "' +  $("#search").val() + '"'
            }else{
                this.title = "Search results:";
            }
        });

        var keyspress = Observable.fromEvent($("#search"), "keypress");
        keyspress.subscribe(() => {
            this.artists = [];
            this.loaded = false;
        })
    }
}