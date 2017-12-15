import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageLocationsComponent } from './locations.component';

describe('PageLocationsComponent', () => {
  let component: PageLocationsComponent;
  let fixture: ComponentFixture<PageLocationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageLocationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
