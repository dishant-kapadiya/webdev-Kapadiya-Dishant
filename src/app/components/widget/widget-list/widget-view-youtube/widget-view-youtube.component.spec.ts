import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetViewYoutubeComponent } from './widget-view-youtube.component';

describe('WidgetViewYoutubeComponent', () => {
  let component: WidgetViewYoutubeComponent;
  let fixture: ComponentFixture<WidgetViewYoutubeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetViewYoutubeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetViewYoutubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
