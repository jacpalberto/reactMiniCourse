import React, { Component } from 'react'

//ejemplo de componente en el cual incluye propiedades que pasas a traves del constructor
export class Test extends Component {
    constructor(props) {
        super(props);
        //al momento de crear el componente establezco un estado inicial con los valores 
        //que se decidan establecer por default o bien por los valores obtenidos del prop
        //
        // asi mismo recuerden que la primera vez que creas el estado del componente debes hacerlo
        // de forma  "this.state = {}" en caso de querer acceder de la forma
        // this.setState() indicara un error que el estado aun no existe.
        // para poder acceder a las props dentro del componente tenemos que hacerlo desde this.props
        this.state = {
            editable: false,
            text: this.props.title
        }
    }

    render() {

        return (
            <div>
                <button
                    //para actualizar el estado hay que hacerlo desde la forma "this.setState()"
                    // dentro de setState() recibe los estados que se requiere almacenar,
                    // en caso de tener multiples estados y solo querer actualizar uno de ellos
                    // basta con indicar cual es el estado a modificar y el resto quedara igual
                    //
                    //IMPORTANTE: si ya creaste el estado una vez, no debes modificar el estado
                    //de la siguiente forma "this.state={}" debido a que creas un objeto diferente
                    //y los observadores jamas detectaran un cambio en el estado original
                    onClick={() => { this.setState({ editable: true }) }}>
                    Hola
                </button >
                {
                    //en este ejemplo se usa un operador ternario de la estructora boolean ? :
                    //recordemos que primero requiere una comparacion o booleano (this.state.editable)
                    //seguido por ? {que hacer en caso de exito} y : {que hacer en caso de false}
                    this.state.editable ?
                        <input></input>
                        : <p>{this.props.title}</p>
                }
            </div>
        )
    }

}