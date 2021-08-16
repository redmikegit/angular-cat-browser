import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router ,} from '@angular/router';
import { CatService } from 'src/app/shared/services/cat/cat.service';
import {Location} from '@angular/common';
import { fadeInUpOnEnterAnimation, fadeInOnEnterAnimation} from 'angular-animations'; 
@Component({
	selector: 'app-cat-view',
	templateUrl: './cat-view.component.html',
	styleUrls: ['./cat-view.component.scss'],
	animations: [
		fadeInUpOnEnterAnimation({ delay: 1000} ),
		fadeInOnEnterAnimation()  	]
})
export class CatViewComponent implements OnInit {

	public catId = this.route.snapshot.paramMap.get('catId');
 public catImage: any = '';
 public catData: any ='';

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private catService: CatService,
		private location: Location
 	) {

 
			//----- get all cat breeds
		this.catService.getSingleBreed(this.catId).subscribe(
			data => {
 				this.catImage = data.url;
 				this.catData = data.breeds[0];
					console.log(data);
					
			}
		);

	}

	backToAllBreeds(){
		// this.location.getState();
		this.router.navigate(['/', this.catData.id])
	}

	ngOnInit(): void {

	}

}
