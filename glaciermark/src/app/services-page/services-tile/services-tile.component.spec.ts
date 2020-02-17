import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesTileComponent } from './services-tile.component';

describe('ServicesTileComponent', () => {
  let component: ServicesTileComponent;
  let fixture: ComponentFixture<ServicesTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicesTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
