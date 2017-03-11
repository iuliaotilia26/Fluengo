import {ElementRef, Directive, NgZone, OnInit, AfterViewInit, Input, OnDestroy} from '@angular/core';
import {Subject} from "rxjs";

declare const $: any;

@Directive({
  selector: '[mySelectControl]'
})
export class SelectControlDirective implements OnInit, AfterViewInit, OnDestroy {
  @Input() mySelectControl: any;

  private _selectObserverSource$: Subject<string>;
  private _id: string = Math.random().toString(36).substr(2, 5);

  public constructor(private elRef: ElementRef, private zone: NgZone) {
  }

  public ngOnInit() {
    this.zone.runOutsideAngular(() => {
      this.elRef.nativeElement.setAttribute('select2-id', this._id);
    });
  }

  public ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      this._selectObserverSource$ = this.mySelectControl.observerSubject;

      const $control = $(`[select2-id=${this._id}]`);

      $control
        .select2(this.mySelectControl)
        .on('change', () => {
          this.zone.run(() => {
            this._selectObserverSource$.next($control.select2('data').map((itm) => itm.id) || []);
          });
        });
    });
  }

  public ngOnDestroy(): void {
    try {
      this.zone.runOutsideAngular(() => {
        $(`[select2-id=${this._id}]`).select2('destroy');
      });
    } catch (e) {
      console.error('Error:', e);
    }
  }
}
