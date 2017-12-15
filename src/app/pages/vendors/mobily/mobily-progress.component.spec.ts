import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageMobilyComponent } from './mobily-progress.component';

describe('PageMobilyComponent', () => {
  let component: PageMobilyComponent;
  let fixture: ComponentFixture<PageMobilyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageMobilyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageMobilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
