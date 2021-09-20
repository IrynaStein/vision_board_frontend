import {useState} from 'react'
export default function DemoLayout(layoutProps){
    const [isChosen, setIsChosen] = useState(false)
//when receiving props here this component should render the layout based on them
    return (
        <div className="layout">
        <h1>this is cutomizable demo layout</h1>
        {isChosen ? null : <button onClick={()=> setIsChosen(mUv=>!mUv)}>choose this layout</button>}
        </div>
    )
}