import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {boardActions} from '../store/boardSlice'
export default function DemoLayout({name, description}){
    const [isChosen, setIsChosen] = useState(false)
    const dispatch = useDispatch()
//when receiving props here this component should render the layout based on them

function handleLayoutChoice(){
    setIsChosen(mUv=>!mUv)
    dispatch(boardActions.setLayout(name))
    //dispatch an action to get all stickers and quotes that have category=name
}
    return (
        <>
        {!isChosen ? <div className="layout">
        <p>{description}</p>
       <button onClick={handleLayoutChoice}>Choose this layout</button>
        </div>
        : <div className='palette'>palette</div>}
        </>
    )
}