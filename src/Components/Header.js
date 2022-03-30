function Header() {

    return (
        <header>
            <div className="wrapper">
                <div className="titleBlock">
                    <h1 className="firstBlock"> <span className="firstH">P</span>odcast</h1>
                    <h1 className="secondBlock">Prioritize<span className="secondH">R</span></h1>
                </div>
            </div>

            <div className="aboutSection wrapper">
                <p className="punchline">
                    Can't decide on what podcast to play for your commute?
                </p>
                <p>
                    We've got the <em className="yellow">perfect</em> solution for you!  Simply enter your <em className="orange">starting location</em>, <em className="orange">desired destination</em>, <em className="orange">type of commute</em>, and<em className="orange"> genre of podcast</em> and we'll do the rest! Just sit back, relax and enjoy as we provide a list of suggested podcasts that fit <em className="yellow">your</em> duration of travel.  Let's Start!
                </p>
            </div>
        </header>
    )
}

export default Header;
