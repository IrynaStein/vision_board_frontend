import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {boardActions, createBoard} from '../store/boardSlice'

export default function BlurLayer({name, description, symbol}){
    const [isChosen, setIsChosen] = useState(false)
    const dispatch = useDispatch()
//when receiving props here this component should render the layout based on them

function handleLayoutChoice(){
    setIsChosen(mUv=>!mUv)
    dispatch(boardActions.setLayout(name))
    dispatch(createBoard({category: name}))
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