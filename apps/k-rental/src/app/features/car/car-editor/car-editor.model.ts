import { FormControl, FormGroup, Validators } from "@angular/forms";

export type CreateCarForm = {
    model: FormControl<string | null>;
    manufacturerId: FormControl<string | null>;
    mileage: FormControl<string | null>;
    registrationYear: FormControl<number| null>;
    manufactureYear: FormControl<number| null>;
}

export function createCarForm(): FormGroup<CreateCarForm>{
    return new FormGroup({
        manufacturerId: new FormControl<string | null>(null, [Validators.required]),
        manufactureYear: new FormControl<number | null>(null, [Validators.required]),
        mileage: new FormControl<string | null>(null, [Validators.required]),
        model: new FormControl<string | null>(null, [Validators.required]),
        registrationYear: new FormControl<number | null>(null, [Validators.required])
    })
}