// import { useState } from "react"

const CommuteType = (props) => {
  // console.log(props)

  // const [commuteSeconds, setCommuteSeconds] = useState("")
  // const [commuteSession, setCommuteSession] = useState("")
  // console.log(commuteSeconds)
  // console.log(commuteSession)
  // console.log(props)
  const handleChange = (time, sessionId, type) => {
    // setCommuteSeconds(time)
    // setCommuteSession(sessionId)
    props.choices(time, sessionId, type)
  }

  return (
    <div className="commuteType">
      <form action="" id="types" style={{display: "flex"}}>
        <input type="radio" id="walk" name="types" className="sr-only"
        onClick={() => {handleChange(props.walkTime.time, props.walkTime.sessionId, props.walkTime.options.routeType)}}
        />
        <label htmlFor="walk">
          <div style={{height: "100px", width: "100px", border: "2px solid red"}}>
            <p>Walk</p>
          </div>
        </label>
        <input type="radio" id="bike" name="types" className="sr-only"
          onClick={() => { handleChange(props.bikeTime.time, props.bikeTime.sessionId, props.bikeTime.options.routeType)}}
        />
        <label htmlFor="bike">
          <div style={{ height: "100px", width: "100px", border: "2px solid red" }}>
            <p>Bike</p>
          </div>
        </label>
        <input type="radio" id="drive" name="types" className="sr-only"
          onClick={() => { handleChange(props.driveTime.time, props.driveTime.sessionId, props.driveTime.options.routeType)}}
        />
        <label htmlFor="drive">
          <div style={{ height: "100px", width: "100px", border: "2px solid red" }}>
            <p>Drive</p>
          </div>
        </label>
      </form>
    </div>
  )

}

export default CommuteType