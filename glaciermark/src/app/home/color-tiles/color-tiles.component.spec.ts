import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorTilesComponent } from './color-tiles.component';

describe('ColorTilesComponent', () => {
  let component: ColorTilesComponent;
  let fixture: ComponentFixture<ColorTilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorTilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorTilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
