import React, { Component } from 'react';

//ejemplo de clase que mostrara twitts obtenidos de un servidor
export default class Twitts extends Component {
    constructor() {
        super();
        this.state = {
            //inicializo el estado con un arreglo de twitts vacio
            twitts: []
        }
    }
    //declaro a url con la direccion de la cual recibire el JSON de twitts
    url = "http://ec2-54-202-194-78.us-west-2.compute.amazonaws.com:3000/posts?fbclid=IwAR2s0uI9q7-wlaI1KNwm2FphFetQX_J3mqorDqcQwb1ah_34tNAvw5LDVtg"
    lastInputToModify = ""

    //este metodo es parte del ciclo de vida de un componente y se manda a llamar hasta que
    //el componente ha sido renderizado, quiere decir que primero me mostrara una lista de twitts
    //vacia y posteriormente accedera a este metodo para obtener los twitts
    componentDidMount() {
        this.getTwitts()
    }

    getTwitts = () => {
        //el metodo para obtener los twitts es a traves de una consulta http con el metodo fetch
        //al cual le asignamos la url a la que consultaremos, en su caso aqui pueden ejecutar
        //el metodo correspondiente a obtener los datos de firebase database o firebase firestore
        //y la parte importante es que al final, actualizen el estado con la respuesta obtenida
        fetch(this.url)
            .then(response => response.json()
                .then(bdy => this.setState({ twitts: bdy.posts })))
    }

    //para borrar un twitt del estado de forma local (sin borrarlo de la base de datos) es necesario
    //copiar el contenido del arreglo de la siguiente manera const currentTwitts = [...this.state.twitts]
    //para que las modificaciones sobre la copia no afecten al original.
    //currentTwitts.splice(index, 1) es el metodo utilizado para borrar un elemento del arreglo con un index
    //al final actualizamos el estado con la lista completa que clonamos y que fue modificada
    onDelete = (index) => {
        const currentTwitts = [...this.state.twitts]
        currentTwitts.splice(index, 1)
        this.setState({ twitts: currentTwitts })
    }

    //para permitir cambiar el estado del twitt utilizo el metodo onModify, este me permitira agregarle
    //un estado adicional "editable" con el cual podre mostrar un texto o un input, dependiendo el caso
    //hago lo mismo que en eliminar, primero clono el estado actual, hago las modificaciones necesarias
    //y al final cambio el estado con la lista clonada y modificada
    onModify = (index) => {
        const currentTwitts = [...this.state.twitts]
        const item = currentTwitts[index]
        item.editable = true
        this.setState({ twitts: currentTwitts })
    }

    //este metodo se llamar cuando le doy click a save, lo que hace es actualizar el content del estado
    //original y cambiar su estado de editable a false, para que deje de mostrar el input por un text
    onUpdateValue = (index) => {
        const currentTwitts = [...this.state.twitts]
        currentTwitts[index].content = this.lastInputToModify
        currentTwitts[index].editable = false
        this.setState({ twitts: currentTwitts })
    }

    render() {
        //utilizo el metodo .map para recorrer todo el arreglo de twitts y en base a ellos regresar
        //una lista de vistas individuales por cada twitt, la funcion map te permite acceder al valor
        //del arreglo y al index del mismo, es por eso que utilizo (twitt, index) =>
        return this.state.twitts.map((twitt, index) =>
            <center
                //cuando se utiliza este tipo de arreglos de vistas es importante asignar el valor 
                //del key para que internamente pueda diferenciar una vista de otra, en caso de 
                //omitirlo, indicara un warning.
                key={index}>
                <p>{twitt.title}</p>
                {
                    //muestra el contenido del twitt si no es editable, en caso contrario
                    //muestra un input y un boton que te permiten modificar el content del twitt
                    !this.state.twitts[index].editable ?
                        <p>{twitt.content}</p>
                        : <div>
                            <input onChange={(e) => this.lastInputToModify = e.target.value} />
                            <button onClick={() => this.onUpdateValue(index)}>Done</button>
                        </div>
                }
                <div>
                    <button onClick={() => this.onDelete(index)}>Delete</button>
                    <button onClick={() => this.onModify(index)}>Modify</button>
                </div>
            </center>
        )
    }
}