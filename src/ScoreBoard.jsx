import { useEffect, useState } from "react"
import { API_URL } from './api_url.js'

function ScoreBoard(props) {
  let setShowPage = props.setShowPage
  const [userList, setUserList] = useState([])

  useEffect(() => {
    const fetchUserList = async () => {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const response = await fetch(`${API_URL}/v1/score_board_get`, {
        method: "GET",
        headers: myHeaders,
      });

      let data = await response.json()
      // console.log(data)
      if (data && data.users) {
        setUserList(data.users)
      }
      return
    }

    fetchUserList()

  }, [])

  const backButtonClick = () => {
    setShowPage('home')
  }

  return (
    <div className='d-flex flex-column justify-content-center align-items-center mt-5'>
      <h1 className="fs-1">LeaderBoard</h1>

      <button type="button" className="btn btn-primary" onClick={backButtonClick}>Back</button>

      <hr className="border border-danger border-2 opacity-50 w-50" />

      {/* list of username and time */}
      <table className="table table-danger table-hover table-borderless mx-5 w-50">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">name</th>
            <th scope="col">time</th>
          </tr>
        </thead>
        <tbody>
          {userList.map(({ id, name, time }, i) =>
            <tr key={id}>
              <th>{i + 1}</th>
              <td>{name}</td>
              <td>
                <span>{Math.floor(time / 60).toString().padStart(2, '0')}</span>
                <span>:</span>
                <span>{(time % 60).toFixed(0).padStart(2, '0')}</span>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ScoreBoard
