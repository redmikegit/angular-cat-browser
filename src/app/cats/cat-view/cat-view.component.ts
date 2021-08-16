import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, } from '@angular/router';
import { CatService } from 'src/app/shared/services/cat/cat.service';
import { fadeInUpOnEnterAnimation, fadeInOnEnterAnimation } from 'angular-animations';

@Component({
	selector: 'app-cat-view',
	templateUrl: './cat-view.component.html',
	styleUrls: ['./cat-view.component.scss'],
	animations: [
		fadeInUpOnEnterAnimation({ delay: 1000 }),
		fadeInOnEnterAnimation()]
})
export class CatViewComponent implements OnInit {

	public catId = this.route.snapshot.paramMap.get('catId'); //get the passed id from the selected breed

	//----- assign blank data for initial loading
	public catImage: any = '';
	public catData: any = '';


	//----- used for toggling the error message on the frontend
	public hasErrors: boolean = false;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private catService: CatService,
	) {


		//----- get all cat breeds
		this.catService.getSingleBreed(this.catId).subscribe(
			data => {
				this.catImage = data.url; //put the image URL on the catImage property
				this.catData = data.breeds[0]; //get the breed's specific data inside the array
				// console.log(data);

			},
			error => {
				this.hasErrors = true; //display error on front end
			}
		);

	}
	retry() {
		window.location.reload();
	}
	
	backToAllBreeds() {
		this.router.navigate(['/', this.catData.id]); //navigate back to the homepage and pass the currently selected breed
	}

	ngOnInit(): void {}

}
