import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/_services/auth.guard';
import { LoginGuard } from './auth/_services/login.guard';


@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'login', canActivate: [LoginGuard], component: LoginComponent },
      {
        path: '',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./layout/layout.module').then((m) => m.LayoutModule),
      },
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
