import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../../common/http/booking.service';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'k-rental-booking-listing',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule
  ],
  templateUrl: './booking-listing.component.html',
  styleUrl: './booking-listing.component.scss',
})
export class BookingListingComponent {
  protected bookings$ = inject(BookingService).getAllBookings();
}
