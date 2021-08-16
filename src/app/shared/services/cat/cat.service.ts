import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service'

@Injectable({
	providedIn: 'root'
})
export class CatService {

	private _http: HttpClient;

	constructor(
		@Inject(HttpClient) http: HttpClient,
		private apiService: ApiService,
	) {
		this._http = http;
	}


	//----- set header and API key from the api.service
	headerKey: string = this.apiService.headerKey;
	apiKey: string = this.apiService.apiKey;

	//----- assign URL
	apiUrl_all_breeds: string = this.apiService.apiUrl_all_breeds;
	apiUrl_images_of_breeds: string = this.apiService.apiUrl_images_of_breeds;
	apiUrl_single_breed: string = this.apiService.apiUrl_single_breed;

	//----- get all cat breeds for dropdown selection
	getAllBreeds(): Observable<any> {
		let dataParams = new HttpParams().set(this.headerKey, this.apiKey);
		let url_ = this.apiUrl_all_breeds;
		return this._http.get(url_, { params: dataParams });
	}

	//----- get images of selected breeds and display
	getImagesOfBreeds(pageNum, limit, breedId): Observable<any> {
		let dataParams = new HttpParams().set(this.headerKey, this.apiKey);
		let url_ = this.apiUrl_images_of_breeds + 'size=thumb&order=asc&' + 'page=' + pageNum + '&limit=' + limit + '&breed_id=' + breedId;
		return this._http.get(url_, { params: dataParams },);
	}

	//----- get data of specific breed
	getSingleBreed(breedId): Observable<any> {
		let dataParams = new HttpParams().set(this.headerKey, this.apiKey);
		let url_ = this.apiUrl_single_breed + breedId;
		return this._http.get(url_, { params: dataParams },);
	}


}
