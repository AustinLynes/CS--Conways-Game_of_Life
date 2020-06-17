import React from 'react';
import { Stage, Layer } from "react-konva"
import { createGrid, createCells } from './util/grid'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      grid_data: [],
      cells: [],
      dimensions: {
        width: 800,
        height: 800,
        grid_size: 32,
        cols: 0,
        rows: 0
      }
    }
  }

  componentWillMount = () => {
    this.setState(({ dimensions }) => (
      {
        dimensions: {
          ...dimensions,
          cols: this.state.dimensions.width / this.state.dimensions.grid_size,
          rows: this.state.dimensions.height / this.state.dimensions.grid_size,
        }
      }
    ))
  }
  componentDidMount = () => {
    const { cols, rows } = this.state.dimensions

    const grid = createGrid(cols, rows)

    if (this.state.grid_data.length === 0) {
      this.setState(() => ({ grid_data: grid }));
    }

    this.setState(() => ({ cells: createCells(cols, rows) }))
  }
  toggleCell = (e) => {
    console.log(e.target)
    console.log(e.target)
  }
  render() {
    const { width, height } = this.state.dimensions

    return (
      <div className="App">
        <Stage className="game-view" width={width} height={height}>
          <Layer onClick={this.toggleCell}>
            {
              this.state.grid_data.length > 0 ?
                this.state.cells.map(
                  row => row.map(
                    cell => cell
                  )
                )
                : null
            }
          </Layer>
        </Stage>
      </div>
    );
  }
}


export default App;
