import { Component, Renderer2, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'input[type="checkbox"][app-md-checkbox]',
  templateUrl: './md-checkbox.component.html',
  styleUrls: ['./md-checkbox.component.scss'],
  styles: ['--size: 1.2rem'] // default size
})
export class MdCheckboxComponent implements OnChanges {

  @Input() mdCheckboxSize: string;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.renderer.setAttribute(this.el.nativeElement, 'style', `--size: ${changes.mdCheckboxSize.currentValue}`);
  }
}