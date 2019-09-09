import React from 'react';
import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebaseConfig";
import { FirebaseAuthProvider, FirebaseAuthConsumer } from "@react-firebase/auth";
import LoginView from './LoginView';
import Home from './Home'

function App() {
  return (
    /*
    + FirebaseAuthProvider debe ser componente principal de toda la aplicacion para 
    poder usar los subcomponentes FirebaseAuthComsumer de manera sencilla y sin reconfigurar firebase
    
    + FirebaseAuthProvider requiere que se le indique el archivo de configuracion con el API KEY
    que en mi caso tengo almacenado en firebaseConfig
    
    + El uso de los tres puntos antes de la variable firebase config es 
    para crear una copia del objeto en vez de hacer referencia al objeto original
    */
    <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
      {
        /*
        FirebaseAuthConsumer es un componente el cual te permite acceder a la informacion "isSignedIn, user, providerId "
        de manera sencilla atraves del arrow function ({ isSignedIn, user, providerId }) => {} que accede a las propiedades del componente
        */
      }
      <FirebaseAuthConsumer>
        {({ isSignedIn }) => {
          /*
          + Dentro del arrow function solamente llamo a la propiedad isSignedIn debido a que es la unica que necesito
          + estoy usando una funcion ternaria del tipo  - boolean ? {doIfTrue} : {doIfFalse} -
          en la cual primero asignas un booleando, puede ser una condicional o una variable booleana
          seguido por ? y las acciones a realizar o retornar en caso de ser exitoso, y por ultimo 
          agregar : seguido por las acciones a realizar o retornar en caso de ser false.
          +el metodo de abajo se traduce como: si el usuario esta logueado renderiza Home, de lo contrario renderiza LoginView
          */
          return isSignedIn ? <Home />
            : <LoginView />
        }}
      </FirebaseAuthConsumer>
    </FirebaseAuthProvider>
  );
}

export default App;
