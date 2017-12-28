class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
    	this.config = config;
		this.config.initial = 'normal';
		this.history = [this.config.initial];
		this.cache = [];

    	if(!this.config) throw new Error('Config isn\'t passed');
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
    	return this.config.initial;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
    	let arr = [];
    	let newState;

    	for(let key in this.config.states) arr.push(key);
    	newState = arr.find(item => item === state);

    	if(newState) {
    		this.config.initial = newState;
    		this.history.push(state);
    		this.cache = [];
    	} else throw new Error('State isn\'t exist')
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
    	let current = this.config.states[this.config.initial].transitions;

    	if(event in current) {
    		this.config.initial = current[event];
    		this.history.push(this.config.initial);
    		this.cache = [];
    	} else {
    		throw new Error('Event isn\'t exist');	
    	}	
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
    	this.config.initial = 'normal';
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
    	let arr = [];

    	for(let key in this.config.states) arr.push(key)

    	if(!event) return arr;
    	else return arr.filter(item => event in this.config.states[item].transitions);
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo(){
    	if(this.history.length === 1) return false;

    	let tmp = this.history.pop();
    	this.cache.push(tmp);

    	this.config.initial = this.history[this.history.length - 1];

    	return true;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
    	if(this.history.length === 1 && this.cache.length === 0) return false;
    	if(this.cache.length === 0) return false;

    	let tmp = this.cache.pop();
    	this.history.push(tmp);

    	this.config.initial = this.history[this.history.length - 1];

    	return true;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
    	this.history = [this.config.initial];
    	this.cache = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
