import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeocodeLocationService {

  public locationData: { [key: string]: string } = {
    lat: '',
    lon: '',
  };
  latitude: string = '';
  longitude: string = '';

  private urlCall: any;

  private url = 'https://angular-yelp-backend.wl.r.appspot.com/geocode'

  constructor(private http: HttpClient) {}

  getGeocodedLocation(location: string): Observable<any> {
    this.urlCall = `${this.url}/${location}`;
    console.log(this.urlCall);

    return this.http.get(this.urlCall);
  }

  getLat() {
      return this.latitude;
  }

  getLon(){
      return this.longitude;
  }
}
