import React, { useState } from 'react'
import { Rect } from 'react-konva'

const Cell = (props) => {
    const { x = 0, y = 0, isAlive} = props
    
    return (
        <Rect
            x={x * 32}
            y={y * 32}
            width={32}
            height={32}
            // onClick={(e)=>toggleAlive(e)}
            fill={isAlive?"black":"white"}
            stroke={isAlive?"white":"black"}
        />
    )
}

export default Cell