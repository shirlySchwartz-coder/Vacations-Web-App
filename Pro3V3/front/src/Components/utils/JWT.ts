import { useNavigate } from "react-router-dom";
import {store} from "../../redux/store"
import { decodeToken, isExpired } from "react-jwt";
import { AuthState, loginAction } from "../../redux/loginReducer";

export const CheckJWT = ()=>{
 let jwt="";
 //check if we have jwt in sessionStorage
 jwt = sessionStorage.getItem("jwt")?.split(" ")[1] || "";
 if (jwt.length<10){
    //if not get jwt in localStorage
    jwt=localStorage.getItem("jwt")?.split(" ")[1] || "";
 }

 if(jwt.length<10 ){
    return false;
 }
  //check if isExpired....
  if (isExpired(jwt)) {
   return false;
 }
 //here we have jwt

 let myDecoded: any = decodeToken(jwt);
 myDecoded.jwt = "Bearer "+jwt;
 console.log("decoded: ",myDecoded);
 
 store.dispatch(loginAction(myDecoded))
 return true
 

}