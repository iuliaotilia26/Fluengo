import {ElementRef, Directive, NgZone, OnInit, AfterViewInit} from '@angular/core';
import {FormControl} from '@angular/forms';

import * as moment from 'moment';

declare const $: any;

@Directive({
  inputs: ['dateTimePicker'],
  selector: '[dateTimePicker]'
})
export class DateTimePickerDirective implements OnInit, AfterViewInit {
  dateTimePicker: any;

  private id: string = Math.random().toString(36).substr(2, 5);
  private controlName: string;
  private theControl: FormControl;

  public constructor(private elRef: ElementRef, private zone: NgZone) {
  }

  public ngOnInit() {
    this.zone.runOutsideAngular(() => {
      if (this.dateTimePicker.formGroup) {
        this.controlName = this.elRef.nativeElement.getAttribute('formControlName');
        this.theControl = <FormControl>this.dateTimePicker.formGroup.controls[this.controlName];
      }
      this.elRef.nativeElement.setAttribute('date-time-picker-id', this.id);
    });
  }

  public ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      $(`[date-time-picker-id=${this.id}]`).datetimepicker();
      if (this.dateTimePicker.formGroup) {
        $(`[date-time-picker-id=${this.id}]`).data('DateTimePicker').date(moment(this.theControl.value));
      } else {
        if (this.dateTimePicker.minDate) {
          $(`[date-time-picker-id=${this.id}]`).data('DateTimePicker').minDate(moment(this.dateTimePicker.minDate));
          $(`[date-time-picker-id=${this.id}]`).data('DateTimePicker').date(null);
        } else {
          $(`[date-time-picker-id=${this.id}]`).data('DateTimePicker').date(moment(this.dateTimePicker.get()));
        }
      }

      $(`[date-time-picker-id=${this.id}]`).on('dp.change', (evt: any) => {
        this.zone.run(() => {
          let value: string = evt.date && moment(evt.date).startOf('minute').toISOString() || null;

          if (this.dateTimePicker.formGroup) {
            this.theControl.setValue(value, {emitEvent: true});
            this.theControl.markAsDirty();
            this.theControl.markAsTouched();
            this.theControl.updateValueAndValidity();
          } else {
            this.dateTimePicker.set(moment(evt.date).startOf('minute').toDate());
          }
        });
      });
    });
  }

  public ngOnDestroy(): void {
    try {
      this.zone.runOutsideAngular(() => {
        $(`[date-time-picker-id=${this.id}]`).data('DateTimePicker').destroy();
      });
    } catch (e) {
      console.error('Error:', e);
    }
  }
}
