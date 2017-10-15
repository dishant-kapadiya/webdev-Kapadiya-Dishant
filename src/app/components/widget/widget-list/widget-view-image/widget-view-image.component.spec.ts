import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetViewImageComponent } from './widget-view-image.component';

describe('WidgetViewImageComponent', () => {
  let component: WidgetViewImageComponent;
  let fixture: ComponentFixture<WidgetViewImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetViewImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetViewImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
