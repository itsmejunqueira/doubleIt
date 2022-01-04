import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [{
  path: '',
  component: LayoutComponent,
  children: [
    { 
      path: 'produtos', 
      loadChildren: () => 
      import('../products/products.module').then(m => m.ProductsModule) 
    },
    { 
      path: 'home', 
      loadChildren: () => 
      import('../home/home.module').then(m => m.homeModule)
    },
    {
      path: '',
      redirectTo: '/home',
      pathMatch: 'full',
    },
  ],
},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
