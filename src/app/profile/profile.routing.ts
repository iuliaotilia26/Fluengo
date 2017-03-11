/**
 * Created by Iulia Mustea on 12/6/2016.
 */
import { Routes, RouterModule } from '@angular/router';

import {ProfileComponent} from './profile.component';

export const routes: Routes = [
  { path: 'profile/:id', component: ProfileComponent }
];

export const routing = RouterModule.forChild(routes);
