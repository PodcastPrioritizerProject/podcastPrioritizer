const AudioPlayer = (props) => {
  return (
    <div className="audioPlayer">
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