import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatListComponent } from './cats/cat-list/cat-list.component';
import { CatViewComponent } from './cats/cat-view/cat-view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from './shared/services/api/api.service';
import { CatService } from './shared/services/cat/cat.service';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './shared/components/footer/footer.component';

@NgModule({
	declarations: [
		AppComponent,
		CatListComponent,
		CatViewComponent,
		FooterComponent,
	],
	imports: [
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule
	],
	providers: [
		ApiService,
		CatService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
