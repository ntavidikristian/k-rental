import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { createBookingForm } from './booking-editor.model';

@Component({
  selector: 'k-rental-booking-editor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking-editor.component.html',
  styleUrl: './booking-editor.component.scss',
})
export class BookingEditorComponent {

  protected form = createBookingForm();

}
