import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { ProfileGuard } from './guards/profile.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full',
  },

  {
    path: 'chat',
    // canActivate: [ProfileGuard],
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'sign-up',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/sign-up/sign-up.module').then((m) => m.SignUpPageModule),
  },
  {
    path: 'sign-in',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/sign-in/sign-in.module').then((m) => m.SignInPageModule),
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
