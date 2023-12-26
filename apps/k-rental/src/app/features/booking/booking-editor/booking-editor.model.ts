import { FormControl, FormGroup, Validators } from "@angular/forms"
import { CreateBookingDto } from "@k-rental/dtos";

export type CreateBookingForm = {
    clientId: FormControl<string | null>;
    cardId: FormControl<string | null>;
    periods: FormControl; // todo
}

export function createBookingForm(): FormGroup<CreateBookingForm>{
    return new FormGroup({
        cardId: new FormControl<string | null>(null, [Validators.required]),
        clientId: new FormControl<string | null>(null, [Validators.required]),
        periods: new FormControl() // todo
    })
}