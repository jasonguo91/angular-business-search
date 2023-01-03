import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetLocationService {

  private locationData: {[key: string]: string} = {
    lat: '',
    lon: '',
  }

  private geo_url = "https://ipinfo.io/?token=e192fe79b9d3e7";

  constructor(private http: HttpClient) {
    this.http.get(this.geo_url).subscribe((data: any) => {
      var location = data["loc"];
      this.locationData.lat = location.substring(0, location.indexOf(','));
      this.locationData.lon = location.substring(location.indexOf(',') + 1, location.length);
    });
  }

  getLatitude() {
    return this.locationData.lat;
  }

  getLongitude() {
    return this.locationData.lon;
  }
}
