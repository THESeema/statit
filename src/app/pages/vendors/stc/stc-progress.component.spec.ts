import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagestcComponent } from './stc-progress.component';

describe('PagestcComponent', () => {
  let component: PagestcComponent;
  let fixture: ComponentFixture<PagestcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagestcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagestcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
