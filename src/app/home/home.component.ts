import {Component, NgZone, OnDestroy, OnInit, AfterViewInit, ChangeDetectorRef} from '@angular/core';

import { AppState } from '../app.service';
import { Title } from './title';
import { XLarge } from './x-large';
import {SearchService} from "../services/search.service";
import {Subject, Observable} from "rxjs";
import {Router} from "@angular/router";

declare const $: any;

@Component({

  selector: 'home',
  providers: [
    Title
  ],

  styleUrls: [ './home.component.css' ],

  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit  {
  languages=[];
  locations=[];


  select2LanguageOptions: any;


  private languageValue: string;

  select2LocationOptions: any;
  private locationValue: string;

  sliderReady = false;

  localState = { value: '' };

  constructor(public appState: AppState, public title: Title, private zone: NgZone, private searchService:SearchService,private ref: ChangeDetectorRef,private router: Router) {

  }

  ngOnInit() {

    const self = this;

    this.searchService.getLanguages().subscribe((languagesServer) => {
      this.languages = languagesServer.map(l => l.language);
      setTimeout(() => this.ref.detectChanges());

      const selectLanguageSource$ = new Subject<string>();
      this.select2LanguageOptions = {
        data: this.languages.map(l => ({id: l, text: l})),
        placeholder: 'Select a language',
        selectedData: this.languageValue,
        observerSubject: selectLanguageSource$
      };
      selectLanguageSource$.subscribe((value) => {
        self.languageValue = value;
        console.log('new language value', this.languageValue);
      });
    });

    this.searchService.getLocations().subscribe((locationsServer) => {
      this.locations = locationsServer.map(l => l.location);
      setTimeout(() => this.ref.detectChanges());

      const selectLocationSource$ = new Subject<string>();
      this.select2LocationOptions = {
        data: this.locations.map(l => ({id: l, text: l})),
        placeholder: 'Select a location',
        selectedData: this.locationValue,
        observerSubject: selectLocationSource$
      };
      selectLocationSource$.subscribe((value) => {
        self.locationValue = value;
        console.log('new location value', this.locationValue);
      });
    });


  }


  searchTeachers() {

    var toSearch={};
    if(this.languageValue) toSearch.language=this.languageValue;
    if(this.locationValue) toSearch.location=this.locationValue;
    this.router.navigate(['/teachers',toSearch]);

  }

  public ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {

      $("#header-carousel").vegas({
        slides: [
         { src: "/assets/img/slider/1.jpg" },
         { src: "/assets/img/slider/2.jpg" }
        ],
        transition: 'fade2',
        preloadImage: true,
        timer: true,
        shuffle: false,
        delay: 10000,
        animationDuration: 5000,
        animation: 'kenburns',
        cover: true,
        play: () => {
          this.zone.run(() => {
            this.sliderReady = true;
          });
        }
      });
    });
  }

  public ngOnDestroy(): void {
    this.zone.runOutsideAngular(() => {
      $("#header").vegas('destroy');
    });
  }

  submitState(value: string) {
    console.log('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';
  }
}
