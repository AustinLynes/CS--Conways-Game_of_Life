import React, { useEffect, useState } from 'react'
import { Rect } from 'react-konva'
import { CREATE_CELLS_FINISHED } from '../../store/actions'

const Cell = (props) => {
    const { id, x = 0, y = 0, width, height, isAlive, toggleCell } = props

    const [status, setStatus] = useState(isAlive)
    const [hover, setHover] = useState(false)

    useEffect(() => {
        setStatus(isAlive)
    }, [isAlive])
    const randomColor = () => {
        // will generate a random color between the colors chosen
        const arr_of_colors = ["red", "green", "blue", "white", "black"]
        const num = Math.floor(Math.random() * arr_of_colors.length - 1)
        return arr_of_colors[num]
    }
    return (
        <Rect
            id={id}
            x={(x * width) + 1}
            y={(y * height) + 1}
            width={width - 2}
            height={height - 2}
            onClick={() => {
                toggleCell(id)
            }}
            onMouseOver={() => {
                setHover(true)
            }}
            onMouseOut={() => {
                setHover(false)
            }}
            fill={status ? randomColor() : hover ? "rgba(0,255,0,.2)" : "#333"}
            stroke={status ? randomColor() : hover ? "darkgreen" : "#333"}
        />
    )
}

export default Cell