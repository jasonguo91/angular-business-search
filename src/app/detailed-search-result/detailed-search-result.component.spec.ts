import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedSearchResultComponent } from './detailed-search-result.component';

describe('DetailedSearchResultComponent', () => {
  let component: DetailedSearchResultComponent;
  let fixture: ComponentFixture<DetailedSearchResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailedSearchResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailedSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
