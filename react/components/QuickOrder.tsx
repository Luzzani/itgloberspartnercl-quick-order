import React, { useState } from 'react'

const QuickOreder =()=> {
    const [inputText, setInputText] = useState("")

    const handleChange =(e:any)=> {
        setInputText(e.target.value)
    }

    const searchProduct =(e:any) => {
        e.preventDefault()

        if (!inputText) {
            alert("Debe ingresar algo")
        } else {
            console.log("buscando" 
            ,inputText)
            // setearemos la busqueda
            // buscaremos data del producto
        }
        
    }

    return <div>
            <h2>Compra rápida de VTEX U</h2>
            <form onSubmit={searchProduct}>
                <div>
                    <label htmlFor="sku">
                        Ingresa el número de SKU
                    </label>
                    <input 
                    type="text" 
                    id="sku" 
                    onChange={handleChange} />
                </div>
                <input type="submit" value="AÑADIR AL CARRITO" />
            </form>
        </div>
}

export default QuickOreder