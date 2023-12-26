import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarService } from '../../common/http/car.service';

@Component({
  selector: 'k-rental-car',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './car.component.html',
  styleUrl: './car.component.scss',
})
export class CarComponent {

  protected cars$ = inject(CarService).getAllCars();

}
