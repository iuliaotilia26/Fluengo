import { Routes, RouterModule } from '@angular/router';

import { TeacherComponent} from './teacher.component';

export const routes: Routes = [
    { path: 'teacher/:id', component: TeacherComponent }
];

export const routing = RouterModule.forChild(routes);
