/**
 * Created by Iulia Mustea on 12/20/2016.
 */
import { Routes, RouterModule } from '@angular/router';
import {BookingTeacherComponent} from "./bookingpage-teacher.component";


export const routes: Routes = [
  { path: 'bookingPage/:id', component: BookingTeacherComponent }
];

export const routing = RouterModule.forChild(routes);
