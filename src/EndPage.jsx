import { useEffect, useState } from "react"
import { API_URL } from './api_url.js'

function EndPage(props) {

  let time = props.time
  let setShowPage = props.setShowPage

  const [modalVisible, setModalVisible] = useState(false);
  let modalInstance = null;

  const showModal = () => {
    setModalVisible(true);
    // Initialize modal instance
    modalInstance = new bootstrap.Modal(document.getElementById('staticBackdrop'));
    modalInstance.show();
  };

  const hideModal = () => {
    setModalVisible(false);
    if (modalInstance) {
      modalInstance.hide();
      // Clean up: Remove modal-open class from body and backdrop
      setTimeout(() => {
        document.body.classList.remove('modal-open');
        document.body.removeAttribute('style')
        let backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) {
          backdrop.parentNode.removeChild(backdrop);
        }
      }, 500); // Adjust the timing if needed
    }
  };

  useEffect(() => {
    // Load modal window directly
    showModal()
    let submitBtn = document.querySelector('#submitBtn')
    submitBtn.addEventListener('click', submitRecord)
  }, [])

  const submitRecord = () => {
    console.log("submitted")
    updateBE()
    hideModal()
    setShowPage('home')
  }

  const updateBE = async (val, x, y) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let username = document.querySelector('#username').value

    const response = await fetch(`${API_URL}/v1/score_board_post`, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({ username, time, }),
    });

    let data = await response.json()
    console.log(data)
  }

  return (
    <div>
      {/* <!-- Modal --> */}
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Game Ended</h1>
            </div>
            <div className="modal-body">

              <h3>
                Your record :
                <span>{Math.floor(time / 60).toString().padStart(2, '0')}</span>
                <span>:</span>
                <span>{(time % 60).toFixed(0).padStart(2, '0')}</span>
              </h3>

              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="username" name="username" />
                <label htmlFor="username">Username</label>
              </div>


            </div>

            <div className="modal-footer">
              <button type="button" id="submitBtn" className="btn btn-primary" data-bs-dismiss="modal">Submit</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default EndPage
