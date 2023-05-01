import React,{ useState, useEffect, ActivityIndicator, Children } from 'react';
import { StyleSheet, Text, View, Animated, Button, TouchableOpacity, FlatList, Keyboard, TouchableWithoutFeedback, Easing, Dimensions } from 'react-native';
// import axios from 'axios';
import Start from './components/Start';
import Preview from './components/Preview';
import Speed from './components/Speed';
import TypeText from './components/TypeText';
import ProgressBar from './components/ProgressBar';
import FetchText from './components/FetchText';
import Ranking from './components/Ranking';
import dataFile from './dataFile.json';
import countries from './components/countries.json';
import { Audio } from 'expo-av';



// import HeartContainer from './components/HeartContainer';
// const RNFS = require('react-native-fs');

// const filePath = RNFS.DocumentDirectoryPath + "/YOUR_FILE_NAME";
// RNFS.writeFile(filePath, YOUR_TEXT, "utf8")
//   .then((success) => {
//    console.log("SUCCESS");
//  })
//   .catch((err) => {
//    console.log(err.message);
//   });

 let heartCount = 1;
const { height } = Dimensions.get('window');

const animationEndY = Math.ceil(height * 0.7);
const negativeEndY = animationEndY * -1;
const audioClip = new Audio.Sound();

// function getRandomNumber(min, max) {
//   return Math.random() * (max - min) * min;
// }


