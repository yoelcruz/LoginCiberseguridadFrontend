import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { User } from '../models/user';

@Injectable()
export class UserService{
	public url: string;
	public identity; 	
	public token;	

	constructor(public http: HttpClient){
		this.url = GLOBAL.url;
	}

	register(user: User): Observable<any>{
		const params = JSON.stringify(user);
		const headers = new HttpHeaders().set('Content-Type', 'application/json');
		
		return this.http.post(this.url + 'register', params, { headers });
	}

	signup(user: any, gettoken = null): Observable<any>{
		if(gettoken != null){
			user.gettoken = gettoken;
		}

		const params = JSON.stringify(user);
		const headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this.http.post(this.url + 'login', params, { headers });
	}

	getIdentity(){
		const identity = JSON.parse(localStorage.getItem('identity'));

		if(identity != "undefined"){
			this.identity = identity;
		}else{
			this.identity = null;
		}

		return this.identity;
	}

	getToken(){
		const token = localStorage.getItem('token');

		if(token != "undefined"){
			this.token = token;
		}else{
			this.token = null;
		}

		return this.token;
	}
}