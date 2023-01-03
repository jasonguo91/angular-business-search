import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DetailsService {
  private autocompleteSuggestions: any;
  private urlCall: any;
  private url = 'https://angular-yelp-backend.wl.r.appspot.com/details';

  constructor(private http: HttpClient) {}

  getDetails(input: any): Observable<any> {
    this.urlCall = `${this.url}/${input}`;

    return this.http.get(this.urlCall);
  }

}
