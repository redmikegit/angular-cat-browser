import { Component, OnInit } from '@angular/core';
import { CatService } from 'src/app/shared/services/cat/cat.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChunkedData } from "src/app/shared/chunked.-data";
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {
	fadeInDownOnEnterAnimation,
	fadeInOnEnterAnimation,
	fadeOutOnLeaveAnimation

} from 'angular-animations';
import { oneByOne } from "src/app/shared/animations";

@Component({
	selector: 'app-cat-list',
	templateUrl: './cat-list.component.html',
	styleUrls: ['./cat-list.component.scss'],
	animations: [
		fadeOutOnLeaveAnimation(),
		fadeInDownOnEnterAnimation(),
		fadeInOnEnterAnimation({ delay: 500, duration: 500, }),
		oneByOne
	]
})
export class CatListComponent implements OnInit {


	public allBreeds: object;
	// public allImagesBreeds: object;
	public allImagesBreeds: ChunkedData<string> = new ChunkedData<string>();
	public form: FormGroup;
	public withImages: boolean = false;
	public toggleLoadMore: boolean = true;

	public count = 2;
	public limit = 10;
	public catBreedId = this.route.snapshot.paramMap.get('breedId');
	public hasErrors: boolean = false;

	constructor(
		private route: ActivatedRoute,
		private catService: CatService,
		private builder: FormBuilder,
		private location: Location
	) {

		//----- get all cat breeds
		this.catService.getAllBreeds().subscribe(
			data => {
				// console.log(data);
				this.allBreeds = data;
			},
			error => {
				// console.log(error);
				// alert('Apologies butwe could not load new cats for you at this time! Miau!')
				this.hasErrors = true;
			}
		);

		//----- validate if there's a selection
		this.form = this.builder.group({
			breedName: this.builder.control('-choose-', [
				Validators.required
			]),

		});

		// console.log(this.catBreedId);

		if (this.catBreedId != null) {
			this.onBreedChange(this.catBreedId);
			this.form.controls['breedName'].setValue(this.catBreedId);
		}


	} //constructor


	retry(){
		window.location.reload();
	}

	onBreedChange(breedId) {
		console.log(breedId);
		this.toggleLoadMore = true;
		localStorage.removeItem('lastLoaded');
		localStorage.setItem('breed', breedId);

		let pageNum = 1;
		let pageLimit = 10;


		if (breedId != '-choose-') {
			this.location.replaceState(breedId);

			//----- get list under specific breed
			this.catService.getImagesOfBreeds(pageNum, pageLimit, breedId).subscribe(
				data => {
					this.allImagesBreeds.set(data);
					// this.allImagesBreeds.push(data);
					// this.allImagesBreeds = data;
					localStorage.setItem('lastLoaded', data.length);

					if (this.allImagesBreeds) {
						this.withImages = true;
					}

					if (data.length < pageLimit) {
						this.toggleLoadMore = false;
					}
				}
			);
		}
		else {
			this.withImages = false;
			this.location.replaceState('');
		}
	}


	loadMore() {
		let breedId = localStorage.getItem('breed');
		let pageNum = this.count++;
		let pageLimit = this.limit;
		let lastLoaded = localStorage.getItem('lastLoaded');

		//----- get list under specific breed
		this.catService.getImagesOfBreeds(pageNum, pageLimit, breedId).subscribe(
			data => {
				this.allImagesBreeds.push(data);
				// this.allImagesBreeds = data;

				localStorage.setItem('lastLoaded', data.length);

				if (data.length == pageLimit) {
					this.toggleLoadMore = false;
				}
				console.log('lastLoaded: ' + lastLoaded, 'data.length: ' + data.length);

			}
		);
	}


	ngOnInit(): void {

	}

}
