import React, { useState, useEffect } from 'react'
import { useMutation, useLazyQuery } from 'react-apollo'
import UPDATE_CART from '../graphql/updateCart.graphql' 
import GET_PRODUCT from '../graphql/getProductBySku.graphql'

import { useCssHandles } from 'vtex.css-handles';

 import './styles.css'

const QuickOreder =()=> {
    const [inputText, setInputText] = useState("")
    const [search, setSearch] = useState("")
    const [error, setError] = useState("")
    const [getProductData, {data: product}]= useLazyQuery(GET_PRODUCT)
    const [addToCart] = useMutation(UPDATE_CART)

    const CSS_HANDLES = [
        "quickOrder__title",   
        "quickOrder__button", 
        "quickOrder__label" 
        ]
   
    const handles = useCssHandles(CSS_HANDLES)

    const handleChange =(e:any)=> {
        setInputText(e.target.value)
        setError("")
    }
  
    useEffect(()=> {
        if (!product && inputText.trim().length !== 0) {
            setError("Producto no encontrado")
        } else {
            let skuId = parseInt(inputText)
            addToCart({
                variables: {
                    salesChannel: "1",
                    items: [
                        {
                            id: skuId,
                            quantity: 1,
                            seller: "1"                      
                        }
                    ]
                }
            })
            .then(()=> {
                setError("Buscando..")
                window.location.href = "/checkout"
            })
        }
    } , [product, search])
    
    const addProductToCart =()=> {
        getProductData({
            variables: {
                sku: inputText
            }
        })
    }
    
    const searchProduct =(e:any) => {
        e.preventDefault()
        
        if (!inputText || inputText.trim().length < 1) {
            setError("Debe ingresar algo")
        } else {
            setSearch(inputText)
            addProductToCart()
        }
        
    }

    return <div>
            <h2 className={handles["quickOrder__title"]}>Compra r??pida de VTEX U</h2>
            <form onSubmit={searchProduct}>
                <div className='flex flex-column pb3'>
                    <label htmlFor="sku" className={`${handles["quickOrder__label"]} pb3`}>
                        Ingresa el n??mero de SKU
                    </label>
                    <div className='flex'>
                        <input 
                        type="text" 
                        id="sku" 
                        onChange={handleChange} />
                        <p className='red indent'>
                            {error}
                        </p>
                    </div>
                </div>
                <input
                  className={handles["quickOrder__button"]}
                  type="submit" 
                  value="A??ADIR AL CARRITO" />
            </form>
        </div>
}

export default QuickOreder