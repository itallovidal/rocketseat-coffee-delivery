import {Wrapper} from "./ButtonCounter.styled.ts";
import {Minus, Plus} from "@phosphor-icons/react";
import React from "react";
import {UserContext} from "../../Context/UserContextProvider.tsx";

function ButtonCounter({productID, quantity} : {productID: string, quantity: number}) {
    const {addItemInShoppingCart, removeItemInShoppingCart, changeItemAmount} = React.useContext(UserContext)
    const [count, setCount] = React.useState(quantity)

    React.useEffect(()=>{
        setCount(quantity)
    }, [quantity])

    React.useEffect(()=>{
        if (count >= 1){
            changeItemAmount(productID, count)
        }
    }, [count])

    function handleCount(value: string){
        if(value === 'plus'){
            if(count === 0){
                addItemInShoppingCart(productID)
            }

            setCount(prev => prev + 1)
        }
        else{
            if(count === 1){
                removeItemInShoppingCart(productID)
            }
            if(count === 0){
                return
            }
            else{
                setCount(prev => prev - 1)
            }
        }
    }

    return (
        <Wrapper>
            <Plus onClick={()=> handleCount('plus')} size={18} />
            <span>{count}</span>
            <Minus onClick={()=> handleCount('minus') } size={18} />
        </Wrapper>
    );
}

export default ButtonCounter;