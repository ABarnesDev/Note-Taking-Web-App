import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteReportComponent } from './note-report.component';

describe('NoteReportComponent', () => {
  let component: NoteReportComponent;
  let fixture: ComponentFixture<NoteReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
