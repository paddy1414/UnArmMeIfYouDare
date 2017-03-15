/**
 * UnArmMeIfYouDare React Native App
 * @Githib https://github.com/paddy1414
 * @Githib https://github.com/paddy1414
 * @flow
 */

import React, {
 Component
}
from 'react';
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
}
from 'react-native';
import TimeFormatter from 'minutes-seconds-milliseconds';
const Sound = require('react-native-sound');
Sound.setCategory('Ambient', true); // true = mixWithOthers
/*
	// Load the sound file tick and boom from the app bundle
const tick = new Sound('tick.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  } 
  */
const soundToPlay = new Sound('tick.mp3', Sound.MAIN_BUNDLE, (error) => {
 if (error) {
  console.log('failed to load the sound', error);
  return;
 }
 // loaded successfully
 console.log('duration of soundToPlay in seconds: ' + soundToPlay.getDuration() + 'number of channels: ' + soundToPlay.getNumberOfChannels());
});

// Load the sound file  boom from the app bundle

var totalScored = 0;
var lastTo = 0;
var counter;
var rand;
var timer;
var TimeoutBoom;
var timoutQuick;
var quickTime;
var bombExplode;
class UnArmMeIfYouDare extends Component {
 constructor(props) {
  super(props);
  this.state = {
   isRunning: false,
   mainTimer: null,
   lastScore: '0',
   bombOff: null,
   highestScore: '0',
   firstRun: true,
   totalScore: '0',
  }
 }
 _handleBtn() {

  console.log('Tick duration', soundToPlay.getDuration());
  //put stop here
  this._handleStartStop();
 }


 _handleStop() {
  let {
   isRunning,
   lastScore,
   highestScore,
   mainTimer,
   isSaved,
   bombOff,
   firstRun
  } = this.state;

  // stop the timer 
  BackgroundTimer.stop();
  // Cancel the timeout if necessary 
  // tick.stop();
  // boom.stop();
  //boom.release();
  //	 quickTicker.stop();
  console.log('not saved');
  clearInterval(this.interval);
  this.setState({
   isRunning: false,
   mainTimer: null,
  });
 }


 _handleStartStop() {

  console.log('hit me');

  let {
   isRunning,
   lastScore,
   highestScore,
   mainTimer,
   isSaved,
   bombOff,
   firstRun
  } = this.state;

  if (isRunning) {
   //	this._handleStop();
   BackgroundTimer.stop();
   BackgroundTimer.clearTimeout(bombExplode);
   BackgroundTimer.clearTimeout(quickTime);
   //BackgroundTimer.stop();
   // Cancel the timeout if necessary 
   // tick.stop();
   // boom.stop();
   // quickTicker.stop();
   soundToPlay.stop();
   //soundToPlay.release();
   clearInterval(this.interval);
   this.setState({
    isRunning: false,
    mainTimer: null,
   });
   this._calculateScore();
   return;
  }


  //this._timer();
  //else start the timer
  this.setState({
   mainTimer: null,
   mainTimerStart: new Date(),
   isRunning: true,
  });
  clearInterval(this.interval);

  this._playSound();
  this.interval = setInterval(() => {
   this.setState({
    mainTimer: new Date() - this.state.mainTimerStart + mainTimer,
   });
  }, 30);

 }

