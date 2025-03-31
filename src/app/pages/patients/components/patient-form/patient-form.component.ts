import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IPatientResponse } from '../../../../interfaces/api/patients/IPatient.response';
import { IPatientRequest } from '../../../../interfaces/api/patients/IPatient.request';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextComponent } from '../../../../components/forms/inputs/input-text/input-text.component';

@Component({
  selector: 'app-patient-form',
  standalone: true,
  imports: [InputTextComponent, ReactiveFormsModule],
  templateUrl: './patient-form.component.html',
  styleUrl: './patient-form.component.css',
})
export class PatientFormComponent {
  @Input() patient?: IPatientResponse;
  @Output() onSubmit = new EventEmitter<IPatientRequest>();

  formPatient!: FormGroup;
  didTrySubmitForm = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.buildPatientForm();
  }

  buildPatientForm(): void {
    this.formPatient = this.formBuilder.group({
      name: [this.patient?.name, [Validators.required]],
      birthdate: [this.patient?.birthdate, [Validators.required]],
      direction: [this.patient?.direction, [Validators.required]],
      document_identification: [
        this.patient?.document_identification,
        [Validators.required],
      ],
    });
  }

  handleSubmitFormPatient(): void {
    this.didTrySubmitForm = true;
    if (this.formPatient.invalid) {
      return;
    }

    const user = this.formPatient.value;

    this.onSubmit.emit(user);
  }

  get formData() {
    return this.formPatient.controls;
  }
}
