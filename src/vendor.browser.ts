// For vendors for example jQuery, Lodash, angular2-jwt just import them here unless you plan on
// chunking vendors files for async loading. You would need to import the async loaded vendors
// at the entry point of the async loaded file. Also see custom-typings.d.ts as you also need to
// run `typings install x` where `x` is your module

// TODO(gdi2290): switch to DLLs

// Angular 2
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/core';
import '@angular/common';
import '@angular/forms';
import '@angular/http';
import '@angular/router';

import 'select2';

// AngularClass
import '@angularclass/hmr';

// RxJS
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

// Vendor CSS
import 'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css';
import 'select2/dist/css/select2.css';
import 'ng2-toastr/bundles/ng2-toastr.min.css';

// Own app "vendor" CSS
import './assets/css/style.css';
import './assets/js/vegas/vegas.css';
import './assets/css/custom.css';


// Vendor JS;
import 'jquery';
import 'select2';
import 'vegas';
import 'moment';

import 'bootstrap/dist/js/npm';
import 'eonasdan-bootstrap-datetimepicker/src/js/bootstrap-datetimepicker';
import 'ng2-toastr';

if ('production' === ENV) {
  // Production
} else {
  // Development
}