 ////////////////////////////////handles Keeping score//////////////////////////////
 _calculateScore() {
  let {
   lastScore,
   highestScore,
   bombOff,
   mainTimer,
   firstRun,
   totalScore
  } = this.state;
  console.log('differece ////////////////////');
  console.log((bombOff - mainTimer));
  console.log('differece ////////////////////');
  if ((this.state.bombOff - this.state.mainTimer) < 3000) {
   lastTo = 100;
   console.log((bombOff - mainTimer));
   console.log('100 high score');
   this.setState({
    lastScore: 100
   });

  } else if ((this.state.bombOff - this.state.mainTimer) > 3000 && (this.state.bombOff - this.state.mainTimer) < 7000) {
   lastTo = 50;
   console.log('50 high score');
   this.setState({
    lastScore: 50
   });

  } else if ((this.state.bombOff - this.state.mainTimer) > 70000 && (this.state.bombOff - this.state.mainTimer) < 15000) {
   lastTo = 25;
    console.log('25 high score');
   this.setState({
    lastScore: 25
   });

  } else if ((this.state.bombOff - this.state.mainTimer) > 15000) {
   lastTo = 15;
    console.log('15 high score');
   this.setState({
    lastScore: 15
   });
  }
  if (firstRun) {
	  	this._firstRun();
		console.log('firstRun', lastTo);
   this.setState({
    highestScore: lastTo,
   });
  }
  if (highestScore < lastScore) {
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
  totalScored = totalScored + lastTo;
  this.setState({
   totalScore: totalScored
  });
 }

 _closeApp() {
  BackAndroid.exitApp();
 }


 ////////////////////////////////handles the timers for//////////////////////////////
 // HAndles playing the sounds for bomb
 // generates a random number to determine when the bomb goes boom
 // plays a faster timer 2 seconds earlier than explosion
 _playSound() {
  BackgroundTimer.clearTimeout(this.bombExplode);
  BackgroundTimer.clearTimeout(this.quickTime);
  BackgroundTimer.stop();
  soundToPlay.release();
  soundToPlay = new Sound('tick.mp3', Sound.MAIN_BUNDLE, (error) => {
   if (error) {
    console.log('failed to load the sound', error);
    return;
   }
   // loaded successfully
   console.log('duration of tick in seconds: ' + soundToPlay.getDuration() + 'number of channels: ' + soundToPlay.getNumberOfChannels());
   soundToPlay.setSpeed(1);
   soundToPlay.setNumberOfLoops(6);
   soundToPlay.play(() => soundToPlay.release());
   console.log(soundToPlay.isLoaded(), 'tick is loaded');
   // BackgroundTimer.clearTimeout(this,bombExplode);
   //	BackgroundTimer.clearTimeout(this.quickTime);
   //BackgroundTimer.stop();
  });


  rand = Math.floor((Math.random() * 20000) + 5000);
  this.setState({
   bombOff: rand
  });

  console.log('explosionAt');
  console.log(rand);
  console.log('explosionAt');
  var otherSound = rand - 3000;


  ////////////////////////////////Timer for quick Time //////////////////////////////
  quickTime = BackgroundTimer.setTimeout(() => {
   let {
    isRunning
   } = this.state;
   soundToPlay.stop();
   if (isRunning) {

    soundToPlay = new Sound('quick_bomb.mp3', Sound.MAIN_BUNDLE, (error) => {
     if (error) {
      console.log('failed to load the sound', error);
      return;
     }
     // loaded successfully
     console.log('duration of soundToPlay in seconds: ' + soundToPlay.getDuration() + 'number of channels: ' + soundToPlay.getNumberOfChannels());
     soundToPlay.setSpeed(1);
     soundToPlay.setNumberOfLoops(0);
     console.log('duration of quicktimer', soundToPlay.getDuration());
     //  tick.stop();
     //	  	boom.stop()	
     soundToPlay.play(() => soundToPlay.release());

    }); //quickTicker.play();
    console.log('quicly play');

    console.log(otherSound);
    console.log('quicly play');
    BackgroundTimer.stop();
   } else {
    BackgroundTimer.clearTimeout(quickTime);
   }




  }, otherSound);

  console.log('before of the timer');
  ////////////////////////////////Timer for bomb /////////////////////////////
  //play sound at rand time
  bombExplode = BackgroundTimer.setTimeout(() => {
   let {
    isRunning
   } = this.state;
   if (isRunning) {
    BackgroundTimer.clearTimeout(quickTime);
    soundToPlay.stop();
    soundToPlay.release();
    soundToPlay = new Sound('boom.mp3', Sound.MAIN_BUNDLE, (error) => {
     if (error) {
      console.log('failed to load the sound', error);
      return;
     }
     // loaded successfully
     console.log('duration of boom in seconds: ' + soundToPlay.getDuration() + 'number of channels: ' + soundToPlay.getNumberOfChannels());
     // loaded successfully

     soundToPlay.setSpeed(1);
     //	boom.stop();
     console.log('duration of boom', soundToPlay.getDuration());
     soundToPlay.play(() => soundToPlay.release());
     //boom.play();
     console.log('explosion sound play');
     console.log(soundToPlay.isLoaded());
     console.log(rand);
     clearInterval(this.interval);
     console.log('explosion');
     this._handleStop();
    });
   } else {
    BackgroundTimer.clearTimeout(quickTime);
   }



  }, rand);
  console.log('out of the timer');
  //		BackgroundTimer.clearTimeout(bombExplode);
  //		BackgroundTimer.clearTimeout(quickTime);
  ////////////////////////////////
 }


	
	//displays the score
	_renderScore() {
		return (
		<View style={styles.buttonWrapper}>
			<View style={styles.timerWrapperInner}>
			<Text style={styles.yourScore}>Your Last scored!</Text>
				<Text style={styles.scoreStyles}>{this.state.lastScore}</Text>
				<Text style={styles.yourScore}>Points</Text>
			</View>
			<View style={styles.timerWrapperInner}>
			<Text style={styles.yourScore}>Your Highest scored!</Text>
				<Text style={styles.scoreStyles}>{this.state.highestScore}</Text>
				<Text style={styles.yourScore}>Points</Text>
				<Text style={styles.yourScore}>Your Total score!</Text>
				<Text style={styles.scoreStyles}>{this.state.totalScore}</Text>
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
		firstRun: false,
			});
		}
///////called when app is closed //////////////
		componentWillUnmount() {
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
   scoreStyles : {
	  fontSize: 30,
	  fontWeight: '100',
	  alignSelf: 'flex-end'
	  
  },
   mainTimer : {
	  fontSize: 30,
	  fontWeight: '100',
	  alignSelf: 'flex-end',
	  position: 'absolute',
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
	  left: 100
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
	  flexWrap: 'nowrap',
	  flexDirection: 'row',
	  justifyContent: 'flex-start',
	  paddingTop: 20,
	  paddingBottom: 20,
//	  alignSelf: 'flex-start',
overflow: 'hidden',

  },
  
  timeWrapper: {
	  flexWrap: 'nowrap',
	  flexDirection: 'row',
	  justifyContent: 'flex-end',
	  paddingTop: 20,
	  paddingBottom: 20,
//	  alignSelf: 'flex-start',
overflow: 'hidden',

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
