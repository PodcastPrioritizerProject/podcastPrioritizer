const AudioPlayer = (props) => {
  console.log(props)
  return (
    <div>
      <p>podcast title</p>
      <audio
        controls
        src={props.audio.audio}>

        Your browser does not support the
        <code>audio</code> element.
      </audio>
    </div>
  )
}

export default AudioPlayer