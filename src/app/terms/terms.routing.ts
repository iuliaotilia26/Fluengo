/**
 * Created by Iulia Mustea on 12/16/2016.
 */
import { Routes, RouterModule } from '@angular/router';
import {TermsComponent} from "./terms.component";


export const routes: Routes = [
  { path: 'terms', component: TermsComponent}
];

export const routing = RouterModule.forChild(routes);
