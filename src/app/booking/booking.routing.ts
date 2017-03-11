/**
 * Created by Iulia Mustea on 11/16/2016.
 */
import { Routes, RouterModule } from '@angular/router';

import { BookingComponent } from './booking.component';

export const routes: Routes = [
  { path: 'booking/:role/:id', component: BookingComponent},
];

export const routing = RouterModule.forChild(routes);
