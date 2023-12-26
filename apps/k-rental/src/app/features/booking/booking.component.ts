import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../common/http/booking.service';

@Component({
  selector: 'k-rental-booking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss',
})
export class BookingComponent {

  protected bookings$ = inject(BookingService).getAllBookings();

}
