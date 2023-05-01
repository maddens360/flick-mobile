import React, { useState } from 'react'
import { StyleSheet, Text, View, Button, Modal, TextInput, Alert } from 'react-native'
import Delayed from './Delayed'


const Speed = (props) => {
  const [username, setUsername] = useState();

  // const url = 'http://192.168.1.17:5000/users';
  // const deleteURL = 'http://192.168.1.17:5000/users/delete'
  // const updateURL = 'http://192.168.1.17:5000/users/update'
  // const url = "https://flickmobile.maddens360.vercel.app/users";
  // const deleteURL = 'https://flickmobile.maddens360.vercel.app/users/delete'
  // const updateURL = 'https://flickmobile.maddens360.vercel.app/users/update'
  const url = "http://192.168.3.4:5000/users";
  const deleteURL = "http://192.168.3.4:5000/users/delete";
  const updateURL = "http://192.168.3.4:5000/users/update";
  const url2 = "http://192.168.3.4:3000/users/add";

  const submit = async () => {
    // const response = await fetch(url2);
    // const users = await response.json();

    const id = props.dataLength;
    const score = props.score;
    const user = username;
    const data = { id, score, user };
    // const data = { id, score, user };
    fetch(url2, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "content-type": "application/json" },
    });

    // console.log('deleting');
    // const leastScore = props.leastScore;
    // console.log(leastScore);

    // const deleteData = { score:leastScore };
    // fetch(deleteURL, {
    //     method: 'POST',
    //     body: JSON.stringify(deleteData),
    //     headers: { 'content-type': 'application/json' }
    // });

    // console.log('updating');
    // const playerScore = props.score;
    // let updateData = { name:username, score:playerScore, id:0 };
    // // const updateData = { name:username, score:playerScore, id:3 };
    // fetch(updateURL, {
    //     method: 'POST',
    //     body: JSON.stringify(updateData),
    //     headers: { 'content-type': 'application/json' }
    // });
    // for(let i=0; i<3; i++){
    //     let updateData2 = { name:users[i].name, score:users[i].score, id:i+1 };
    //     fetch(updateURL, {
    //         method: 'POST',
    //         body: JSON.stringify(updateData2),
    //         headers: { 'content-type': 'application/json' }
    //     });

    // }
    props.fetchData();
  
    props.toFalseName();
    props.toTrueRanked();
    props.toTrueList();
    props.setTop(false);
  };

  // useEffect(() => {
  //     async function fetchData() {
  //         const response = await fetch(url);
  //         const users = await response.json();
  //         users.sort((a, b) => b.score - a.score);
  //     }
  //     fetchData();
  // }, [name]);
  const insertPhase = () => {
    props.toTrueName();
  };
  const goBack = () => {
    props.toFalseName();
  };
  if (props.finished && !props.top) {
    return (
      <>
        <View style={styles.container}>
          <Text style={styles.result}>結果！</Text>
          <Delayed waitBeforeShow={500}>
            <Text style={styles.result}>入力文字数:{props.symbols}</Text>
          </Delayed>
          <Delayed waitBeforeShow={1000}>
            <Text style={styles.result}>入力完了数:{props.completed}</Text>
          </Delayed>
          <Delayed waitBeforeShow={1500}>
            <Text style={styles.result}>miss:{props.miss}</Text>
          </Delayed>
          {/* <Delayed waitBeforeShow={2000}>
            <Text style={styles.score}>トップ100にランクイン！</Text>
          </Delayed> */}
        </View>
      </>
    );
  } else if (props.finished && props.top) {
    return (
      <>
        <View style={styles.container}>
          <Text style={styles.result}>結果！</Text>
          <Delayed waitBeforeShow={500}>
            <Text style={styles.result}>入力文字数:{props.symbols}</Text>
          </Delayed>
          <Delayed waitBeforeShow={1000}>
            <Text style={styles.result}>入力完了数:{props.completed}</Text>
          </Delayed>
          <Delayed waitBeforeShow={1500}>
            <Text style={styles.result}>miss:{props.miss}</Text>
          </Delayed>
          <Delayed waitBeforeShow={2000}>
            <Text style={styles.score}>Total Score:{props.score}</Text>
          </Delayed>

          {/* <Button title="ランキングに登録" onPress={insertPhase} /> */}

          {/* <Modal visible={props.name}>
            <View style={styles.rankingContainer}>
              <Text style={styles.score}>スコア：{props.score}</Text>
              <TextInput
                style={styles.input}
                autoFocus={true}
                // style={styles.input}
                placeholder="名前を入力してください"
                onChangeText={(username) => setUsername(username)}
              />
              <Button title="ランキングに登録" onPress={submit} />
              <Button title="戻る" onPress={goBack} />
            </View> */}
          {/* </Modal> */}
        </View>
      </>
    );
  } else {
    return null;
  }
}

const styles = StyleSheet.create({
    score:{
        fontSize:24,
        color:"#ff66b2",
        marginBottom:10,
    },
    result:{
        fontSize:24,
        marginBottom:10,
    },
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    rankingContainer:{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        backgroundColor: '#F3F3F3',
        height: 45,
        width: 300,
        textAlign: 'center'
    },
})
export default Speed;