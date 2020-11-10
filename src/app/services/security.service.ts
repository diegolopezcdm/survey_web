import { Injectable } from '@angular/core';
import { HOST_BACKEND, PARAM_USUARIO, ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from '../shared/constants';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginDTO } from '../model/LoginDTO';
import { BasicAccess } from '../model/BasicAccess';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  urlSecurity: string = `${HOST_BACKEND}/api/security`;

  constructor(
    private http: HttpClient,
    private router: Router)  { }

    login(loginDTO: LoginDTO){
      return this.http.post(`${this.urlSecurity}/login`, loginDTO);
    }

    validarToken() {
      return this.http.post(`${this.urlSecurity}/token`, "");
    }
  
    refreshToken(){
      let request = new BasicAccess();
      request.token = sessionStorage.getItem(REFRESH_TOKEN_NAME);
      return this.http.post(`${this.urlSecurity}/refresh-token`, request);
    }
  
    cerrarSesion() {
      let request = new BasicAccess();
      request.token = sessionStorage.getItem(ACCESS_TOKEN_NAME);
      this.http.post(`${this.urlSecurity}/signout`, request).subscribe((data:any)=>{
        console.log(data.body);
      }, (error)=>{
        console.log(error);
      });
      sessionStorage.clear();
      console.log('Se borro tokens de storage');
      setTimeout(()=> {
        this.router.navigate(["/"]);
      },500);
    }
  
    esRoleAdmin(){
      let usuario = JSON.parse(sessionStorage.getItem(PARAM_USUARIO));
      let rpta = false;
      if(usuario != null && usuario.authorities !== null) {
        usuario.authorities.forEach(element => {
          if(element.authority == "ROLE_ADMIN" || element.authority == "ROLE_ADMINISTRADOR"){   
            rpta = true;
          }
        });
      }
      return rpta;
    }
}
