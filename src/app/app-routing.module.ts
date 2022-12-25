import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'get-breanch',
    pathMatch: 'full'
  },
  {
    path: 'order-here',
    loadChildren: () => import('./pages/order-here/order-here.module').then( m => m.OrderHerePageModule)
  },
  {
    path: 'suggestions',
    loadChildren: () => import('./pages/suggestions/suggestions.module').then( m => m.SuggestionsPageModule)
  },
  {
    path: 'main_menu',
    loadChildren: () => import('./pages/main-menu/main-menu.module').then( m => m.MainMenuPageModule)
  },
  {
    path: 'payment',
    loadChildren: () => import('./pages/payment/payment.module').then( m => m.PaymentPageModule)
  },
  {
    path: 'review',
    loadChildren: () => import('./pages/review/review.module').then( m => m.ReviewPageModule)
  },
  {
    path: 'add-souce',
    loadChildren: () => import('./pages/add-souce/add-souce.module').then( m => m.AddSoucePageModule)
  },
  {
    path: 'quantity',
    loadChildren: () => import('./pages/quantity/quantity.module').then( m => m.QuantityPageModule)
  },
  {
    path: 'categoris',
    loadChildren: () => import('./pages/categoris/categoris.module').then( m => m.CategorisPageModule)
  },
  {
    path: 'order-number',
    loadChildren: () => import('./pages/order-number/order-number.module').then( m => m.OrderNumberPageModule)
  },
  {
    path: 'discount',
    loadChildren: () => import('./pages/discount/discount.module').then( m => m.DiscountPageModule)
  },
  {
    path: 'promtions',
    loadChildren: () => import('./pages/promtions/promtions.module').then( m => m.PromtionsPageModule)
  },
  {
    path: 'prom-details',
    loadChildren: () => import('./pages/prom-details/prom-details.module').then( m => m.PromDetailsPageModule)
  },
  {
    path: 'phone-number',
    loadChildren: () => import('./pages/phone-number/phone-number.module').then( m => m.PhoneNumberPageModule)
  },
  {
    path: 'add-modfires',
    loadChildren: () => import('./pages/add-modfires/add-modfires.module').then( m => m.AddModfiresPageModule)
  },
  {
    path: 'compo',
    loadChildren: () => import('./pages/compo/compo.module').then( m => m.CompoPageModule)
  },
  {
    path: 'compo-details',
    loadChildren: () => import('./pages/compo-details/compo-details.module').then( m => m.CompoDetailsPageModule)
  },
  {
    path: 'get-breanch',
    loadChildren: () => import('./pages/get-breanch/get-breanch.module').then( m => m.GetBreanchPageModule)
  },
  {
    path: 'chose-branch',
    loadChildren: () => import('./pages/chose-branch/chose-branch.module').then( m => m.ChoseBranchPageModule)
  },
  {
    path: 'choose-combo',
    loadChildren: () => import('./pages/choose-combo/choose-combo.module').then( m => m.ChooseComboPageModule)
  },
  {
    path: 'customize',
    loadChildren: () => import('./pages/customize/customize.module').then( m => m.CustomizePageModule)
  },
  {
    path: 'edit-customiz',
    loadChildren: () => import('./pages/edit-customiz/edit-customiz.module').then( m => m.EditCustomizPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
