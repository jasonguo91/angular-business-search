import { Component, Input, OnInit, OnChanges, ChangeDetectorRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchService } from 'src/services/search.service';
import { DetailsService } from 'src/services/details.service';
import { ReviewsService } from 'src/services/reviews.service';
import { map } from 'rxjs/operators';

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { EmailValidator, FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { DetailedSearchResultComponent } from '../detailed-search-result/detailed-search-result.component';

interface business {
  name: any;
  img_url: any;
  rating: any;
  distance: any;
  url: any;
  id: any;
}

@Component({
  selector: 'app-results-table',
  templateUrl: './results-table.component.html',
  styleUrls: ['./results-table.component.css'],
})
export class ResultsTableComponent implements OnInit {
  @ViewChild(DetailedSearchResultComponent) detailChild!: DetailedSearchResultComponent;

  constructor(
    private searchService: SearchService,
    private detailsService: DetailsService,
    private reviewS : ReviewsService,
    private ref: ChangeDetectorRef
  ) {
  }


  JSON = {
    businesses: [
      {
        id: '23Qrcz2i9e2e8MstUIIO0A',
        alias: 'yuko-kitchen-los-angeles',
        name: 'Yuko Kitchen',
        image_url:
          'https://s3-media4.fl.yelpcdn.com/bphoto/TnSTrT62cyzmWARYsfsisw/o.jpg',
        is_closed: false,
        url: 'https://www.yelp.com/biz/yuko-kitchen-los-angeles?adjust_creative=M27B9GV7zKtR8Ji7_NCmOw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=M27B9GV7zKtR8Ji7_NCmOw',
        review_count: 1802,
        categories: [{ alias: 'japanese', title: 'Japanese' }],
        rating: 4.5,
        coordinates: { latitude: 34.0621807, longitude: -118.348153 },
        transactions: ['delivery'],
        price: '$$',
        location: {
          address1: '5484 Wilshire Blvd',
          address2: '',
          address3: '',
          city: 'Los Angeles',
          zip_code: '90036',
          country: 'US',
          state: 'CA',
          display_address: ['5484 Wilshire Blvd', 'Los Angeles, CA 90036'],
        },
        phone: '+13239334020',
        display_phone: '(323) 933-4020',
        distance: 3589.830833109405,
      },
      {
        id: 'JxSNu4tMyiRe6WK7YW9GAg',
        alias: 'mian-\u6ecb\u5473\u5c0f\u9762-los-angeles',
        name: 'MIAN | \u6ecb\u5473\u5c0f\u9762',
        image_url:
          'https://s3-media3.fl.yelpcdn.com/bphoto/9_xsFF2-wzkSJ6yGq2qijA/o.jpg',
        is_closed: false,
        url: 'https://www.yelp.com/biz/mian-%E6%BB%8B%E5%91%B3%E5%B0%8F%E9%9D%A2-los-angeles?adjust_creative=M27B9GV7zKtR8Ji7_NCmOw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=M27B9GV7zKtR8Ji7_NCmOw',
        review_count: 282,
        categories: [
          { alias: 'chinese', title: 'Chinese' },
          { alias: 'noodles', title: 'Noodles' },
        ],
        rating: 4.0,
        coordinates: { latitude: 34.03266, longitude: -118.35751 },
        transactions: [],
        price: '$$',
        location: {
          address1: '5263 W Adams Blvd',
          address2: '',
          address3: null,
          city: 'Los Angeles',
          zip_code: '90016',
          country: 'US',
          state: 'CA',
          display_address: ['5263 W Adams Blvd', 'Los Angeles, CA 90016'],
        },
        phone: '+13233326176',
        display_phone: '(323) 332-6176',
        distance: 538.9533632735346,
      },
      {
        id: 'ktn9AX_cmEqeEDjqdLynzg',
        alias: 'seoulmates-los-angeles',
        name: 'Seoulmates',
        image_url:
          'https://s3-media2.fl.yelpcdn.com/bphoto/_k0eLaZsvNdHLGEVbLyqRw/o.jpg',
        is_closed: false,
        url: 'https://www.yelp.com/biz/seoulmates-los-angeles?adjust_creative=M27B9GV7zKtR8Ji7_NCmOw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=M27B9GV7zKtR8Ji7_NCmOw',
        review_count: 80,
        categories: [
          { alias: 'korean', title: 'Korean' },
          { alias: 'asianfusion', title: 'Asian Fusion' },
        ],
        rating: 4.5,
        coordinates: { latitude: 34.07261, longitude: -118.37078 },
        transactions: ['pickup', 'delivery'],
        location: {
          address1: '8320 W 3rd St',
          address2: null,
          address3: '',
          city: 'Los Angeles',
          zip_code: '90048',
          country: 'US',
          state: 'CA',
          display_address: ['8320 W 3rd St', 'Los Angeles, CA 90048'],
        },
        phone: '+16304016673',
        display_phone: '(630) 401-6673',
        distance: 5035.767855630197,
      },
      {
        id: 'Shctjzk4MbtCi9XAwLRsVA',
        alias: 'curry-in-hurry-los-angeles',
        name: 'Curry in hurry',
        image_url:
          'https://s3-media1.fl.yelpcdn.com/bphoto/0RI-gUvdddCkiCQtpJvFuw/o.jpg',
        is_closed: false,
        url: 'https://www.yelp.com/biz/curry-in-hurry-los-angeles?adjust_creative=M27B9GV7zKtR8Ji7_NCmOw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=M27B9GV7zKtR8Ji7_NCmOw',
        review_count: 64,
        categories: [{ alias: 'indpak', title: 'Indian' }],
        rating: 5.0,
        coordinates: { latitude: 34.047555534439155, longitude: -118.3442087 },
        transactions: ['pickup', 'delivery'],
        location: {
          address1: '4934 W Pico Blvd',
          address2: null,
          address3: '',
          city: 'Los Angeles',
          zip_code: '90019',
          country: 'US',
          state: 'CA',
          display_address: ['4934 W Pico Blvd', 'Los Angeles, CA 90019'],
        },
        phone: '+13234132189',
        display_phone: '(323) 413-2189',
        distance: 2127.116037048856,
      },
      {
        id: '30jrTz8vh1xSXdtXMvt-mA',
        alias: 'my-two-cents-los-angeles-3',
        name: 'My Two Cents',
        image_url:
          'https://s3-media3.fl.yelpcdn.com/bphoto/v6k8BWUCocpt_AjeWHQ9vQ/o.jpg',
        is_closed: false,
        url: 'https://www.yelp.com/biz/my-two-cents-los-angeles-3?adjust_creative=M27B9GV7zKtR8Ji7_NCmOw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=M27B9GV7zKtR8Ji7_NCmOw',
        review_count: 832,
        categories: [
          { alias: 'southern', title: 'Southern' },
          { alias: 'seafood', title: 'Seafood' },
          { alias: 'soulfood', title: 'Soul Food' },
        ],
        rating: 4.5,
        coordinates: { latitude: 34.0498186, longitude: -118.3596124 },
        transactions: ['pickup', 'delivery'],
        price: '$$',
        location: {
          address1: '5583 W Pico Blvd',
          address2: '',
          address3: null,
          city: 'Los Angeles',
          zip_code: '90019',
          country: 'US',
          state: 'CA',
          display_address: ['5583 W Pico Blvd', 'Los Angeles, CA 90019'],
        },
        phone: '+13238799881',
        display_phone: '(323) 879-9881',
        distance: 2320.299103836797,
      },
      {
        id: 'EvIsQ2qaHhmV5fWB9ufsAg',
        alias: 'venice-noodles-los-angeles',
        name: 'Venice Noodles',
        image_url:
          'https://s3-media1.fl.yelpcdn.com/bphoto/fG7tAu5fBs9dtbgcwpYwMQ/o.jpg',
        is_closed: false,
        url: 'https://www.yelp.com/biz/venice-noodles-los-angeles?adjust_creative=M27B9GV7zKtR8Ji7_NCmOw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=M27B9GV7zKtR8Ji7_NCmOw',
        review_count: 204,
        categories: [
          { alias: 'noodles', title: 'Noodles' },
          { alias: 'thai', title: 'Thai' },
          { alias: 'salad', title: 'Salad' },
        ],
        rating: 4.5,
        coordinates: { latitude: 34.015363, longitude: -118.413525 },
        transactions: ['pickup', 'delivery'],
        price: '$$',
        location: {
          address1: '10953 Venice Blvd',
          address2: null,
          address3: null,
          city: 'Los Angeles',
          zip_code: '90034',
          country: 'US',
          state: 'CA',
          display_address: ['10953 Venice Blvd', 'Los Angeles, CA 90034'],
        },
        phone: '+13108760275',
        display_phone: '(310) 876-0275',
        distance: 5823.560748037002,
      },
      {
        id: 'DYmSjWNUbU5tyo_gQ7PO5g',
        alias: 'mizlala-west-adams-los-angeles-2',
        name: 'Mizlala West Adams',
        image_url:
          'https://s3-media2.fl.yelpcdn.com/bphoto/CrvrvF7nA17yoqiA7jwWcw/o.jpg',
        is_closed: false,
        url: 'https://www.yelp.com/biz/mizlala-west-adams-los-angeles-2?adjust_creative=M27B9GV7zKtR8Ji7_NCmOw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=M27B9GV7zKtR8Ji7_NCmOw',
        review_count: 559,
        categories: [
          { alias: 'falafel', title: 'Falafel' },
          { alias: 'mideastern', title: 'Middle Eastern' },
        ],
        rating: 4.5,
        coordinates: { latitude: 34.03221, longitude: -118.36072 },
        transactions: ['pickup', 'delivery'],
        price: '$$',
        location: {
          address1: '5400 W Adams Blvd',
          address2: '',
          address3: null,
          city: 'Los Angeles',
          zip_code: '90016',
          country: 'US',
          state: 'CA',
          display_address: ['5400 W Adams Blvd', 'Los Angeles, CA 90016'],
        },
        phone: '+13234337137',
        display_phone: '(323) 433-7137',
        distance: 778.6070397421264,
      },
      {
        id: 'CNuWFfn8Xc7s6kKhIve2Sw',
        alias: 'chucks-chicken-and-waffles-los-angeles-3',
        name: "Chuck's Chicken & Waffles",
        image_url:
          'https://s3-media4.fl.yelpcdn.com/bphoto/l6b47ZrkIlzy8QZqYRHLcw/o.jpg',
        is_closed: false,
        url: 'https://www.yelp.com/biz/chucks-chicken-and-waffles-los-angeles-3?adjust_creative=M27B9GV7zKtR8Ji7_NCmOw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=M27B9GV7zKtR8Ji7_NCmOw',
        review_count: 4,
        categories: [
          { alias: 'fooddeliveryservices', title: 'Food Delivery Services' },
          { alias: 'chicken_wings', title: 'Chicken Wings' },
          { alias: 'waffles', title: 'Waffles' },
        ],
        rating: 1.0,
        coordinates: { latitude: 34.0982, longitude: -118.3537 },
        transactions: ['pickup', 'delivery'],
        location: {
          address1: '7533 W Sunset Blvd',
          address2: null,
          address3: null,
          city: 'Los Angeles',
          zip_code: '90046',
          country: 'US',
          state: 'CA',
          display_address: ['7533 W Sunset Blvd', 'Los Angeles, CA 90046'],
        },
        phone: '+13235055027',
        display_phone: '(323) 505-5027',
        distance: 7611.621186463202,
      },
      {
        id: 'AGyxcozRYuFPpRD-nBRu0Q',
        alias: 'pasta-sisters-culver-city-culver-city',
        name: 'Pasta Sisters - Culver City',
        image_url:
          'https://s3-media3.fl.yelpcdn.com/bphoto/mbyx4UJR1cggXByjsiZoTA/o.jpg',
        is_closed: false,
        url: 'https://www.yelp.com/biz/pasta-sisters-culver-city-culver-city?adjust_creative=M27B9GV7zKtR8Ji7_NCmOw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=M27B9GV7zKtR8Ji7_NCmOw',
        review_count: 1856,
        categories: [
          { alias: 'italian', title: 'Italian' },
          { alias: 'wine_bars', title: 'Wine Bars' },
        ],
        rating: 4.0,
        coordinates: { latitude: 34.030029, longitude: -118.383983 },
        transactions: ['pickup', 'delivery'],
        price: '$$',
        location: {
          address1: '3280 Helms Ave',
          address2: null,
          address3: '',
          city: 'Culver City',
          zip_code: '90232',
          country: 'US',
          state: 'CA',
          display_address: ['3280 Helms Ave', 'Culver City, CA 90232'],
        },
        phone: '+14246034503',
        display_phone: '(424) 603-4503',
        distance: 2865.8668284395017,
      },
      {
        id: 'rYPQv2bCk2orpbHCBfY5Uw',
        alias: 'johnnys-west-adams-los-angeles',
        name: "Johnny's West Adams",
        image_url:
          'https://s3-media2.fl.yelpcdn.com/bphoto/_choXUKq1aJn5UEbHMXpcw/o.jpg',
        is_closed: false,
        url: 'https://www.yelp.com/biz/johnnys-west-adams-los-angeles?adjust_creative=M27B9GV7zKtR8Ji7_NCmOw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=M27B9GV7zKtR8Ji7_NCmOw',
        review_count: 380,
        categories: [
          { alias: 'tradamerican', title: 'American (Traditional)' },
          { alias: 'bars', title: 'Bars' },
        ],
        rating: 4.0,
        coordinates: {
          latitude: 34.03291107460704,
          longitude: -118.33291174428074,
        },
        transactions: ['pickup', 'delivery'],
        price: '$$',
        location: {
          address1: '4327 W Adams Blvd',
          address2: null,
          address3: '',
          city: 'Los Angeles',
          zip_code: '90018',
          country: 'US',
          state: 'CA',
          display_address: ['4327 W Adams Blvd', 'Los Angeles, CA 90018'],
        },
        phone: '+13238403048',
        display_phone: '(323) 840-3048',
        distance: 1865.078131561916,
      },
      {
        id: '2JdQ9vo87C5dQroHzW0oYg',
        alias: 'go-go-bird-culver-city-3',
        name: 'Go Go Bird',
        image_url:
          'https://s3-media4.fl.yelpcdn.com/bphoto/8PpFlRk6tMI9AZ_6Y2aEyA/o.jpg',
        is_closed: false,
        url: 'https://www.yelp.com/biz/go-go-bird-culver-city-3?adjust_creative=M27B9GV7zKtR8Ji7_NCmOw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=M27B9GV7zKtR8Ji7_NCmOw',
        review_count: 103,
        categories: [{ alias: 'chicken_wings', title: 'Chicken Wings' }],
        rating: 4.5,
        coordinates: {
          latitude: 34.025094439840444,
          longitude: -118.39410560223558,
        },
        transactions: [],
        price: '$$',
        location: {
          address1: '9355 Culver Blvd',
          address2: null,
          address3: null,
          city: 'Culver City',
          zip_code: '90232',
          country: 'US',
          state: 'CA',
          display_address: ['9355 Culver Blvd', 'Culver City, CA 90232'],
        },
        phone: '',
        display_phone: '',
        distance: 3842.305418376381,
      },
      {
        id: 'LXhSp1RYSHIEZ4c01ewmPA',
        alias: 'loqui-culver-city',
        name: 'Loqui',
        image_url:
          'https://s3-media2.fl.yelpcdn.com/bphoto/wjV3vEGKnaoMxm-fP2wROA/o.jpg',
        is_closed: false,
        url: 'https://www.yelp.com/biz/loqui-culver-city?adjust_creative=M27B9GV7zKtR8Ji7_NCmOw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=M27B9GV7zKtR8Ji7_NCmOw',
        review_count: 770,
        categories: [{ alias: 'mexican', title: 'Mexican' }],
        rating: 4.5,
        coordinates: { latitude: 34.0274352, longitude: -118.387498 },
        transactions: ['delivery'],
        price: '$$',
        location: {
          address1: '8830 Washington Blvd',
          address2: 'Ste 104',
          address3: '',
          city: 'Culver City',
          zip_code: '90232',
          country: 'US',
          state: 'CA',
          display_address: [
            '8830 Washington Blvd',
            'Ste 104',
            'Culver City, CA 90232',
          ],
        },
        phone: '+19499972800',
        display_phone: '(949) 997-2800',
        distance: 3212.2573470900993,
      },
      {
        id: 'ccJcaRCHQkJmmnGC1SN4hQ',
        alias: 'louders-los-angeles',
        name: 'Louders',
        image_url:
          'https://s3-media4.fl.yelpcdn.com/bphoto/hL3oRmpqEL7kDVzqtbBliA/o.jpg',
        is_closed: false,
        url: 'https://www.yelp.com/biz/louders-los-angeles?adjust_creative=M27B9GV7zKtR8Ji7_NCmOw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=M27B9GV7zKtR8Ji7_NCmOw',
        review_count: 352,
        categories: [
          { alias: 'chicken_wings', title: 'Chicken Wings' },
          { alias: 'cajun', title: 'Cajun/Creole' },
          { alias: 'asianfusion', title: 'Asian Fusion' },
        ],
        rating: 4.5,
        coordinates: { latitude: 34.06309, longitude: -118.29754 },
        transactions: ['pickup', 'delivery'],
        price: '$$',
        location: {
          address1: '3470 W 6th St',
          address2: null,
          address3: '',
          city: 'Los Angeles',
          zip_code: '90020',
          country: 'US',
          state: 'CA',
          display_address: ['3470 W 6th St', 'Los Angeles, CA 90020'],
        },
        phone: '+12132639492',
        display_phone: '(213) 263-9492',
        distance: 6302.425589567487,
      },
      {
        id: 'bOvnQYw5JJDhpOn70_RUkQ',
        alias: 'oui-melrose-los-angeles-2',
        name: 'OUI MELROSE',
        image_url:
          'https://s3-media4.fl.yelpcdn.com/bphoto/-LpgjJEDCfRtJgqDwql8Ew/o.jpg',
        is_closed: false,
        url: 'https://www.yelp.com/biz/oui-melrose-los-angeles-2?adjust_creative=M27B9GV7zKtR8Ji7_NCmOw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=M27B9GV7zKtR8Ji7_NCmOw',
        review_count: 241,
        categories: [
          { alias: 'sandwiches', title: 'Sandwiches' },
          { alias: 'newamerican', title: 'American (New)' },
          { alias: 'mediterranean', title: 'Mediterranean' },
        ],
        rating: 4.5,
        coordinates: { latitude: 34.083653, longitude: -118.3419599 },
        transactions: ['pickup', 'delivery'],
        price: '$$',
        location: {
          address1: '6909 Melrose Ave',
          address2: '',
          address3: null,
          city: 'Los Angeles',
          zip_code: '90038',
          country: 'US',
          state: 'CA',
          display_address: ['6909 Melrose Ave', 'Los Angeles, CA 90038'],
        },
        phone: '+13238523944',
        display_phone: '(323) 852-3944',
        distance: 6070.870854405852,
      },
      {
        id: 'K8JWSdSz_IYyjGvv0RSBiA',
        alias: 'citizen-public-market-culver-city',
        name: 'Citizen Public Market',
        image_url:
          'https://s3-media4.fl.yelpcdn.com/bphoto/JSaaOt1OOQ2LasBAp31WPg/o.jpg',
        is_closed: false,
        url: 'https://www.yelp.com/biz/citizen-public-market-culver-city?adjust_creative=M27B9GV7zKtR8Ji7_NCmOw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=M27B9GV7zKtR8Ji7_NCmOw',
        review_count: 79,
        categories: [{ alias: 'food_court', title: 'Food Court' }],
        rating: 4.0,
        coordinates: { latitude: 34.025087, longitude: -118.394109 },
        transactions: [],
        price: '$$',
        location: {
          address1: '9355 Culver Blvd',
          address2: '',
          address3: null,
          city: 'Culver City',
          zip_code: '90232',
          country: 'US',
          state: 'CA',
          display_address: ['9355 Culver Blvd', 'Culver City, CA 90232'],
        },
        phone: '',
        display_phone: '',
        distance: 3842.7285213126106,
      },
      {
        id: 'lNE4CZLrLXRPhqi7KcyjfA',
        alias: 'burrata-house-los-angeles-4',
        name: 'Burrata House',
        image_url:
          'https://s3-media2.fl.yelpcdn.com/bphoto/KxypD-DwG0FUIWY24d06rQ/o.jpg',
        is_closed: false,
        url: 'https://www.yelp.com/biz/burrata-house-los-angeles-4?adjust_creative=M27B9GV7zKtR8Ji7_NCmOw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=M27B9GV7zKtR8Ji7_NCmOw',
        review_count: 545,
        categories: [
          { alias: 'sandwiches', title: 'Sandwiches' },
          { alias: 'italian', title: 'Italian' },
          { alias: 'pastashops', title: 'Pasta Shops' },
        ],
        rating: 4.5,
        coordinates: { latitude: 34.02979, longitude: -118.410755 },
        transactions: ['pickup', 'delivery'],
        price: '$$',
        location: {
          address1: '3272 Motor Ave',
          address2: null,
          address3: '',
          city: 'Los Angeles',
          zip_code: '90034',
          country: 'US',
          state: 'CA',
          display_address: ['3272 Motor Ave', 'Los Angeles, CA 90034'],
        },
        phone: '+18442877282',
        display_phone: '(844) 287-7282',
        distance: 5335.305672541285,
      },
      {
        id: 'f8nMwVf1kYndUo8V1OdGjA',
        alias: 'etta-culver-city-2',
        name: 'etta',
        image_url:
          'https://s3-media2.fl.yelpcdn.com/bphoto/C0MbfZGgO_2VgL09LHrC_w/o.jpg',
        is_closed: false,
        url: 'https://www.yelp.com/biz/etta-culver-city-2?adjust_creative=M27B9GV7zKtR8Ji7_NCmOw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=M27B9GV7zKtR8Ji7_NCmOw',
        review_count: 603,
        categories: [
          { alias: 'newamerican', title: 'American (New)' },
          { alias: 'breakfast_brunch', title: 'Breakfast & Brunch' },
          { alias: 'cocktailbars', title: 'Cocktail Bars' },
        ],
        rating: 4.5,
        coordinates: {
          latitude: 34.02806083637388,
          longitude: -118.38729323543357,
        },
        transactions: [],
        location: {
          address1: '8801 Washington Blvd',
          address2: '',
          address3: null,
          city: 'Culver City',
          zip_code: '90232',
          country: 'US',
          state: 'CA',
          display_address: ['8801 Washington Blvd', 'Culver City, CA 90232'],
        },
        phone: '+14245704444',
        display_phone: '(424) 570-4444',
        distance: 3184.541386298454,
      },
      {
        id: 'RTwblFtLXTb0OWLdwOYPHw',
        alias: 'krapow-culver-city',
        name: 'Krapow',
        image_url:
          'https://s3-media3.fl.yelpcdn.com/bphoto/4RuxpraYllaYZBmPeoCKsw/o.jpg',
        is_closed: false,
        url: 'https://www.yelp.com/biz/krapow-culver-city?adjust_creative=M27B9GV7zKtR8Ji7_NCmOw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=M27B9GV7zKtR8Ji7_NCmOw',
        review_count: 47,
        categories: [{ alias: 'thai', title: 'Thai' }],
        rating: 5.0,
        coordinates: {
          latitude: 33.98707832792813,
          longitude: -118.39632954655025,
        },
        transactions: ['pickup', 'delivery'],
        price: '$$',
        location: {
          address1: '5660 Selmaraine Dr',
          address2: null,
          address3: '',
          city: 'Culver City',
          zip_code: '90230',
          country: 'US',
          state: 'CA',
          display_address: ['5660 Selmaraine Dr', 'Culver City, CA 90230'],
        },
        phone: '+18319991688',
        display_phone: '(831) 999-1688',
        distance: 6218.165446763435,
      },
      {
        id: 'g83JcbEp4DyKOcLJNmswvA',
        alias: 'cevichestop-culver-city-2',
        name: 'CevicheStop',
        image_url:
          'https://s3-media2.fl.yelpcdn.com/bphoto/yfH5RqCN8wEeKK4ppCj5EQ/o.jpg',
        is_closed: false,
        url: 'https://www.yelp.com/biz/cevichestop-culver-city-2?adjust_creative=M27B9GV7zKtR8Ji7_NCmOw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=M27B9GV7zKtR8Ji7_NCmOw',
        review_count: 179,
        categories: [
          { alias: 'seafood', title: 'Seafood' },
          { alias: 'peruvian', title: 'Peruvian' },
          { alias: 'latin', title: 'Latin American' },
        ],
        rating: 4.0,
        coordinates: { latitude: 34.032231, longitude: -118.374364 },
        transactions: ['pickup', 'delivery'],
        price: '$$',
        location: {
          address1: '2901 S La Cienega Blvd',
          address2: null,
          address3: null,
          city: 'Culver City',
          zip_code: '90232',
          country: 'US',
          state: 'CA',
          display_address: ['2901 S La Cienega Blvd', 'Culver City, CA 90232'],
        },
        phone: '+14242988882',
        display_phone: '(424) 298-8882',
        distance: 2003.6465127436281,
      },
      {
        id: '5LU6aNLDG10imXu3btmlcw',
        alias: 'annies-soul-delicious-los-angeles',
        name: "Annie's Soul Delicious",
        image_url:
          'https://s3-media1.fl.yelpcdn.com/bphoto/Uk_huWPqQKZvyuLjcD49lw/o.jpg',
        is_closed: false,
        url: 'https://www.yelp.com/biz/annies-soul-delicious-los-angeles?adjust_creative=M27B9GV7zKtR8Ji7_NCmOw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=M27B9GV7zKtR8Ji7_NCmOw',
        review_count: 581,
        categories: [
          { alias: 'soulfood', title: 'Soul Food' },
          { alias: 'southern', title: 'Southern' },
        ],
        rating: 4.5,
        coordinates: { latitude: 34.05624, longitude: -118.36439 },
        transactions: ['pickup', 'delivery'],
        price: '$$',
        location: {
          address1: '1066 S Fairfax Ave',
          address2: null,
          address3: '',
          city: 'Los Angeles',
          zip_code: '90019',
          country: 'US',
          state: 'CA',
          display_address: ['1066 S Fairfax Ave', 'Los Angeles, CA 90019'],
        },
        phone: '+13234247402',
        display_phone: '(323) 424-7402',
        distance: 3134.300837151133,
      },
    ],
    total: 8200,
    region: { center: { longitude: -118.3528, latitude: 34.0298 } },
  };

  businessID: any;
  businessArray: any;
  detailsArray: any;
  mappedDetailObj: any;

  detailsJSON: any; //store detail JSON results here
  detailsAvailable = false;
  detailArrayPhotos: any;

  reviewsJSON: any;

  @Input() businesses: any;
  @Input() searchResultsAvailable: any;

  showResults = true;

  ngOnInit() {
    // this.searchService.getData().subscribe((data) =>
    // this.businesses = data)
  }

  ngOnChanges() {
    if ((this.searchResultsAvailable = true)) {
      this.mapResults(this.businesses);
    }
  }

  mapResults(jsonData: any) {
    this.businessArray = jsonData.map(
      (value: {
        name: any;
        image_url: any;
        rating: any;
        distance: number;
        url: any;
        id: any;
      }) => {
        return <business>{
          name: value.name,
          img_url: value.image_url,
          rating: value.rating,
          distance: (value.distance * 0.000621371).toFixed(2),
          url: value.url,
          id: value.id,
        };
      }
    );
  }

  showDetails(id: any) {
    this.searchDetails(id);
    this.businessID = id;
  }

  searchDetails(id: any) {
    this.detailsService
      .getDetails(id)
      .subscribe((apiData: any) => {
        console.log('Details JSON: ', apiData);

        this.detailsJSON = apiData;
        this.detailsAvailable = true;
        this.showResults = false;

      });
  }

  searchReview(id: any) {
    this.reviewS
      .getReviews(id)
      .subscribe((apiData: any) => {

        this.reviewsJSON = apiData.reviews;
        console.log("Reviews response: ", this.reviewsJSON);
      })
  }

  closeDetails(event: any){
    this.detailsAvailable = event;
    this.showResults = true;
    this.ref.detectChanges();
  
    console.log("From results table comp, details closeDetails()");
  }

  re_displayResults(event: any) {
    this.showResults = true;
    this.ref.detectChanges();
    console.log("From results table component, showResults bool: ", this.showResults);
  }
}
