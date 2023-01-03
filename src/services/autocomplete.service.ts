import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AutocompleteService {
  private autocompleteSuggestions: any;
  private urlCall: any;
  private url = 'https://angular-yelp-backend.wl.r.appspot.com/autocomplete';

  constructor(private http: HttpClient) {}

  getAutocomplete(input: any): Observable<any> {
    this.urlCall = `${this.url}/${input}`;

    this.urlCall = decodeURI(this.urlCall);
    console.log("Decoded URL", this.urlCall);

    this.urlCall = this.urlCall.replace(' ','+');
    console.log("Calling: ", this.urlCall);

    return this.http.get(this.urlCall);
  }


  getResult(input: string) {
    this.autocompleteSuggestions =[];
    if (input === "") {
      return this.autocompleteSuggestions;
    }
    this.getAutocomplete(input);
    return this.autocompleteSuggestions;
  }
}
