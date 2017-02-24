/**
 * UnArmMeIfYouDare React Native App
 * @Githib https://github.com/paddy1414
 * @Githib https://github.com/paddy1414
 * @flow
 */

import React, { Component } from 'react';
import BackgroundTimer from 'react-native-background-timer';
import ToastAndroid1 from './Toast';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ListView,
  renderRow,
  Alert,
  Image,
  BackAndroid,
} from 'react-native';
import TimeFormatter from 'minutes-seconds-milliseconds';
const Sound = require('react-native-sound');
  Sound.setCategory('Ambient', true); // true = mixWithOthers
  
	// Load the sound file tick and boom from the app bundle
const tick = new Sound('tick.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  } 
  // loaded successfully
  console.log('duration in seconds: ' + tick.getDuration() + 'number of channels: ' + tick.getNumberOfChannels());
});
	// Load the sound file  boom from the app bundle

const boom = new Sound('boom.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }   
  // loaded successfully
  console.log('duration in seconds: ' + boom.getDuration() + 'number of channels: ' + boom.getNumberOfChannels());
});

const quickTicker = new Sound('quick_bomb.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }   
  // loaded successfully
  console.log('duration in seconds: ' + boom.getDuration() + 'number of channels: ' + boom.getNumberOfChannels());
});
		var totalScored = 0;
		var lastTo =0;
		var counter
		var rand;
		var timer;
	
class UnArmMeIfYouDare extends Component {
	constructor(props) {
    super(props);

	this.state= {
		isRunning: false,
		mainTimer: null,
		lastScore: '0',
		bombOff: null,
		highestScore: null,
		firstRun: true,
		totalScore: null,
	}
}
_handleBtn() {
			tick.setSpeed(1);
			tick.setNumberOfLoops(6);
		console.log('Tick duration', tick.getDuration());
		tick.play(() => tick.release())
		quickTicker.stop();
	
		
		
			this._handleStartStop();
	}
	_handleStartStop() {
		
		console.log('hit me');

	let{isRunning, lastScore, highestScore, mainTimer, isSaved, bombOff, firstRun} = this.state;
	
		if(isRunning) {
			// stop the timer 
		BackgroundTimer.stop();
		// Cancel the timeout if necessary 
	//	BackgroundTimer.clearTimeout(quickTime);
		// Cancel the timeout if necessary 
//		BackgroundTimer.clearTimeout(bombExplode);
			this._calculateScore();	
			 tick.stop();
			console.log('not saved');
			clearInterval(this.interval);
			this.setState({ 
			isRunning: false,
			mainTimer: null,
			});				
			return;
		} 

		
		//this._timer();
		//else start the timer
		this.setState({
			mainTimerStart: new Date(),
			isRunning: true,
		});
			clearInterval(this.interval);
	
	this._playSound();			
		this.interval = setInterval(() => {
			this.setState({
				mainTimer: new Date() - this.state.mainTimerStart + mainTimer,
			});
		},30);
		
	}

	////////////////////////////////handles Keeping score//////////////////////////////
	_calculateScore() {
			let{lastScore, highestScore, bombOff, mainTimer, firstRun, totalScore} = this.state;
				console.log('differece ////////////////////');
	console.log((bombOff-mainTimer));
	console.log('differece ////////////////////');
		if ((this.state.bombOff-this.state.mainTimer) < 3000) {
		lastTo=100;
		console.log((bombOff-mainTimer));
				this.setState({ 
				lastScore: 100
						
			}); console.log('100 ////////////////////');
	console.log(('100'));
	console.log('100 ////////////////////');
			} else if ((this.state.bombOff - this.state.mainTimer) > 3000 && (this.state.bombOff - this.state.mainTimer) < 7000 ) {
				lastTo=50;
				this.setState({ 
				lastScore: 50
			});
			 console.log('50 ////////////////////');
	console.log(('50'));
	console.log('50 ////////////////////');
			} else if ((this.state.bombOff-this.state.mainTimer) > 70000 && (this.state.bombOff - this.state.mainTimer) < 15000) {
				lastTo=25;
				this.setState({ 
				lastScore: 25				
			});
			 console.log('25 ////////////////////');
	console.log(('25'));
	console.log('25 ////////////////////');
			} else  if ((this.state.bombOff-this.state.mainTimer) > 15000){
				lastTo=15;
				this.setState({ 
				lastScore: 15				
			});
			} if(firstRun) {
				this.setState({ 
					highestScore: lastScore,
				});
			} if (highestScore < lastScore )  {
				 console.log('vomparing1 ////////////////////');
	console.log(this.state.highestScore);
	console.log('vomparing1 ////////////////////');
				this.setState({ 
				highestScore: lastScore,
			}); 
			console.log('vomparing ////////////////////');
	console.log(this.state.highestScore);
	console.log('vomparing2 ////////////////////');
		};
		totalScored =totalScored + lastTo;
			this.setState({ 
				totalScore: totalScored
			});
	}

	_closeApp () {
		BackAndroid.exitApp();
	}
	


	
	
