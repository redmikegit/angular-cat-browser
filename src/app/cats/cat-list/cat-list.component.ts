import { Component, OnInit } from '@angular/core';
import { CatService } from 'src/app/shared/services/cat/cat.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChunkedData } from "src/app/shared/chunked.-data";
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { fadeOutOnLeaveAnimation } from 'angular-animations';
import { oneByOne } from "src/app/shared/animations";

@Component({
	selector: 'app-cat-list',
	templateUrl: './cat-list.component.html',
	styleUrls: ['./cat-list.component.scss'],
	animations: [
		fadeOutOnLeaveAnimation(),
		oneByOne
	]
})
export class CatListComponent implements OnInit {


	public allBreeds: object; //----- used for assigning data
	public allImagesBreeds: ChunkedData<string> = new ChunkedData<string>(); //used for loading more items
	
	//----- name of the formGroup. used for loading selected cat breeds
	public form: FormGroup;

	//----- get recently visited breed after viewing single item
	public catBreedId = this.route.snapshot.paramMap.get('breedId');

	//----- used for toggling elements
	public withImages: boolean = false;
	public toggleLoadMore: boolean = true;
	public hasErrors: boolean = false;

	//-----set COUNT as initial page number for loading more items. 
	public count = 2; //Start with 2 for page2 because page1 is already set on load
	public limit = 10; //set item limit for loading


	constructor(
		private route: ActivatedRoute,
		private catService: CatService,
		private builder: FormBuilder,
		private location: Location
	) {

		//----- get all cat breeds
		this.catService.getAllBreeds().subscribe(
			data => {
				this.allBreeds = data;
			},
			error => {
				// console.log(error);
				this.hasErrors = true; //display error on front end
			}
		);

		//----- validate if there's a selection
		this.form = this.builder.group({
			breedName: this.builder.control('-choose-', [
				Validators.required
			]),

		});

		//-----get the last visited breed if there's any. 
		if (this.catBreedId != null) {
			this.form.controls['breedName'].setValue(this.catBreedId); //Populate content by setting the selected value as default.
			this.onBreedChange(this.catBreedId); //run the onBreedChange method to load the selected breed
		}


	} //constructor


	retry() {
		window.location.reload();
	}

	onBreedChange(breedId) {
		// console.log(breedId);
		this.toggleLoadMore = true;
		localStorage.removeItem('lastLoaded');
		localStorage.setItem('breed', breedId);

		let pageNum = 1;
		let pageLimit = this.limit;

		//----- show cat container  
		if (breedId != '-choose-') {
			this.location.replaceState(breedId);

			//----- get list under specific breed
			this.catService.getImagesOfBreeds(pageNum, pageLimit, breedId).subscribe(
				data => {

					this.allImagesBreeds.set(data); //set initial content to the selected breed
					localStorage.setItem('lastLoaded', data.length); //save the currently selected breed so we can use it for nagvigation

					//----- show the cats container if there are items to display
					if (this.allImagesBreeds) {
						this.withImages = true;
					}

					//----- hide the load more button if the fetched data is less than the pageLimit
					if (data.length < pageLimit) {
						this.toggleLoadMore = false;
					}
				},
				error => {
 					this.hasErrors = true; //display error on front end
				}
			);
		}
		//----- hide cats container if no selected value
		else {
			this.withImages = false;
			this.location.replaceState(''); //remove any saved URL state
		}
	}


	loadMore() {
		let breedId = localStorage.getItem('breed');
		let pageNum = this.count++; //starting with #2 as the page number then increment
		let pageLimit = this.limit;
		let lastLoaded = localStorage.getItem('lastLoaded'); //used to compare the last loaded items with the currently fetched items

		//----- get list under specific breed
		this.catService.getImagesOfBreeds(pageNum, pageLimit, breedId).subscribe(
			data => {
				this.allImagesBreeds.push(data);
				localStorage.setItem('lastLoaded', data.length);

				//----- hide the load more button if no more items to display
				if (data.length == lastLoaded) { 
					this.toggleLoadMore = false;
				}
				// console.log('lastLoaded: ' + lastLoaded, 'data.length: ' + data.length);
			},
			error => {
				this.hasErrors = true; //display error on front end
			}
		);
	}


	ngOnInit(): void { 	}

}
