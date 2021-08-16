import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 

@Injectable({
	providedIn: 'root'
})
export class ApiService {

	private _http: HttpClient;

	constructor(
		@Inject(HttpClient) http: HttpClient,
		
	) {
		this._http = http;
	}

	baseUrl = 'https://api.thecatapi.com/v1/'
	headerKey = 'X-API-KEY';
	apiKey = 'eb730cce-3618-4cdc-b75c-b95de286c405';

	apiUrl_all_breeds = this.baseUrl + "breeds/";
	apiUrl_images_of_breeds = this.baseUrl + "images/search?";
	apiUrl_single_breed = this.baseUrl + "images/";
	 

}
