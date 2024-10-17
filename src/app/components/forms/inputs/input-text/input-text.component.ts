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
  @Input() public formGroup!: FormGroup;
  @Input() public label!: string;
  @Input() public name!: string;
  @Input() public placeholder: string = '';
  @Input() public hidden: boolean = false;
  @Input() public value: string = '';
  @Input() public error: boolean = false;
}
