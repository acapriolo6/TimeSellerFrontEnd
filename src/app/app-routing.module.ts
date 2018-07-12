import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from './component/index/index.component';
import {NotFoundComponent} from './component/not-found/not-found.component';
import {UserDetailComponent} from './component/user-detail/user-detail.component';
import {LoginComponent} from './component/login/login.component';
import {CreateAuctionComponent} from './component/create-auction/create-auction.component';
import {SignUpComponent} from './component/sign-up/sign-up.component';
import {SaleDetailsComponent} from './component/sale-details/sale-details.component';
import {AdminPageComponent} from './component/admin-page/admin-page.component';
import {OffertPageComponent} from "./component/offert-page/offert-page.component";
import {ConsoleAdminComponent} from './component/console-admin/console-admin.component';
import {AuctionhistoryComponent} from './component/auctionHistory/auctionhistory.component';

const routes: Routes = [
  {path: 'user/:username/:password/:age', component: UserDetailComponent},
  {path: 'user/auction', component: SaleDetailsComponent},
  {path: 'user/signup', component: SignUpComponent},
  {path: 'user/admin', component: ConsoleAdminComponent},
  {path: 'user/userList', component: AdminPageComponent},
  {path: 'user/auctionHistory', component: AuctionhistoryComponent},
  {path: 'createAuction', component: CreateAuctionComponent},
  {path: 'login', component: LoginComponent},
  {path: 'index', component: IndexComponent},
  {path: 'offers/:bid', component: OffertPageComponent},
  {path: '', component: IndexComponent},
  {path: '**', component: NotFoundComponent}
];

export const RoutingModule: ModuleWithProviders = RouterModule.forRoot(routes, {useHash: true});

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class AppRoutingModule { }
