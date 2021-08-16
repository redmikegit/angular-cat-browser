import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatListComponent } from './cats/cat-list/cat-list.component'
import { CatViewComponent } from './cats/cat-view/cat-view.component'

const routes: Routes = [
	{ path: '', component: CatListComponent }, //default page
	{ path: ':breedId', component: CatListComponent }, //get breedId if there's any
	{ path: 'cat-view/:catId', component: CatViewComponent }//view single cat
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})

export class AppRoutingModule { }
