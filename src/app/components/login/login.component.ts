import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';


@Component({
	selector:'login',
	templateUrl: './login.component.html',
	providers: [UserService]
})
export class LoginComponent implements OnInit{
	public title: string;
	public user: User;
	public status: string;
	public identity;
	public token;


	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService
	){
		this.title = 'Identifícate';
		this.user = new User("", "", "", "", "");
	}

	ngOnInit(){
		console.log('Componente de login cargado...');
	}

	onSubmit(){
		// loguear al usuario y conseguir sus datos
		this._userService.signup(this.user).subscribe(
			response => {
				this.identity = response.user;

				console.log(this.identity);

				if(!this.identity || !this.identity._id){
					this.status = 'error';
				}else{
					this.status = 'success';
					// PERSISTIR DATOS DEL USUARIO     almacena localmente el navegadorWeb los datos del usuario y el token (localstorage)
					localStorage.setItem('identity', JSON.stringify(this.identity));

					// Conseguir el token
					this.getToken();

				}
				console.log(response.user);
				this.status = 'success';
			},
			error => {
				const errorMessage = <any>error;
				console.log(errorMessage);

				if(errorMessage != null){
					this.status = 'error';
				}
			}
		);		
	}

	getToken(){
		this._userService.signup(this.user, 'true').subscribe(
			response => {
				this.token = response.token;

				console.log(this.token);

				if(this.token.length <= 0){
					this.status = 'error';
				}else{
					this.status = 'success';
					// PERSISTIR TOKEN DEL USUARIO
					localStorage.setItem('token', this.token);

					// Conseguir los contadores o estadisticas del usuario

					this._router.navigate(['/']); /* Para ir a home una vez nos logueemos */
				}

			},
			error => {
				const errorMessage = <any>error;
				console.log(errorMessage);

				if(errorMessage != null){
					this.status = 'error';
				}
			}
		);
	}
}