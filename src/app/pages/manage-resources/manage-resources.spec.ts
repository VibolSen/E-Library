import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageResources } from './manage-resources';

describe('ManageResources', () => {
  let component: ManageResources;
  let fixture: ComponentFixture<ManageResources>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageResources]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageResources);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
