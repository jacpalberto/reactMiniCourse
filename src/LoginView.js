import React, { Component } from 'react';
import firebase from "firebase/app";

export default class LoginView extends Component {
    email = "";
    password = "";

    onGoogleSignInClicked = () => {
        //selecciono el provedor de authenticacion que necesito, en este caso es google
        const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
        //llamo al metodo signInWithPopup con el provedor designado, utilizo las funciones de la promesa
        // then y catch en caso de requerir alguna accion al tener el login exitoso o al obtener algun error
        firebase.auth().signInWithPopup(googleAuthProvider)
            .then(() => { console.log("google singin was successful") })
            .catch((error) => { console.log(error) });
    }
    onFacebookSignInClicked = () => {
        //selecciono el provedor de authenticacion que necesito, en este caso es facebook
        const facebookProvider = new firebase.auth.FacebookAuthProvider();
        //llamo al metodo signInWithPopup con el provedor designado, utilizo las funciones de la promesa
        // then y catch en caso de requerir alguna accion al tener el login exitoso o al obtener algun error
        firebase.auth().signInWithRedirect(facebookProvider)
            .then(() => { console.log("facebook was successful") })
            .catch((error) => { console.log(error) });
    }
    onLogoutClicked = () => {
        //llamo al metodo signOut para cerrar sesion y utilizo los metodos de la promesa en caso de requerir acciones al tener exito o fallar
        firebase.auth().signOut()
            .then(() => { console.log("log out has been successful") })
            .catch((error) => { console.log(error) })
    }
    onRegister = () => {
        //primero intento hacer un signin con mi correo y contraseña, en caso de ser exitoso ya estoy autenticcado, en caso de error
        //intento registrarme con ese usuario y contraseña, si ambos intento fallan entonces ejecuto al catch de createUser
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
            .then(() => { console.log("login successful") })
            .catch((error) => {
                firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                    .then(() => console.log("register has been successful"))
                    .catch((error) => console.log(error))
            })
    }

    render() {
        return <center>
            <div>
                {
                    //para que la funcion de onClick no se ejecute inmediatamente al renderizar el boton se tiene que añadir
                    //como arrow function de la siguiente manera
                    // onClick={() => this.onGoogleSignInClicked()}
                }
                <button onClick={() => this.onGoogleSignInClicked()}>Sign in with google</button>
            </div>
            <div>
                <button onClick={() => this.onFacebookSignInClicked()}>Sign in with facebook</button>
            </div>
            <div>
                <button onClick={() => this.onLogoutClicked()}>Log out</button>
            </div>

            <div>
                <input
                    placeholder="user@email.com"
                    //onChange se utiliza para almacenar el texto que escribes en alguna variable o state del componente
                    //para poder acceder a el es a traves de un arrow function con la propiedad event
                    //y el valor que escribes esta almacenado en event.target.value
                    onChange={(event) => { this.email = (event.target.value) }}
                    type='email' />
                <input
                    onChange={(event) => { this.password = (event.target.value) }}
                    type='password' />
                <button
                    onClick={() => this.onRegister()}>
                    Register
                 </button>
            </div>
        </center >
    }
}