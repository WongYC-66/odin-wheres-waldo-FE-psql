import { useEffect, useState } from 'react'

import Selection from './Selection.jsx'
import EndPage from './EndPage.jsx'

import game01Img from '/game01.jpg?url'
import chr01Img from '/chr01.png?url'
import chr02Img from '/chr02.png?url'
import chr03Img from '/chr03.png?url'
import chr04Img from '/chr04.png?url'
import chr99Img from '/chr99.png?url'

function Game({ setShowPage }) {

  const [characters, setCharacters] = useState([1, 2, 3, 4])
  const [showSelection, setShowSelection] = useState(false)
  const [selectionProp, setSelectionProp] = useState({
    mouseX: 0,
    mouseY: 0,
    imgWidth: 0,
    imgHeight: 0,
    mousePageX: 0,
    mousePageY: 0,
  })

  const [foundCircles, setFoundCircles] = useState([])
  const [time, setTime] = useState(0)
  const [timer, setTimer] = useState([])

  useEffect(() => {
    // set up 0.1s timer
    let myInterval = setInterval(() => {
      setTime(prev => prev + 0.1)
    }, 100)  // 100ms
    setTimer(prev => [...prev, myInterval])
  }, [])

  useEffect(() => {
    // monitor if game ends
    if (characters.length === 0) {
      console.log('Game Ended, timer paused.')
      while(timer.length){
        clearInterval(timer.pop())
      }
      setTimer([])
    }

  }, [characters])

  const mouseClick = (e) => {
    let img = document.querySelector("#gameImg")
    // console.log(e)
    setShowSelection(!showSelection)
    setSelectionProp({
      mouseX: e.nativeEvent.offsetX,
      mouseY: e.nativeEvent.offsetY,
      imgWidth: img.clientWidth,
      imgHeight: img.clientHeight,
      mousePageX: e.nativeEvent.clientX,
      mousePageY: e.nativeEvent.clientY,
    })
  }

  // console.log(selectionProp)
  function convertRemToPixels(rem) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
  }

  return (
    <div className='d-flex flex-column'>
      {/* fixed top bar */}
      <div className='fixed-top d-flex bg-secondary justify-content-center align-items-center' style={{ maxHeight: "103px" }} >
        <h2 className='text-light m-2'>Find me</h2>
        <img src={characters.includes(1) ? chr01Img : chr99Img} className='m-2 border border-black' />
        <img src={characters.includes(2) ? chr02Img : chr99Img} className='m-2 border border-black' />
        <img src={characters.includes(3) ? chr03Img : chr99Img} className='m-2 border border-black' />
        <img src={characters.includes(4) ? chr04Img : chr99Img} className='m-2 border border-black' />
        {/* timer */}
        <span>{Math.floor(time / 60).toString().padStart(2, '0')}</span>
        <span>:</span>
        <span>{(time % 60).toFixed(0).padStart(2, '0')}</span>
      </div>

      {/* game image */}
      <div className='' style={{ marginTop: "103px" }}>
        <img id="gameImg" src={game01Img} alt="" className='w-100' onClick={mouseClick} />


      </div>

      {/* selection box */}
      {showSelection && <Selection
        selectionProp={selectionProp}
        setShowSelection={setShowSelection}
        characters={characters}
        setCharacters={setCharacters}
        setFoundCircles={setFoundCircles}
      />}

      {/* FoundCircles */}
      {foundCircles.map(([val, xRatio, yRatio]) => {

        let img = document.querySelector("#gameImg")
        let offSetX = img.offsetLeft
        let offSetY = img.offsetTop
        let imgWidth = img.clientWidth
        let imgHeight = img.clientHeight
        let remOffset = convertRemToPixels(2.5)

        let xCircle = offSetX + xRatio * imgWidth - remOffset
        let yCircle = offSetY + yRatio * imgHeight - remOffset

        // console.log(img.getBoundingClientRect() )
        // console.log({ xCircle, yCircle })

        // purpsely set key to dynamic, so when zoom-in / out, find again, then it will scale back.
        return (
          <div key={val + xCircle} className='position-absolute border border-danger border-5 p-1 rounded-circle'
            style={{ width: "5rem", height: "5rem", left: xCircle, top: yCircle }}>

          </div>
        )
      })}

      {/* EndPage and query username */}
      {characters.length === 0 && <EndPage time={time} setShowPage={setShowPage}/>}

    </div >
  )
}

export default Game
