import home01Pic from '/home01.png?url'
import chr01Img from '/chr01.png?url'
import chr02Img from '/chr02.png?url'
import chr03Img from '/chr03.png?url'
import chr04Img from '/chr04.png?url'

function Home({ setShowPage }) {

  const playButtonClick = () => {
    setShowPage('game')
  }
  const scoreButtonClick = () => {
    setShowPage('score')
  }

  return (
    <div className='d-flex flex-column justify-content-center align-items-center mt-5'>
      <img src={home01Pic} alt="welcomeImage" width="300px" />
      <h1> WHERE IS WALDO? </h1>
      <h5>Try to find these 4 characters from a photo, be as soon as possible</h5>

      <div className='d-flex'>
        <img src={chr01Img} className='m-2 border border-black' />
        <img src={chr02Img} className='m-2 border border-black' />
        <img src={chr03Img} className='m-2 border border-black' />
        <img src={chr04Img} className='m-2 border border-black' />
      </div>

      <button type="button" className="btn btn-danger" onClick={playButtonClick}>Play Now</button>

      <hr />
      <button type="button" className="btn btn-success" onClick={scoreButtonClick}> Scoreboard </button>

    </div>
  )
}

export default Home
