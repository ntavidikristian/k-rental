import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../../../common/http/car.service';
import { createCarForm } from './car-editor.model';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'k-rental-car-editor',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  templateUrl: './car-editor.component.html',
  styleUrl: './car-editor.component.scss',
})
export class CarEditorComponent {

  readonly #carService = inject(CarService);
  readonly #destroyRef = inject(DestroyRef);
  readonly #router = inject(Router);
  readonly #route = inject(ActivatedRoute);


  protected form = createCarForm();


  protected submit(): void{
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

    this.#carService.createCar(this.form.value)
    .pipe(
      takeUntilDestroyed(this.#destroyRef)
    ).subscribe(() => {
      this.#router.navigate(['../'], {relativeTo: this.#route})
    })
  }

}
