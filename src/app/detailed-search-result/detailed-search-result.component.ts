import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DetailsService } from 'src/services/details.service';
import { ReviewsService } from 'src/services/reviews.service';
import { SearchService } from 'src/services/search.service';
import { StorageService } from 'src/services/storage.service';

interface reservation {
  email: any;
  date: any;
  time: any;
}

interface reviews {
  user_name: any;
  rating: any;
  text: any;
  time_created: any;
}

interface businessDetails {
  name: any;
  address: any;
  categories: any;
  phone_number: any;
  price: any;
  status: any;
  url: any;
  photos: any;
  id: any;
  coordinates: any;
  reservationExist: boolean;
}


@Component({
  selector: 'app-detailed-search-result',
  templateUrl: './detailed-search-result.component.html',
  styleUrls: ['./detailed-search-result.component.css']
})

export class DetailedSearchResultComponent implements OnInit {
  public reservationForm: FormGroup;
  currentDate:any = new Date(); 

  constructor(
    private fb: FormBuilder,
    private searchService: SearchService,
    private detailsService: DetailsService,
    private ref: ChangeDetectorRef,
    private storageService: StorageService,
    private reviewS: ReviewsService
  ) {
    this.reservationForm = this.fb.group({
      email: new FormControl({value: '', disabled: false}, [
        Validators.required,
        Validators.email
      ]),
      date: new FormControl({value: '', disabled: false}, [
        Validators.required
      ]),
      hours: new FormControl({value: '', disabled: false}, [
        Validators.required
      ]),
      minutes: new FormControl({value: '', disabled: false}, [
        Validators.required
      ]),
      id: new FormControl({value: '', disabled: false})
    })
  }
  //Details
  mappedDetailObj: any;
  detailArrayPhotos: any;
  reservationExists: any;

  //MAPS
  coor = {lat: 0, lng: 0};

  mapOptions: google.maps.MapOptions = {
    center: this.coor,
    zoom : 15
  }
  marker = {
    position: this.coor,
  }

  @Input() detailsJSON: any;
  @Input() detailsAvailable: any;
  @Output() showResults: any;
  @Input() businessID: any;

  @Output() toggleDetails = new EventEmitter();
  @Output() toggleResults: EventEmitter<Object> =   new EventEmitter();



  //Reviews
  reviewsJSON: any;
  reviewsArray: any;
  submittedRes = false;


  ngOnInit(): void {
    this.searchReview(this.businessID);
  }

