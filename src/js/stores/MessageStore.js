var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TileConstants = require('../constants/TileConstants');
var assign = require('object-assign');
var TileStore = require('./TileStore');

var CHANGE_EVENT = 'change';

var _messages = {
    choosetile: 'Click any tile!',
    findmate: 'Now try to find the matching tile!',
    wrong: 'Sorry, those didn\'t match! Play again!',
    foundmate: 'Congratulations, they matched! Play again!'
};

var _message = _messages.choosetile;

function updateMessage() {

    var flipped = [];
    var tiles = TileStore.getAll();
    var allMatched = true;

    for (var id in tiles) {

        if (tiles[id].matched === false) allMatched = false;

        if (tiles[id].flipped === true && tiles[id].matched === false) {
            flipped.push(id);
        }

    }

    if(flipped.length === 0) {
        _message = _messages.choosetile;
        return;
    }
    if(flipped.length === 1) {
        _message = _messages.findmate;
        return;
    }

    if (tiles[flipped[0]].image === tiles[flipped[1]].image) {

        _message = _messages.foundmate;
    } else {

        _message = _messages.wrong;

    }

}

var MessageStore = assign({}, EventEmitter.prototype, {
    getMessage: function () {
        return _message
    },
    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },


    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

MessageStore.dispatchToken = AppDispatcher.register(function (action) {

    switch (action.actionType) {
        case TileConstants.TILE_CLICK:
            AppDispatcher.waitFor([TileStore.dispatchToken]);
            updateMessage();
            MessageStore.emitChange();
            break;

        case TileConstants.MATCH_CHECK:
            AppDispatcher.waitFor([TileStore.dispatchToken]);
            MessageStore.emitChange();
            break;

        default:
    }
});

module.exports = MessageStore;

