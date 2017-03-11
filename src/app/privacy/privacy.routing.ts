/**
 * Created by Iulia Mustea on 12/16/2016.
 */
import { Routes, RouterModule } from '@angular/router';
import {PrivacyComponent} from "./privacy,component";


export const routes: Routes = [
  { path: 'privacy', component: PrivacyComponent}
];

export const routing = RouterModule.forChild(routes);
