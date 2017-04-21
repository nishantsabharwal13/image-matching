var React = require('react');
var Playagain = React.createClass({
  render : function() {
    return (
    		<div>
            <div className="playAgain">
            <h2 className="">{this.props.message}</h2>
            <button className="playButton" onClick={this.props.handler}> Play </button>
            </div>
            <div className="overlay"/>
            </div>
    );
}
});

module.exports = Playagain