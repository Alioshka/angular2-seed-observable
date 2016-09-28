import {Observable} from 'rxjs/Rx';

export class SpotifyService {

    artists = [];

    getResults() : any {
        return Observable.fromEvent($("#search"), "keyup")
            .map(e => e.target.value)
            .filter(text => text.length >=3)
            .debounceTime(400)
            .distinctUntilChanged()
            .flatMap(searchTerm => {
                var url = "https://api.spotify.com/v1/search?type=artist&q=" + searchTerm;
                var promise = $.getJSON(url);
                return Observable.fromPromise(promise);
            });
    }
}