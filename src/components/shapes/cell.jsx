import React, { useEffect, useState } from 'react'
import { Rect } from 'react-konva'

const Cell = (props) => {
    const { id, x = 0, y = 0, isAlive, setAlive } = props

    const [status, setStatus] = useState(isAlive)

    useEffect(() => {
        // setStatus(!isAlive)
        console.log(x,y)
    }, [])

    return (
        <Rect
            id={id}
            x={x * 32}
            y={y * 32}
            width={32}
            height={32}
            onClick={setAlive}
            fill={status ? "black" : "white"}
            stroke={status ? "black" : "black"}
        />
    )
}

export default Cell