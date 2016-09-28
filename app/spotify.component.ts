import {Component} from 'angular2/core'
import {SpotifyService} from './spotify.service'

@Component({
    selector: 'results',
    template: `
        <h2>{{ title }}</h2>
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
            if(this.artists.length <= 0){
                this.title = 'Seems like there are no results for "' +  $("#search").val() + '"'
            }else{
                this.title = "Search results:";
            }
        });
    }
}