import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/gaurd/auth.guard';
import { MedicalComponent } from './medical.component';


const routes: Routes = [{
  path: '',
  component: MedicalComponent,
  canActivate:[AuthGuard],
  children: [
    {
      path: '',
      redirectTo:'dashboard',
      pathMatch:'full'
    },
    {
      path: 'dashboard',
      loadChildren: () =>
        import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
    },
    {
      path: 'roles',
      loadChildren: () =>
        import('./roles/roles.module').then((m) => m.RolesModule),
    },
    {
      path: 'staff',
      loadChildren: () =>
        import('./staff/staff.module').then((m) => m.StaffModule),
    },
    {
      path: 'specialty',
      loadChildren: () =>
        import('./specialty/specialty.module').then((m) => m.SpecialtyModule),
    },
    {
      path: 'doctor',
      loadChildren: () =>
        import('./doctor/doctor.module').then((m) => m.DoctorModule),
    },
    {
      path: 'patient',
      loadChildren: () =>
        import('./patient/patient.module').then((m) => m.PatientModule),
    },

  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicalRoutingModule { }
