import { Routes, RouterModule } from '@angular/router';

import { TeachersComponent } from './teachers.component';

export const routes: Routes = [
    { path: 'teachers', component: TeachersComponent}
];

export const routing = RouterModule.forChild(routes);