	////////////////////////////////handles the timers for//////////////////////////////
		// HAndles playing the sounds for bomb
		// generates a random number to determine when the bomb goes boom
		// plays a faster timer 2 seconds earlier than explosion
	_playSound() {
			rand =Math.floor((Math.random()*20000)+4000);
		this.setState({ 
			bombOff: rand
			});
			
console.log('explosionAt');
	console.log(rand);
	console.log('explosionAt');
 var otherSound = rand-3000;

////////////////////////////////Timer for quick Time //////////////////////////////
		const quickTime = BackgroundTimer.setTimeout(() => {
				let{isRunning} = this.state;
		if(isRunning) {
	quickTicker.setSpeed(1);
		//	this._renderlastScore();
          console.log('duration', quickTicker.getDuration());
		  tick.stop();
			quickTicker.play(() =>quickTicker.release());
			console.log('otherSound');
	console.log(otherSound);
	console.log('otherSound');
		}}, otherSound);
		
		
		////////////////////////////////Timer for bomb /////////////////////////////
	//play sound at rand time
		const bombExplode = BackgroundTimer.setTimeout(() => {
				let{isRunning} = this.state;
		if(isRunning) {
			quickTicker.stop();
		console.log('bob');
			boom.setSpeed(1);
          console.log('duration', boom.getDuration());
			boom.play(() => boom.release());
			console.log('explosion');
	console.log(rand);
	clearInterval(this.interval);
	console.log('explosion');
	this.setState({ 
			isRunning: false,
			mainTimer: 0,
			});
			console.log('mainTimerBtn');
	console.log(rand);
	console.log('mainTimerBrn');
		}}, rand);
	
	////////////////////////////////
	}
	
	//displays the score
	_renderScore() {
		return (
		<View style={styles.buttonWrapper}>
			<View style={styles.timerWrapperInner}>
			<Text style={styles.yourScore}>Your Last scored!</Text>
				<Text style={styles.mainTimer}>{this.state.lastScore}</Text>
				<Text style={styles.yourScore}>Points</Text>
			</View>
			<View style={styles.timerWrapperInner}>
			<Text style={styles.yourScore}>Your Highest scored!</Text>
				<Text style={styles.mainTimer}>{this.state.highestScore}</Text>
				<Text style={styles.yourScore}>Points</Text>
				<Text style={styles.yourScore}>Your Total score!</Text>
				<Text style={styles.mainTimer}>{this.state.totalScore}</Text>
				<Text style={styles.yourScore}>Points</Text>
			</View>
			
		</View>
		);
	}
	//displays the title
	_renderTitle() {
		return (
	<View style={styles.title}>
	<TouchableHighlight underlayColor ='#777' onPress={this._closeApp.bind(this)} style= {styles.exitButton}>
		<Text>Exit</Text>
		</TouchableHighlight>
		</View>
		);
	}
	//////////////displays the picture ////////////////////////////////////////
	_renderTimer() {
		return (
		<View style={styles.timerWrapper}>
				<Image source={require('./images/cartBomb.jpg')} />
		</View>
		);
	}
	
	//displays the buttons ////////////////////////////////////////
	_renderButtons() {
		return (
		<View style={styles.buttonWrapper}>
	<TouchableHighlight underlayColor ='#777' onPress={this._handleBtn.bind(this)} style= {styles.button}>
		<Text style={[styles.armBtn, this.state.isRunning && styles.disarmBtn]}>{this.state.isRunning? 'Disarm!!' : 'Arm Bomb'}</Text>
		</TouchableHighlight>
		<Text style={styles.title}>{this.state.mainTimer}</Text>
		</View>
		
		);
	}
	//called to ensure its first run when opened //////////////
	_firstRun() {
		this.setState({ 	
		firstRun: true
			});
		}
		///////called when app is closed //////////////
		componentWillUnmount() {
		 tick.stop();
		 boom.stop();
		 BackgroundTimer.stop();
		ToastAndroid1.show("Your Final Score was " + this.state.totalScore, ToastAndroid1.LONG);
		
		}
	/////////////// puts everything into the users View ////////////////////////////////////////
  render() {
	  
  return (
	<View style={styles.container}>
      <View style={styles.top}>
		  {this._renderTitle()}
		{this._renderTimer()}
		</View>
		
		<View style={styles.bottom}>
		  {this._renderButtons()}
			  {this._renderScore()}
		</View>	
      </View>
    );
  }
}



const styles = StyleSheet.create(
{
  container: {
    flex: 1,
  },
    header: {
	  borderBottomWidth: 0.1,
	  paddingTop: 20,
	  paddingBottom: 10,
	  backgroundColor: '#F9F9F9'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  },
  timerWrapper : {
	  backgroundColor:'#FFFFFF',
	  justifyContent: 'center',
	  flex: 1
  },
  timerWrapperInner : {
	 borderWidth: 0.5,
	 alignSelf: 'center'
  },
   mainTimer : {
	  fontSize: 30,
	  fontWeight: '100',
	  alignSelf: 'flex-end'
  },
   yourScore : {
	  fontSize: 20,
	  fontWeight: '100',
	  alignSelf: 'flex-end'
  },
   lapTimer : {
	  backgroundColor:'#FFFFFF'
  },
  title: {
	  alignSelf: 'center',
  },

  top: {
	  flex: 1,
	  backgroundColor: '#f0eff5'
  },
  bottom: {
	  flex:1,
	  backgroundColor: '#f0eff5'
  },
  buttonWrapper: {
	  flexDirection: 'row',
	  justifyContent: 'space-around',
	  paddingTop: 20,
	  paddingBottom: 20,
  },
  button: {
	  height: 80,
	  width: 80,
	  borderRadius: 40,
	  backgroundColor: '#fff',
	  justifyContent: 'center',
	  alignItems: 'center',
  },
  
  exitButton: {
	  height: 80,
	  width: 80,
	  borderRadius: 10,
	  backgroundColor: '#fff',
	  justifyContent: 'center',
	  alignItems: 'center',
  },
 armBtn: {
	 color: 'red'
 },
 
   disarmBtn: {
	 color: '#00cc00'
 },
});

AppRegistry.registerComponent('UnArmMeIfYouDare', () => UnArmMeIfYouDare);
