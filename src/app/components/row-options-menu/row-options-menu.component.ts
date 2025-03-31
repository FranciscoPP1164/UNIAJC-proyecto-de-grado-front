import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-row-options-menu',
  standalone: true,
  imports: [],
  templateUrl: './row-options-menu.component.html',
  styleUrl: './row-options-menu.component.css',
})
export class RowOptionsMenuComponent {
  @Output() onSelect = new EventEmitter<'edit' | 'delete'>();
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onOptionClick(option: 'edit' | 'delete') {
    this.onSelect.emit(option);
    this.isMenuOpen = false;
  }
}
