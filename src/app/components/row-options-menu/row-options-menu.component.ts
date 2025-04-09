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

  toggleMenu(event: Event) {
    this.isMenuOpen = !this.isMenuOpen;
    event.stopPropagation();
  }

  onOptionClick(option: 'edit' | 'delete', event: Event) {
    event.stopPropagation();
    this.onSelect.emit(option);
    this.isMenuOpen = false;
  }
}
