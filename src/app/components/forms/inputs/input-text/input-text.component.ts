import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-text',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.css',
})
export class InputTextComponent {
  @Input() formGroup!: FormGroup;
  @Input() label!: string;
  @Input() name!: string;
  @Input() placeholder: string = '';
  @Input() hidden: boolean = false;
  @Input() value: string = '';
  @Input() error: boolean = false;
}
