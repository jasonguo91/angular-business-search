import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

import {
  debounceTime,
  tap,
  switchMap,
  distinctUntilChanged,
  filter,
  finalize
} from 'rxjs/operators';

import { SearchService } from 'src/services/search.service';
import { GetLocationService } from 'src/services/get-location.service';
import { GeocodeLocationService } from 'src/services/geocode-location.service';
import { AutocompleteService } from 'src/services/autocomplete.service';
import { ResultsTableComponent } from '../results-table/results-table.component';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css'],
})
export class SearchFormComponent implements OnInit {
  @ViewChild(ResultsTableComponent) resultChild!: ResultsTableComponent;

  public searchForm: FormGroup;
  public categories = [
    { name: 'Default', value: 'All' },
    { name: 'Arts & Entertainment', value: 'arts' },
    { name: 'Food', value: 'food' },
    { name: 'Health & Medical', value: 'health' },
    { name: 'Hotels & Travel', value: 'hotelstravel' },
    { name: 'Professional Services', value: 'professional' },
  ];

  autoLocatedLocation: { [key: string]: string } = {
    latitude: '',
    longitude: '',
  };

  geoLocation: { [key: string]: string } = {
    lat: '',
    lon: '',
  };

  searchResponse: any;
  searchResultsAvailable = false;
  noSearchResultsBoolean = false;

  //Autocomplete
  //searchCtrl = new FormControl();
  filteredSearch: any;
  isLoading = false;
  errorMsg!: string;
  selectedText: any = '';
  autoCompleteList = [];

  constructor(
    private fb: FormBuilder,
    private searchService: SearchService,
    public locationService: GetLocationService,
    public geocodeService: GeocodeLocationService,
    public autocompleteService: AutocompleteService
  ) {
    this.searchForm = this.fb.group({
      keyword: new FormControl({ value: '', disabled: false }, [
        Validators.required,
        Validators.pattern('^(?=.*\\S).+$'),
      ]),
      distance: new FormControl({ value: '', disabled: false }),
      categories: ['all'],
      location: new FormControl({ value: '', disabled: false }),
      currentLocation: [false],
    });

    this.searchForm.controls.keyword.valueChanges
    .pipe(
      filter((res) => {
        return res !== null && res.length;
      }),
      distinctUntilChanged(),
      debounceTime(1000),
      tap(() => {
        this.errorMsg = '';
        this.filteredSearch = [];
        this.isLoading = true;
      }),
      switchMap((value) => this.autocompleteService.getAutocomplete(value).
      pipe(
        finalize(() => {
          this.isLoading = false;
        }),
      ))
    )
    .subscribe((data: any) => {
      if (data['categories'] == undefined && data['terms'] == undefined) {
        this.filteredSearch = [];
      } else if (data['categories'] == undefined) {
        for (let i = 0; i < data['terms'].length; i++) {
          this.filteredSearch.push(data['terms'][i].text);
        }
      } else if (data['terms'] == undefined) {
        for (let i = 0; i < data['terms'].length; i++) {
          this.filteredSearch.push(data['categories'][i].title);
        }
      } else {
        for (let i = 0; i < data['terms'].length; i++) {
          this.filteredSearch.push(data['terms'][i].text);
          this.filteredSearch.push(data['categories'][i].title);
        }
      }
      console.log(this.filteredSearch);
    });
  }

  ngAfterViewInit() {
      //init child
      this.resultChild;
  }

  ngOnInit() {
    //init autocomplete

  }

  //autocomplete methods
  onSelected() {
    this.selectedText = this.selectedText;
    let text: string = this.searchForm.controls.keyword.value;

    this.searchForm.patchValue({
      keyword: text
    });
    console.log("New keyword value is: ", this.searchForm.controls.keyword.value);
  }

  displayWith(value: any) {
    return value;
  }

  clearSelection() {
    this.selectedText = '';
    this.filteredSearch = [];
  }

