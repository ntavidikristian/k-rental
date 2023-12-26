import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarService } from '../../../common/http/car.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'k-rental-car-listing',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './car-listing.component.html',
  styleUrl: './car-listing.component.scss',
})
export class CarListingComponent {

  protected cars$ = inject(CarService).getAllCars();
  
}
