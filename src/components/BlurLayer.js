import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {boardActions, createBoard} from '../store/boardSlice'

export default function BlurLayer({name, description, symbol, quote}){
    const [isChosen, setIsChosen] = useState(false)
    const dispatch = useDispatch()

function handleLayoutChoice(){
    setIsChosen(mUv=>!mUv)
    dispatch(boardActions.setLayout(name))
    dispatch(createBoard({category: name, quote_id: quote}))
}
    return (
        <>
        {!isChosen ? <div className="layout">
            <img src={symbol} style={{height: "100px", width: "100px"}}alt="symbol"/>
        <p>{description}</p>
       <button disabled={name === "air" || name === "fire" ? true : false} onClick={handleLayoutChoice}>{name === "air" || name === "fire" ? "Comign soon!" : "Choose this layout"}</button>
        </div>
        : null}
        </>
    )
}