  autoComplete(input: string) {
    this.autoCompleteList = [];
    this.autoCompleteList = this.autocompleteService.getResult(input);
  }

  //auto-location
  getCurrentLocation() {
    this.autoLocatedLocation.latitude = this.locationService.getLatitude();
    this.autoLocatedLocation.longitude = this.locationService.getLongitude();
  }

  search() {
    var term: string = this.searchForm.controls.keyword.value;
    var distance: number;
    var categories: string = this.searchForm.controls.categories.value;

    if (this.searchForm.controls.distance.value == 0) {
      distance = 5;
    }
    else if (
      typeof this.searchForm.controls.distance != 'undefined' &&
      this.searchForm.controls.distance
    ) {
      distance = this.searchForm.controls.distance.value;
    } else {
      distance = 5;
    }

    if (this.searchForm.controls.currentLocation.value) {
      //search using auto-location
      console.log(
        'searching from ',
        'lat: ',
        this.autoLocatedLocation.latitude,
        'lon: ',
        this.autoLocatedLocation.longitude
      );

      let latitude = this.autoLocatedLocation.latitude;
      let longitude = this.autoLocatedLocation.longitude;

      this.searchResponse = this.searchService
        .search(term, distance, categories, latitude, longitude)
        .subscribe((apiData: any) => {
          console.log(apiData);
          if (apiData.businesses.length == 0) {
            this.noSearchResultsBoolean = true;
            console.log("No results found");
          } else {
            this.searchResponse = apiData.businesses;
            this.searchResultsAvailable = true;
            this.noSearchResultsBoolean = false;
            console.log('API response: ', this.searchResponse);
          }

          console.log("Empty? ", this.isEmpty(apiData));
        });

    } else {
      //search using geolocation
      this.geocodeService
        .getGeocodedLocation(this.searchForm.controls.location.value)
        .subscribe((geocodeData: any) => {
          console.log(geocodeData);
          let latitude = geocodeData.results[0].geometry.location.lat;
          let longitude = geocodeData.results[0].geometry.location.lng;

          console.log(
            'location: ',
            this.searchForm.controls.location.value,
            'coords: ',
            latitude,
            longitude
          );
          this.searchResponse = this.searchService
            .search(term, distance, categories, latitude, longitude)
            .subscribe((apiData: any) => {
              console.log(apiData);
              if (apiData.businesses.length == 0) {
                this.noSearchResultsBoolean = true;
                console.log("No results found");
              } else {
                this.searchResponse = apiData.businesses;
                this.searchResultsAvailable = true;
                this.noSearchResultsBoolean = false;
                console.log('API response: ', this.searchResponse);
              }

              console.log("Empty? ", this.isEmpty(apiData));
            });
        });
    }
  }

  isEmpty(obj: any) {
    return obj.businesses.length == 0;
  }

  clear() {
    this.clearFormContent();
    this.enableLocation();
    this.searchResultsAvailable = false;
    this.noSearchResultsBoolean = false;

    console.log("Search results available: ", this.searchResultsAvailable);
  }

  clearFormContent() {
    this.searchForm.controls.keyword.setValue('');
    this.searchForm.controls.distance.setValue('');
    this.searchForm.controls.location.setValue('');
    this.searchForm.controls.currentLocation.setValue(false);
    this.searchForm.controls.categories.setValue('all');
  }

  enableLocation() {
    this.searchForm.controls.location.enable();
  }

  disableLocation() {
    this.searchForm.controls.location.disable();
    this.searchForm.controls.location.setValue('');
  }

  currentLocation() {
    if (!this.searchForm.controls.currentLocation.value) {
      this.enableLocation();
      this.searchForm.controls.currentLocation.setValue(false);
    } else {
      this.getCurrentLocation();

      console.log(
        'lat: ',
        this.autoLocatedLocation.latitude,
        'lon: ',
        this.autoLocatedLocation.longitude
      );

      this.disableLocation();
      this.searchForm.controls.currentLocation.setValue(true);
    }
  }
}
