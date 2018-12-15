import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const API_URL = environment.apiUrl;
const TOKEN_KEY = 'auth-token';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json',    
  })
};
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authenticationState = new BehaviorSubject(false);
  constructor(private http: HttpClient, private storage: Storage, private plt: Platform) {
   }

   login(username, password): Promise<any> {
     let body:string;
     body =  JSON.stringify({"username": username, "password": password});
     return this.http.post<Boolean>(`${API_URL}/api/Auth/authenticate`,body ,httpOptions)    
              .toPromise()
              .then((data)=>{                    
                    this.storage.set(TOKEN_KEY,data["result"]["token"]);
                    this.authenticationState.next(true);
                    return true;
                  })
              .catch((err)=>{
                console.log(err);
                return false;
              });          
   }
   logout() {      
      this.storage.remove(TOKEN_KEY);
      this.authenticationState.next(false);    
   }
   isAuthenticated() {
    return this.authenticationState.value;
   }
   checkToken() {
      return this.storage.get(TOKEN_KEY)
      .then((res=>{
        this.authenticationState.next(true);
      }));      
   }
}
