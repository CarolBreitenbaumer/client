import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import jwtDecode from "jwt-decode";

interface Token {
  exp: number,
  user: {
    id: string;
  }
}

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  private api:string = "http://tutor.s1710456003.student.kwmhgb.at/api/auth";

  constructor(private http:HttpClient) { }

  //Rest Call abgerufen
  login(email:string,password:string){
    return this.http.post(`${this.api}/login`,{
      email:email,
      password:password
    })
  }


  public setLocalStorage(token:string, isAdmin:boolean){
    console.log(jwtDecode("Token:" + token + "isAdmin" + isAdmin));
    const decodedToken = jwtDecode(token) as Token;
    sessionStorage.setItem("token",token);
    sessionStorage.setItem("userId",decodedToken.user.id);
    sessionStorage.setItem("isAdmin", isAdmin.toString());
  }



  /*
  public setSessionStorage(token:string){
    console.log(jwtDecode(token));
    const decodedToken = jwtDecode(token) as Token;
    sessionStorage.setItem("token",token);
    sessionStorage.setItem("userId",decodedToken.user.id);
    //localStorage.setItem("isAdmin", isAdmin.toString());
  }
   */

  public getCurrentUserId(){
    return Number.parseInt(<string>sessionStorage.getItem("userId"));
  }

  logout(){
    this.http.post(`${this.api}/logout`,{});
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
    console.log("Logged out");
  }

  public isLoggedIn(){
    //finden den Token
    if(sessionStorage.getItem("token")){
      // Token holen
      let token:string = <string>sessionStorage.getItem("token");
      //Token decodieren
      const decodedToken = jwtDecode(token) as Token;
      //Gültigkeit prüfen
      let expirationDate: Date = new Date(0);
      //Millisekunden des Tokens
      expirationDate.setUTCDate(decodedToken.exp);
      if(expirationDate < new Date()){
        console.info("token expired");
        sessionStorage.removeItem("token");
        return false;
      } else {
        return true;
      }
    }
    return false;
  }

  public isLoggedOut(){
    return !this.isLoggedIn();
  }

  public isAdmin() : boolean {
    return JSON.parse(<string>sessionStorage.getItem("isAdmin")); // string -> boolean umwandeln
  }

  public IsLoggedAndAdmin(){
    return this.isLoggedIn() && this.isAdmin();
  }

  public IsLoggedAndNoAdmin(){
    return this.isLoggedIn() && !this.isAdmin();
  }
}

