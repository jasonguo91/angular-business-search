import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, ROUTES, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PathLocationStrategy, LocationStrategy, HashLocationStrategy } from '@angular/common';

// Material Modules
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';

import { GoogleMapsModule } from '@angular/google-maps';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { ResultsTableComponent } from './results-table/results-table.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { DetailedSearchResultComponent } from './detailed-search-result/detailed-search-result.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { KeysPipe } from 'pipes/keys.pipe';
import { SearchService } from 'src/services/search.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
const appRoutes: Routes = [
  {path: 'search', component: SearchFormComponent},
  {path: 'bookings', component: ReservationsComponent},
  { path: '',   redirectTo: '/search', pathMatch: 'full' },
  { path: '**', redirectTo: '/search', pathMatch:'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchFormComponent,
    ResultsTableComponent,
    ReservationsComponent,
    DetailedSearchResultComponent,
    PageNotFoundComponent,
    KeysPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true, onSameUrlNavigation: 'reload'}
    ),
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    GoogleMapsModule,
  ],
  exports: [RouterModule],
  providers: [SearchService, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
