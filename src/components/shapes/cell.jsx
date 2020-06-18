import React, { useEffect, useState } from 'react'
import { Rect } from 'react-konva'
import { CREATE_CELLS_FINISHED } from '../../store/actions'

const Cell = (props) => {
    const { id, x = 0, y = 0, isAlive, toggleCell,cells, is_generating,  is_toggling} = props

    const [status, setStatus] = useState(isAlive)
    const [hover, setHover] = useState(false)
    
    useEffect(()=>{
        setStatus(isAlive)
    }, [isAlive])
    
    return (
        <Rect
        id={id}
        x={(x * 32)+1}
        y={(y * 32)+1}
        width={30}
        height={30}
        onClick={(e) => {
            toggleCell(id)
        }}
            onMouseOver={() => {
                setHover(true)
            }}
            onMouseOut={() => {
                setHover(false)
            }}
            fill={status ? "black": hover ? "rgba(0,255,0,.2)" : "white"}
            stroke={status ? "black" : hover ? "green" : "lightgrey"}
        />
    )
}

export default Cell