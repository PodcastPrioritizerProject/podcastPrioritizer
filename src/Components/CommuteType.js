import Swal from 'sweetalert2'
import { AiFillCar } from 'react-icons/ai';
import { MdDirectionsBike } from 'react-icons/md'
import { FaWalking } from 'react-icons/fa'

const CommuteType = (props) => {

  // console.log(props.walkTime.formattedTime)

  const handleChange = (time, sessionId, type) => {
    props.choices(time, sessionId, type)
  }

  return (
    <div className="commuteType">
      <h2>How Will You Be Travelling?</h2>
      <form action="" id="types" className='commuteIconsForm'>
        <input type="radio" id="walk" name="types" className="sr-only"
        onClick={() => {handleChange(props.walkTime.time, props.walkTime.sessionId, props.walkTime.options.routeType)}}
        />
        <label htmlFor="walk" aria-label="walking time" className='travelIconsLabel'>
          <div className='individualIcons'>
            <FaWalking />
            {
              props.walkTime.formattedTime === undefined && props.bikeTime.formattedTime !== undefined
              ? <p>DON'T WALK TOO FAR</p>
              : <p>{props.walkTime.formattedTime}</p>
            }
          </div>
        </label>
        <input type="radio" id="bike" name="types" className="sr-only"
          onClick={() => { handleChange(props.bikeTime.time, props.bikeTime.sessionId, props.bikeTime.options.routeType)}}
        />
        <label htmlFor="bike" aria-label="biking time" className='travelIconsLabel'>
          <div className='individualIcons'>
            <MdDirectionsBike />
            <p>{props.bikeTime.formattedTime}</p>
          </div>
        </label>
        <input type="radio" id="drive" name="types" className="sr-only"
          onClick={() => { handleChange(props.driveTime.time, props.driveTime.sessionId, props.driveTime.options.routeType)}}
        />
        <label htmlFor="drive" aria-label="driving time" className='travelIconsLabel'>
          <div className='individualIcons'>
            <AiFillCar />
            <p>{props.driveTime.formattedTime}</p>
          </div>
        </label>
      </form>
    </div>
  )

}

export default CommuteType