export default function App() {
  const [startScreen, setStartScreen] = useState(true);
  const [data, setData] = useState(FetchText());
  const [text, setText] = useState(data.original);
  const [typable, setTypable] = useState("");
  const [userInput, setUserInput] = useState("");
  // const [country, setCountry] = useState(data.companyen);
  const [capital, setCapital] = useState("");
  const [symbols, setSymbols] = useState(0);
  const [sec, setSec] = useState(0);
  const [miss, setMiss] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [myHealth, setMyHealth] = useState(200);
  const [enemyHealth, setEnemyHealth] = useState(200);
  const [score, setScore] = useState(0);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [scoreData, setScoreData] = useState([]);
  const [dataLength, setDataLength] = useState();
  const [ranked, setRanked] = useState(false);
  const [name, setName] = useState(false);
  const [list, setList] = useState(false);
  const [hearts, setHearts] = useState([]);
  // const [countryData, setCountryData] = useState([]);
  const [leastScore, setLeastScore] = useState(0);
  const [top, setTop] = useState(false);

  addHeart = (value, color) => {
    setHearts([
      ...hearts,
      { id: heartCount, right: -50, value: value, color: color },
    ]);
    heartCount++;
  };
  const removeHeart = (id) => {
    hearts.filter((heart) => {
      return heart.id !== id;
    });
  };

  const toTrueRanked = () => {
    setRanked(true);
  };
  const toFalseRanked = () => {
    setRanked(false);
  };
  const toTrueName = () => {
    setName(true);
  };
  const toFalseName = () => {
    setName(false);
  };
  const toTrueList = () => {
    setList(true);
  };
  const toFalseList = () => {
    setList(false);
  };
  const toFalseStartScreen = () => {
    setStartScreen(false);
  };
  const backspace = () => {
    setMiss(miss + 1);
    setScore(score - 200);
    addHeart(-200, "red");
  };

  // const url = 'http://192.168.3.4:5000/users';
  // const url = 'https://flickmobile.maddens360.vercel.app//users';
  // const deleteURL = 'https://flickmobile.maddens360.vercel.app/users/delete';
  // const updateURL = 'https://flickmobile.maddens360.vercel.app/users/update';
  const url = "http://192.168.3.4:5000/users";
  const url2 = "http://192.168.3.4:3000/users";
  const deleteURL = "http://192.168.3.4:5000/users/delete";
  const updateURL = "http://192.168.3.4:5000/users/update";

  fetchData = async () => {
    const response = await fetch(url2);
    const users = await response.json();
    
    setScoreData([]);
    setDataLength(users.length);

    users.sort((a, b) => b.score - a.score);
    if (users.length > 0) {
      if (users.length < 3) {
        for (let i = 0; i < users.length; i++) {
          setScoreData((data) => [
            ...data,
            { id: users[i].id, name: users[i].username, score: users[i].score },
          ]);
        }
        setLeastScore(users[users.length - 1].score);
      } else {
        for (let i = 0; i < 3; i++) {
          setScoreData((data) => [
            ...data,
            { id: users[i].id, name: users[i].username, score: users[i].score },
          ]);
        }

        for (let i = 3; i < users.length; i++) {
          const deleteData = { id: i };
          fetch(deleteURL, {
            method: "POST",
            body: JSON.stringify(deleteData),
            headers: { "content-type": "application/json" },
          });
        }
        for (let i = 0; i < 3; i++) {
          let updateData = {
            name: users[i].username,
            score: users[i].score,
            id: i,
          };
          // const updateData = { name:username, score:playerScore, id:3 };
          fetch(updateURL, {
            method: "POST",
            body: JSON.stringify(updateData),
            headers: { "content-type": "application/json" },
          });
        }

        // setLeastScore(users[99].score);
      }
      // if (users.length < 100) {
      //   for (let i = 0; i < users.length; i++) {
      //     setScoreData((data) => [
      //       ...data,
      //       { id: users[i].id, name: users[i].username, score: users[i].score },
      //     ]);
      //   }
      //   setLeastScore(users[users.length - 1].score);
      // } else {
      //   for (let i = 0; i < 100; i++) {
      //     setScoreData((data) => [
      //       ...data,
      //       { id: users[i].id, name: users[i].username, score: users[i].score },
      //     ]);
      //   }

      //   for (let i = 100; i < users.length; i++) {
      //     const deleteData = { id: i };
      //     fetch(deleteURL, {
      //       method: "POST",
      //       body: JSON.stringify(deleteData),
      //       headers: { "content-type": "application/json" },
      //     });
      //   }
      //   for (let i = 0; i < 100; i++) {
      //     let updateData = {
      //       name: users[i].username,
      //       score: users[i].score,
      //       id: i,
      //     };
      //     // const updateData = { name:username, score:playerScore, id:3 };
      //     fetch(updateURL, {
      //       method: "POST",
      //       body: JSON.stringify(updateData),
      //       headers: { "content-type": "application/json" },
      //     });
      //   }

      //   setLeastScore(users[99].score);
      // }
    } else return;
  };


  onRestart = () => {
    setData(FetchText());
    setUserInput("");
    setSec(0);
    setStarted(false);
    setFinished(false);
    setSymbols(0);
    setEnemyHealth(200);
    setMyHealth(200);
    setScore(0);
    setCompleted(0);
    setRanked(false);
    setList(false);
    setHearts([]);
    setMiss(0);
  };
  onClear = () => {
    setUserInput("");
  };

  async function onTest(){
    console.log(FetchText());
    buttonFX.replayAsync();
  }



  // useEffect(()=>{
  //   fetch(`https://restcountries.eu/rest/v2/alpha/${country}`)
  //     .then((res) => res.json())
  //     .then((json) => {
  //       setCapital(json.capital);
  //     });
  // })
  async function playBGM(){
    backgroundMusic = new Audio.Sound();
    try {
      await backgroundMusic.loadAsync(
        require("./assets/aboutnothing.mp3")
      );
      await backgroundMusic.setIsLoopingAsync(true);
      await backgroundMusic.playAsync();
    } catch (error) {
      console.log(error);
    }
  }


  onUserInputChange = (inputText) => {
    const v = inputText.nativeEvent.text;
    const seperateText = typable.split("");
    const seperateInput = v.split("");
    let createdText = "";
    for (let i = 0; i < seperateInput.length; i++) {
      createdText += seperateText[i];
    }
    setUserInput(v);
    
    console.log(data.hiragana);
    if (v === createdText) {
      setScore(score + 100);
      addHeart(+100, "purple");
      setSymbols(symbols + 1);
    } else {
      // setMiss(miss+1);
      // setMyHealth(myHealth - 33);
    }
    if (v === data.hiragana) {
      setData(FetchText());
      setTypable(data.hiragana);
      console.log(typable);
      buttonFX.replayAsync();
      setUserInput("");
      const bonus = typable.length * 100 * typable.length;
      setScore(score + bonus);
      setTimeout(() => {
        addHeart("+" + bonus, "purple");
      }, 1);
      setTimeout(() => {
        addHeart("+1秒", "orange");
      }, 200);
      setMyHealth(myHealth + 10);
      setCompleted(completed + 1);
    }

    setTimer();
  };

  setTimer = () => {
    if (!started) {
      setStarted(true);
    }
  };

  useEffect(() => {
    async function loadAudio() {
      buttonFX = new Audio.Sound();
      try {
        await buttonFX.loadAsync(require("./assets/se1.wav"));
      } catch (error) {
        console.log(error);
      }
    }
    loadAudio();
  }, []);

  useEffect(() => {
    const seperateText = typable.split("");
    seperateText.map((s, i) => {
      if (
        (i === userInput.length &&
          !(seperateText[i - 1] !== userInput[i - 1])) ||
        i === userInput.length - 1
      ) {
        //blue
      }
      if (i < userInput.length) {
        if (s === userInput[i]) {
          //green
        } else if (
          (i === userInput.length &&
            !(seperateText[i - 1] !== userInput[i - 1])) ||
          i === userInput.length - 1
        ) {
          //blue
        } else if (seperateText[i] !== userInput[i]) {
          //red
          setMiss(miss + 0);
          // setMiss(miss + 1);
        }
      }
    });
  }, [userInput]);

  useEffect(() => {
    if (myHealth === 0) {
      setFinished(true);
    }
  }, [myHealth]);

  useEffect(() => {
    if (leastScore < score || scoreData.length < 5) {
      setTop(true);
    }
    let interval = null;
    if (started && !finished) {
      interval = setInterval(() => {
        setSec((currentTime) => currentTime + 0.1);
        setMyHealth((myHealth) => myHealth - 2.5);
      }, 50);
    } else if (finished) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [started, finished]);

  useEffect(() => {
    // playBGM();
    fetchData();
    setTypable(data.hiragana);

  }, []);

  return (
    <>
      <Start
        startScreen={startScreen}
        toFalseStartScreen={toFalseStartScreen}
      />
      <View style={styles.barContainer}>
        <ProgressBar myHealth={myHealth} enemyHealth={enemyHealth} />
      </View>

      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={styles.container}>
          <View>
            {hearts.map((heart) => {
              return (
                <HeartContainer
                  value={heart.value}
                  color={heart.color}
                  key={heart.id}
                  style={{ right: heart.right }}
                  onComplete={() => removeHeart(heart.id)}
                />
              );
            })}
          </View>
          <Text style={styles.score}>{score}</Text>
          <Text style={styles.text}>{data.original}</Text>
          <Preview
            text={data.hiragana}
            typable={data.hiragana}
            userInput={userInput}
            finished={finished}
          />
          {/* <Text>{capital}</Text> */}
          <TypeText
            id="typeText"
            // userInput = {state.userInput}
            userInput={userInput}
            onUserInputChange={onUserInputChange}
            finished={finished}
            backspace={backspace}
            // onKeyPress={({ nativeEvent }) => {
            //   nativeEvent.key === 'Backspace' ? console.log('hello') : console.log('not backspace')
            // }}
          />
          <Button title="クリア" onPress={onClear}></Button>
          <Button title="やり直す" onPress={onRestart}></Button>
          <Button title="test" onPress={onTest}></Button>
          <Speed
            symbols={symbols}
            completed={completed}
            miss={miss}
            seconds={sec}
            symbols={symbols}
            score={score}
            finished={finished}
            scoreData={scoreData}
            dataLength={dataLength}
            ranked={ranked}
            toFalseRanked={toFalseRanked}
            toTrueRanked={toTrueRanked}
            toTrueName={toTrueName}
            toFalseName={toFalseName}
            name={name}
            toTrueList={toTrueList}
            toFalseList={toFalseList}
            list={list}
            top={top}
            setTop={setTop}
            leastScore={leastScore}
            fetchData={fetchData}
          />
          <Ranking
            scoreData={scoreData}
            score={score}
            fetchData={fetchData}
            dataLength={dataLength}
            toFalseRanked={toFalseRanked}
            toTrueRanked={toTrueRanked}
            ranked={ranked}
            toTrueName={toTrueName}
            toFalseName={toFalseName}
            toTrueName={toTrueName}
            toFalseName={toFalseName}
            toTrueList={toTrueList}
            toFalseList={toFalseList}
            list={list}
            leastScore={leastScore}
          />
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}
const HeartContainer = (props) => {
  const [position, setPosition] = useState(new Animated.Value(0));
  const [yAnimation, setYAnimation] = useState(new Animated.Value(0));
  const [opacityAnimation, setOpactiyAnimation] = useState(new Animated.Value(0));
  const [scaleAnimation, setScaleAnimation] = useState(new Animated.Value(0));
  // static defaultProps = {
  //   onComplete(){}
  // }

  useEffect(() => {
    const yAnimation = position.interpolate({
      inputRange: [negativeEndY * 0.15, 0],
      outputRange: [animationEndY, 0]
    });
    setYAnimation(yAnimation);

    const opacityAnimation = yAnimation.interpolate({
      inputRange: [0, animationEndY],
      outputRange: [1, 0]
    });
    setOpactiyAnimation(opacityAnimation);

    const scaleAnimation = yAnimation.interpolate({
      inputRange: [0, 15, 30],
      outputRange: [1, 1.4, 1],
      extrapolate: 'clamp'
    });
    setScaleAnimation(scaleAnimation);


    Animated.timing(position, {
      duration: 2000,
      toValue: negativeEndY,
      easing: Easing.ease,
      useNativeDriver: true
    }).start(props.onComplete);
  }, []);

  const getHeartStyle = () => {
    return {
      transform: [{ translateY: position }, { scale: scaleAnimation }],
      opacity: opacityAnimation
    };
  }

  return (
    <Animated.View style={[styles.heartContainer, getHeartStyle(), props.style]}>
      <Heart color={props.color} value={props.value} />
    </Animated.View>
  )
}
const Heart = (props) => {
  return (
    <View {...props} style={[styles.heart, props.style]}>
      <Text style={{ color: `${props.color}`, fontSize: 24, textAlign: 'center' }}>{props.value}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  barContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 3,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
    // marginTop:30,
  },
  ballContainer: {
    flex: 2,
    backgroundColor: '#fff',
  },
  text: {
    fontSize:24,
    marginBottom:10,
    fontWeight:'bold'
  },
  score: {
    fontSize:24,
    color:"#ff66b2",
    marginBottom:8
  },
  listItem: {
    color:"#ff66b2",
    marginVertical: 150,
    fontSize:20,
    position:'absolute',
    marginLeft:30+'%',
    marginTop:30+'%',
  },
  box:{
    alignItems:'center',
    flex:1,
    position:'relative',
  },
  addButton: {
    backgroundColor: "#378ad9",
    width: 60,
    height: 60,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 32,
    left: 32
  },
  heartContainer: {
    position: 'absolute',
    bottom: -20,
    backgroundColor: 'transparent',
  },
  heart: {
    width: 100,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    textAlign: 'center',
  }

});
