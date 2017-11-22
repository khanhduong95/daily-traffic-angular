import { Directive, forwardRef, Attribute } from '@angular/core';
import { NG_VALIDATORS, Validator, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

@Directive({
    selector: '[equalValidate][ngModel]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => EqualValidator),
            multi: true
        }
    ]
})

export class EqualValidator implements Validator {

    constructor(@Attribute('equalValidate') public equalValidate: string) { }

    validate(abControl: AbstractControl): { [key: string]: any } {
        // Get self value.
        let val = abControl.value;

        // Get control value.
        let cValue = abControl.root.get(this.equalValidate);

        // value not equal
        if (cValue && val !== cValue.value) return {
            equalValidate: true
        }

        return null;
    }
}
