import React,{ useState, useEffect } from 'react'
import { StyleSheet, View, Text, Button, Modal, Animated, ScrollView, ActivityIndicator } from 'react-native'

const Ranking = (props) => {
  // const url = 'http://192.168.1.17:5000/users'
  // const deleteURL = 'http://192.168.1.17:5000/users/delete'
  // const url = 'https://flickmobile.maddens360.vercel.app/users';
  // const deleteURL = 'https://flickmobile.maddens360.vercel.app/users/delete';
  const url = "http://192.168.3.4:5000/users";
  const deleteURL = "http://192.168.3.4:5000/users/delete";

  const [isLoading, setIsLoading] = useState(true);
  const [scoreData, setScoreData] = useState([]);
  const [dataLength, setDataLength] = useState();
  const [arr, setArr] = useState([]);
  const [leastScore, setLeastScore] = useState();
  const [height, setHeight] = useState();
  const [loaded, setLoaded] = useState(false);

  let scrollview_ref = null;
  let i = 0;
  useEffect(() => {
    setScoreData([]);
    // async function fetchData(){
    //     const response = await fetch(url);
    //     const users = await response.json();
    //     setDataLength(users.length);
    //     users.sort((a,b) => b.score - a.score);
    //     if(users.length < 5){
    //         for (let i = 0; i < users.length; i++) {
    //             setScoreData(data => [...data, { id: users[i].id, name: users[i].name, score: users[i].score }]);
    //         }
    //         setLeastScore(users[users.length].score);
    //     }
    //     else{
    //         for(let i=0;i<5;i++){
    //             setScoreData(data => [...data,{id:users[i].id, name:users[i].name, score:users[i].score}]);
    //         }
    //         setLeastScore(users[4].score);
    //     }
    // }
    props.fetchData();
    setIsLoading(false);
  }, []);

  const showRanking = () => {
    props.toTrueList();
    setScoreData([]);
  };
  useEffect(() => {
    setScoreData([]);
    flicker();

    props.fetchData();
    setIsLoading(false);
  }, [props.list]);

  useEffect(() => {
    if (props.list == true && props.ranked) {
      scrollview_ref.scrollTo({
        x: 0,
        y: arr[props.dataLength - 1],
        animated: true,
      });
    }
  }, [loaded]);

  // const deleteF = () => {
  //     console.log('deleting');
  //     const score = props.leastScore;

  //     const data = { score };
  //     fetch(deleteURL, {
  //         method: 'POST',
  //         body: JSON.stringify(data),
  //         headers: { 'content-type': 'application/json' }
  //     });
  //     props.fetchData();
  // }

  // useEffect(() => {
  //     // console.log(scoreData[4].score);
  //     // if(props.score && props.score>scoreData[4].score){
  //     //     console.log('top 5');
  //     // }
  //     console.log(scoreData);
  // },[scoreData]);

  const hideRanking = () => {
    props.toFalseList();
  };

  const opacity = useState(new Animated.Value(1))[0];

  function flicker() {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start(() => {
      if (props.list === true) {
        flicker();
      } else console.log("paused");
    });
  }

  if (!isLoading && props.scoreData) {
    return (
      <View>
        <Button title="ランキングを見る" onPress={showRanking} />
        {/* <Modal visible={!loaded}>
                    <View style={[styles.container]}>
                        <ActivityIndicator size='large' color='crimson'/>
                    </View>
                </Modal> */}
        <Modal visible={props.list}>
          <View style={styles.container}>
            <Text style={styles.title}>スコアランキング</Text>
            <ScrollView
              style={styles.scroll}
              ref={(ref) => {
                scrollview_ref = ref;
              }}
            >
              {props.scoreData.map((item, key) => {
                let flick;
                let color;
                if (props.ranked) {
                  flick = item.id === props.dataLength - 1 ? opacity : 1;
                  color = item.id === props.dataLength - 1 ? "purple" : "pink";
                } else {
                  flick = 1;
                  color = "pink";
                }

                return (
                  <Animated.Text
                    onLayout={(event) => {
                      const layout = event.nativeEvent.layout;
                      arr[item.id] = layout.y;
                      i = i + 1;
                      if (i == 27) {
                        setLoaded(true);
                      }
                    }}
                    style={{
                      color: color,
                      fontWeight: "bold",
                      fontSize: 32,
                      opacity: flick,
                      marginBottom: 22,
                    }}
                    key={item.id + item.name + item.score}
                  >
                    {key + 1}位 {item.name}:
                    <Text style={styles.words}>{item.score}</Text>
                  </Animated.Text>
                );
              })}
            </ScrollView>
            <View style={{ marginBottom: 15 + "%" }}>
              <Button title="戻る" onPress={hideRanking} />
            </View>
          </View>
        </Modal>
      </View>
    );
  } else {
    return null;
  }
}

export default Ranking

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    title:{
        fontSize:32,
        color:'black',
        fontWeight:'bold',
        marginTop:25+'%',
    },
    words:{
        fontSize:32,
        color: "#ff66b2",
        marginTop:30,
    },
    info:{
        color:'orange',
        fontWeight:'bold',
        fontSize:22,
        paddingTop:22
    },
    goBack:{
        fontSize:28,
        
    },
    scroll:{
        backgroundColor:'rgba(255,1,1,0.05)',
        padding:5+'%',
        margin:5+'%',
        borderWidth:1,
        borderColor:'violet'
    }
})
