var React = require('react');
var Playagain = React.createClass({
  render : function() {
    return (
    		<div>
            <div className="playAgain">
            <button className="playButton" onClick={this.props.handler}> Play again</button>
            </div>
            <div className="overlay"/>
            </div>
    );
}
});

module.exports = Playagain