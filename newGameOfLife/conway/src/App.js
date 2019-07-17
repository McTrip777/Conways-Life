import React, { Component } from 'react'
import "./App.scss"
import Grid from "./Grid"

export class App extends Component {
  constructor(){
    super();
    this.speed = 120;
    this.rows = 15
    this.cols = 15
    this.state = {
      generation: 0,
      grid: Array(this.rows).fill().map(() => Array(this.cols).fill(false)),
    }
  }
  componentDidMount = () => {
  
  }

  playButton = () => {
    this.intervalId = setInterval(this.play, this.speed)
  }
  pauseButton = () => {
    clearInterval(this.intervalId);
  }
  // gridSize = () => {

  // }
  clearButton = () => {
    let gridClear = Array(this.rows).fill().map(() => Array(this.cols).fill(false))
    
    this.setState({
      grid:gridClear,
      generation:0
    })
  }
  random = () => {
    let gridCopy = arrayClone(this.state.grid);
    for (let i = 0; i < this.rows; i++){
      for (let j = 0; j < this.cols; j++){
        gridCopy[i][j] = false
        if(Math.floor(Math.random() * 4) === 1){
          gridCopy[i][j] = true;
        }
      }
    }
    this.setState({
      grid:gridCopy
    })
  }
  play = () => {
    let g = this.state.grid
    let g2 = arrayClone(this.state.grid)
    for (let i = 0; i < this.rows; i++){
      for (let j = 0; j < this.cols; j++){
        let count = 0;
/*
Assume that 0 is the starting point
      i
    -------------
j   | 2 | 3 | 4 |
    -------------
    | 1 | 0 | 5 |
    -------------
    | 8 | 7 | 6 |
    -------------
*/
        if (j > 0) if (g[i][j - 1]) count++;// 1 is whats being counted
        if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++; // 2 is whats being counted
        if(i > 0) if (g[i-1][j]) count++; // 3 is whats being counted
		    if (i > 0 && j < this.cols - 1) if (g[i - 1][j + 1]) count++;// 4 is whats being counted
		    if (j < this.cols - 1) if (g[i][j + 1]) count++;// 5 is whats being counted
		    if (i < this.rows - 1 && j < this.cols - 1) if (g[i + 1][j + 1]) count++;// 6 is whats being counted
		    if (i < this.rows - 1) if (g[i + 1][j]) count++;// 7 is whats being counted
		    if (i < this.rows - 1 && j > 0) if (g[i + 1][j - 1]) count++;// 8 is whats being counted
		    if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
		    if (!g[i][j] && count === 3) g2[i][j] = true;
      }
    }
    this.setState({
      grid: g2,
      generation:this.state.generation +1
    })
  }
  
  selectBox = (row, col) => {
    let gridCopy = arrayClone(this.state.grid);
    gridCopy[row][col] = !gridCopy[row][col]
    this.setState({
      grid:gridCopy
    })
  }

  gridSize = size => {
    switch(size){
      case "1":
        this.cols = 15;
        this.rows = 15;
        this.setState({
          grid:Array(this.rows).fill().map(() => Array(this.cols).fill(false))
        })
      break;
      case "2":
        this.cols = 25;
        this.rows = 25;
        this.setState({
          grid:Array(this.rows).fill().map(() => Array(this.cols).fill(false))
        })
      break;
      default:
        this.cols = 30;
        this.rows = 30;
        this.setState({
          grid:Array(this.rows).fill().map(() => Array(this.cols).fill(false))
        })
      break;
    }
  }

  sizeChange = event => {
    let num = event.target.value
    this.gridSize(num);
 }

  render() {
    return (
    <div className="App">
      <h1>CONWAY'S GAME OF LIFE</h1>
      <div className="sectionContainer">
        <div className="section1 section">
          <h3>Generation: {this.state.generation}</h3>
          <div className="block">
            <Grid
              grid={this.state.grid}
              rows={this.rows}
              cols={this.cols}
              selectBox={this.selectBox}
            />
          </div>
          <div className="buttons">
            <button onClick={this.playButton}>Play</button>
            <button onClick={this.pauseButton}>Pause</button>
            <button onClick={this.random}>Random</button>
            <button onClick={this.clearButton}>Clear</button>
            <select onChange={this.sizeChange}>
              <option value='1'>15x15</option>
              <option value='2'>25x25</option>
              <option value='3'>30x30</option>
            </select>
          </div>
        </div>
        <div className="section2 section">
          <div className="preset1 preset">
            <div className="presetBox presetBox1">

            </div>
            <button>Preset 1</button>
          </div>
          <div className="preset2 preset">
            <div className="presetBox presetBox2">

            </div>
            <button>Preset 2</button>
          </div>
          <div className="preset3 preset">
            <div className="presetBox presetBox3">

            </div>
            <button>Preset 3</button>
          </div>
          <div className="preset4 preset">
            <div className="presetBox presetBox4">

            </div>
            <button>Preset 4</button>
          </div>
        </div>
        <div className="section3 section">
          <h3>Rules:</h3>
          <div className="rules">
            <p>Any live cell with fewer than two live neighbours dies, as if by underpopulation.</p>
            <p>Any live cell with two or three live neighbours lives on to the next generation.</p>
            <p>Any live cell with more than three live neighbours dies, as if by overpopulation.</p>
            <p>Any dead cell with three live neighbours becomes a live cell, as if by reproduction.</p>
          </div>
        </div>
      </div>
      <div className="footer">

      </div>
    </div>
    )
  }
}

function arrayClone(arr){
  return JSON.parse(JSON.stringify(arr));
}

export default App
