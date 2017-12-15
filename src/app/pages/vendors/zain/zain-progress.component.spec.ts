import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageZainComponent } from './zain-progress.component';

describe('PageZainComponent', () => {
  let component: PageZainComponent;
  let fixture: ComponentFixture<PageZainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageZainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageZainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
