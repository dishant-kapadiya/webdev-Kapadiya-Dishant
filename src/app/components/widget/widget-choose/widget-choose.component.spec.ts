import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetChooseComponent } from './widget-choose.component';

describe('WidgetChooseComponent', () => {
  let component: WidgetChooseComponent;
  let fixture: ComponentFixture<WidgetChooseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetChooseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetChooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
