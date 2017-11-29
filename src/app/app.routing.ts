/**
 * Created by sesha on 7/26/17.
 */

import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {LoginComponent} from './components/user/login/login.component';
import {RegisterComponent} from './components/user/register/register.component';
import {ProfileComponent} from './components/user/profile/profile.component';
import {PageEditComponent} from './components/page/page-edit/page-edit.component';
import {PageListComponent} from './components/page/page-list/page-list.component';
import {PageNewComponent} from './components/page/page-new/page-new.component';
import {WebsiteEditComponent} from './components/website/website-edit/website-edit.component';
import {WebsiteListComponent} from './components/website/website-list/website-list.component';
import {WebsiteNewComponent} from './components/website/website-new/website-new.component';
import {WidgetChooseComponent} from './components/widget/widget-choose/widget-choose.component';
import {WidgetEditComponent} from './components/widget/widget-edit/widget-edit.component';
import {WidgetListComponent} from './components/widget/widget-list/widget-list.component';
import {FlickrImageSearchComponent} from './components/widget/widget-edit/widget-image/flickr-image-search/flickr-image-search.component';
import {AuthGuard} from './services/auth-guard.service';


const APP_ROUTES: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
    {path: 'user/:uid', component: ProfileComponent},
    {path: 'user/:uid/website', component: WebsiteListComponent},
    {path: 'user/:uid/website/new', component: WebsiteNewComponent},
    {path: 'user/:uid/website/:wid', component: WebsiteEditComponent},
    {path: 'user/:uid/website/:wid/page', component: PageListComponent},
    {path: 'user/:uid/website/:wid/page/new', component: PageNewComponent},
    {path: 'user/:uid/website/:wid/page/:pid', component: PageEditComponent},
    {path: 'user/:uid/website/:wid/page/:pid/widget', component: WidgetListComponent},
    {path: 'user/:uid/website/:wid/page/:pid/widget/new', component: WidgetChooseComponent},
    {path: 'user/:uid/website/:wid/page/:pid/widget/:wgid', component: WidgetEditComponent},
    {path: 'user/:uid/website/:wid/page/:pid/widget/:wgid/flickrSearch', component: FlickrImageSearchComponent}
];

// Export the routes as module providers
export const Routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
