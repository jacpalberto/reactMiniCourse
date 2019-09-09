import React from 'react'

//ejemplo de un arrow function que retorna vista en formato JSX en el cual incluye propiedades 
//que pasas a traves del arrow function
export const Test2 = (props) => {
    let email = "";
    let password = "";

    return (
        <div>
            {
                //onChange se utiliza para almacenar el texto que escribes en alguna variable o state del componente
                //para poder acceder a el es a traves de un arrow function con la propiedad event
                //y el valor que escribes esta almacenado en event.target.value
            }
            <input type="email" onChange={(event) => { email = event.target.value }}></input>
            <input type="password" onChange={(event) => { password = event.target.value }}></input>
            <button onClick={
                //en este ejemplo se usa un operador ternario de la estructora boolean ? :
                //recordemos que primero requiere una comparacion o booleano (props.onClick)
                //seguido por ? {que hacer en caso de exito} y : {que hacer en caso de false}
                //
                //para ser mas especificos en este metodo recibo el metodo onClick como props, 
                //el booleano props.onClick me retorna true si la propiedad fue recibida en los props
                //de lo contrario me regresa un false
                //de esta manera, el onClick ejecutara la funcion reciba en prop o si no, ejecutara 
                //una funcion por default
                props.onClick
                    ? () => props.onClick()
                    : () => { console.log(email, password) }}>
                {props.title}
            </button>
        </div>
    )
}