  ngOnChanges() {
    if ((this.detailsAvailable = true)) {

      this.mappedDetailObj = this.mapDetails(this.detailsJSON);

      this.reservationExists = this.mappedDetailObj.reservationExist;
      console.log("Is there a reservation for ", this.mappedDetailObj.name, " ", this.reservationExists);

      this.searchReview(this.businessID);
      this.mapReviews(this.reviewsJSON);
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.reservationForm.controls;
  }

  get email(){
    return this.reservationForm.get('email')
  }

  searchReview(id: any) {
    this.reviewS
      .getReviews(id)
      .subscribe((apiData: any) => {

        this.mapReviews(apiData.reviews);
        console.log("Reviews response: ", apiData.reviews);
      })
  }

  mapReviews(jsonData:any) {
    console.log("Map Reviews JSON DATA param: ", jsonData);
    this.reviewsArray = jsonData.map(
      (value: {
        user: any;
        rating: any;
        text: any;
        time_created: number;
      }) => {
        return <reviews>{
          user_name: value.user['name'],
          rating: value.rating,
          text: value.text,
          time_created: value.time_created,
        };
      }
    );
  }

  mapDetails(jsonDetails: any) {
    var JSON_Obj = jsonDetails;

    var name,
      address: any,
      categories: any,
      phone_number,
      price,
      status = 'Open',
      url,
      photos_array,
      id,
      coordinates;

    let key: keyof typeof JSON_Obj;
    for (key in JSON_Obj) {
      if (key == 'name' && JSON_Obj['name']) {
        name = JSON_Obj['name'];
      }

      if (key == 'location' && JSON_Obj['location']['display_address']) {
        let display_address_array = JSON_Obj['location']['display_address'];

        address = display_address_array.join(" ");

        console.log('Address: ', address);
      } else if (JSON_Obj['location']['display_address'] == null) {
        address = 'N/A';
      }


      if (key == 'categories' && JSON_Obj['categories']) {
        let display_categories_array = JSON_Obj['categories'];
        console.log('Display categories array: ', display_categories_array);

        display_categories_array.forEach(function(arrayItem: { title: any; }) {
          categories += arrayItem.title + " | "
        })
        categories = categories.substring(9, categories.length - 2);

        console.log('Categories: ', categories);
      } else if (JSON_Obj['categories'] == null) {
        categories = 'N/A';
      }


      if (JSON_Obj['display_phone']) {
        phone_number = JSON_Obj['display_phone'];
      } else if (JSON_Obj['display_phone'] == null) {
        phone_number = 'N/A';
      }

      if (JSON_Obj['price']) {
        price = JSON_Obj['price'];
      } else if (JSON_Obj['price'] == null) {
        price = 'N/A';
      }

      if (JSON_Obj['is_closed'] === true) {
        status = 'Closed';
      }

      if (JSON_Obj['url']) {
        url = JSON_Obj['url'];
      } else if (JSON_Obj['url'] == null) {
        url = 'N/A';
      }

      if (key == 'photos' && JSON_Obj['photos']) {
        this.detailArrayPhotos = JSON_Obj['photos'];
        photos_array = JSON_Obj['photos'];
      }

      id = JSON_Obj['id'];

      if (JSON_Obj['coordinates']) {
        coordinates = JSON_Obj['coordinates'];
        this.coor.lat = JSON_Obj['coordinates'].latitude;
        this.coor.lng = JSON_Obj['coordinates'].longitude;
      }
    }

    var reservationExist
    if (localStorage.getItem(name)) {
      reservationExist = true;
      console.log("Mapped Details: ", reservationExist);
    } else {
      reservationExist = false;
      console.log("Mapped Details: ", reservationExist);
    }

    this.reservationForm.patchValue({
      id: name
    });

    return <businessDetails>{
      name: name,
      address: address, //array
      categories: categories, //array - want title
      phone_number: phone_number,
      price: price,
      status: status,
      url: url,
      photos: photos_array,
      id: id,
      coordinates: coordinates,
      reservationExist: reservationExist
    };
  }

  //Reservation
  makeReservation() {
    this.submittedRes = true;

    if (this.reservationForm.invalid) {
      return;
    }

    var email: any = this.reservationForm.value.email;
    var date: any = this.reservationForm.controls.date.value;
    var hours: any = this.reservationForm.controls.hours.value;
    var minutes: any = this.reservationForm.controls.minutes.value;

    var time = hours + ":" + minutes;
    console.log("time :", time);

    var id = this.reservationForm.controls.id.value;

    let reservationObj : reservation = {
      email: email,
      date: date,
      time: time,
    }

    console.log("id: ", id, "reservationObj: ", JSON.stringify(reservationObj));
    this.storageService.setItem(id, JSON.stringify(reservationObj));

    alert("Reservation created!");

    var closeButton = document.getElementById("modal_close");
    closeButton?.click();
    this.checkReservationExists();
  }

  cancelReservation() {
    this.storageService.removeItem(this.mappedDetailObj.name);
    this.checkReservationExists();
    this.reservationExists = false;
    console.log(this.reservationExists);

    this.ref.markForCheck();
    alert("Reservation cancelled!");
  }

  checkReservationExists() {
    if (localStorage.getItem(this.mappedDetailObj.name)) {
      this.reservationExists = true;
    } else {
      false;
    }
  }

  getColor(){
    return this.mappedDetailObj.status == 'Open' ? 'green' : 'red';
  }

  closeDetails(){
    this.detailsAvailable = false;
    this.toggleDetails.emit(false);

    this.re_displayResults();
  }

  re_displayResults() {
    this.showResults = true;
    this.toggleResults.emit(this.showResults);
    console.log("show results : ", this.showResults);
  }
}
