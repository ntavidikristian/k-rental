import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../../common/http/booking.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'k-rental-booking-listing',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './booking-listing.component.html',
  styleUrl: './booking-listing.component.scss',
})
export class BookingListingComponent {
  protected bookings$ = inject(BookingService).getAllBookings();
}
