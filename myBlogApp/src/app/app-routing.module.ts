import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

{path : '', redirectTo: 'login', pathMatch : 'full'},
{path : 'admin',  loadChildren:() => import('./core/core.module').then(m=>m.CoreModule)},
{path : 'blog',  loadChildren:() => import('./blog/blog.module').then(m=>m.BlogModule)},
{path : 'book',  loadChildren:() => import('./book/book.module').then(m=>m.BookModule)},
{path : 'profile',  loadChildren:() => import('./user/user.module').then(m=>m.UserModule)},

{ path: 'core', loadChildren: () => import('./core/core.module').then(m => m.CoreModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
