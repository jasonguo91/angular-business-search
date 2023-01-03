import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

interface reservation {
  name: any;
  date: any;
  time: any;
  email: any;
}

@Component({
  selector: 'app-reservations',
  templateUrl:
  './reservations.component.html',
  styleUrls: ['./reservations.component.css'],
})
export class ReservationsComponent implements OnInit {
  reservations: any = [];
  noReservationsBoolean = false;

  constructor(
    private ref: ChangeDetectorRef) {}

  ngOnInit() {
    this.reservations = this.returnLocalStorage();
    if (this.reservations.length < 1 || this.reservations.length == undefined) {
      this.noReservationsBoolean = true;
    } else {
      this.noReservationsBoolean = false;
    }
  }

  ngOnChanges(){
    this.reservations = this.returnLocalStorage();
    if (this.reservations.length < 1 || this.reservations.length == undefined) {
      this.noReservationsBoolean = true;
    } else {
      this.noReservationsBoolean = false;
    }
  }

  checkReservationExists(){
    if (this.reservations.length < 1 || this.reservations.length == undefined) {
      this.noReservationsBoolean = true;
    } else {
      this.noReservationsBoolean = false;
    }
  }

  returnLocalStorage() {
    let reservations = [];

    for (var i = 0; i < localStorage.length; i++) {
      let name, date, time, email;

      let data = JSON.parse(
        localStorage.getItem(localStorage.key(i) || '') || ''
      );
      name = localStorage.key(i);
      date = data.date;
      time = data.time;
      email = data.email;

      var reservation = <reservation>{
        name: name,
        date: date,
        time: time,
        email: email,
      }

      console.log("Reservation object: ", reservation);

      if (reservation) {
        reservations.push(reservation);
      }
    }
    return reservations;
  }

  getLocalStorage() {
    console.log('Local Storage', localStorage);
    this.reservations = [];

    for (var i = 0; i < localStorage.length; i++) {
      let name, date, time, email;

      let data = JSON.parse(
        localStorage.getItem(localStorage.key(i) || '') || ''
      );
      name = localStorage.key(i);
      date = data.date;
      time = data.time;
      email = data.email;

      var reservation = <reservation>{
        name: name,
        date: date,
        time: time,
        email: email,
      }

      console.log("Reservation object: ", reservation);

      if (reservation) {
        this.reservations.push(reservation);
      }
    }
    console.log("Reservations: ", this.reservations);
  }

  deleteReservation(id: any) {
    localStorage.removeItem(id);
    alert("Reservation cancelled");

    this.reservations = this.returnLocalStorage();
    this.checkReservationExists(); 
    this.ref.detectChanges();
  }
}
