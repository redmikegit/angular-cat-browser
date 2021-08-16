import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatListComponent } from './cats/cat-list/cat-list.component'
import { CatViewComponent } from './cats/cat-view/cat-view.component'

const routes: Routes = [
	{		path: '', component: CatListComponent	},
	{		path: ':breedId', component: CatListComponent	},
	// {		path: 'cat-list/:breedId', component: CatListComponent	},
	{		path: 'cat-view/:catId', component: CatViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
