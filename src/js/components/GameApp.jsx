var React = require('react');
var TileStore = require('../stores/TileStore');
var MessageStore = require('../stores/MessageStore');
var Tile = require('./Tile.jsx');
var Status = require('./Status.jsx');
var TileActions = require('../actions/TileActions');
var Playagain = require('./Playagain.jsx');
var Prizes = require('./Prizes.jsx');

/**
 * Retrieve the current TODO data from the TodoStore
 */
 var GameApp = React.createClass({

    getInitialState: function () {
        return {
            allTiles: TileStore.getAll(),
            message: MessageStore.getMessage(),
            isWaiting: false,
            playagain:false
        };
    },
    componentDidMount: function () {
        MessageStore.addChangeListener(this._onMessageChange);
        TileStore.addChangeListener(this._onTileChange);
    },

    componentWillUnmount: function () {
        MessageStore.removeChangeListener(this._onMessageChange);
        TileStore.removeChangeListener(this._onTileChange);
    },
    onTileClick: function (index) {
        if(this.state.isWaiting) return;
        if(TileStore.getFirstFlipIndex() !== null) {
            this.setState({
                isWaiting: true
            });
        }
        TileActions.clickTile(index);
        setTimeout(function () {
            TileActions.matchCheck();
            this.setState({
                allTiles: TileStore.getAll(),
                isWaiting: false,
                playagain:true
            });

        }.bind(this), 2500);
    },
    handler: function() {
    this.setState({
      playagain: false,
    });
  },
    render: function () {
        // This section should be hidden by default
        // and shown when there are tiles.
        if (Object.keys(this.state.allTiles).length < 1) {
            return null;
        }

        var allTiles = this.state.allTiles;
        var tiles = [];

        for (var id in allTiles) {
            id = parseInt(id);
            tiles.push(<Tile key={id} onTileClick={this.onTileClick} id={id} image={allTiles[id].image} flipped={allTiles[id].flipped} />);
        }

        return (
            <section id="main">
            <h2 className="welcomeNote"> Welcome to Movie Name Matching game</h2>
            <p className="instructions">
            To start playing, click on any two tile to reveal a movies name behind it. Purely luck based.
            </p>
            <p className="instructions">
            If the tiles match with the movie name, you win attractive prizes.If they dont match, try again. 
            </p>
            <Status message={this.state.message} />
            {tiles}
            { this.state.playagain ? <Playagain message = {this.state.message} handler = {this.handler} /> : null }
            <Prizes />
            </section>
            );
    },

    /**
     * Event handler for 'change' events coming from the TileStore
     */
     _onTileChange: function () {
        this.setState({
            allTiles: TileStore.getAll(),
        });
    },

    _onMessageChange: function () {
        this.setState({
            message: MessageStore.getMessage()
        });
    }

});

module.exports = GameApp;