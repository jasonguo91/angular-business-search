import { Injectable, EventEmitter, Output, TemplateRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable()
export class SearchService {
  private jsonData: any;
  private searchResults: any;
  private urlCall: any;

  private url = 'https://angular-yelp-backend.wl.r.appspot.com/search';

  constructor(private http: HttpClient) {}

  search(term: string, distance: number, categories: string, latitude: string, longitude: string): Observable<any>{
    var radius: number = Math.round(distance * 1690.34);

    this.urlCall = `${this.url}/${term}/${radius}/${latitude}/${longitude}/${categories}`;
    this.urlCall = decodeURI(this.urlCall);
    console.log("Decoded URL", this.urlCall);

    this.urlCall = this.urlCall.replace(' ','+');
    console.log("Calling: ", this.urlCall);

    return this.http.get<any>(this.urlCall);
  }

  // getData(    term: string,
  //   distance: number,
  //   categories: string,
  //   lat: number,
  //   lon: number): Observable<{}> {
  //   var distance_meters: number = Math.round(distance * 1690.34);

  //   return this.http
  //     .get(
  //       this.url +
  //         'term=' +
  //         term +
  //         '&radius=' +
  //         distance_meters +
  //         '&categories=' +
  //         categories +
  //         '&latitude=' +
  //         lat +
  //         '&longitude=' +
  //         lon
  //     )
  //     .pipe(catchError(this.handleError<any>('getData', {})));
  // }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
