import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, View, StyleSheet, Button, Modal, Pressable, FlatList, TouchableOpacity } from 'react-native';


export default function App() {

  const [accountNumber, setAccountNumber] = useState();
  const [unitsNumber, setUnitsNumber] = useState();
  const [billPrice, setBillPrice] = useState();
  const [tempUnits, setTempUnits] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [billData, setBillData] = useState([
    {
      id: 1,
      serviceNumber: "1234567890",
      unit: "50",
      unitCost: "250"
    },
    {
      id: 2,
      serviceNumber: "1234567890",
      unit: "100",
      unitCost: "800",
    },
    {
      id: 3,
      serviceNumber: "1234567890",
      unit: "500",
      unitCost: "5000"
    },
  ]);

  const [tempData,setTempData]=useState([]);




  const costCalc = (service, unit, prevUnit) => {
    var dummyprice = 0;
  let temp = [];
    var tempID = billData.length + 1;
    var varmi = false;
    let dummy=[];
    billData.map((item, index) => {
      console.log("-------------");
      temp.push(item);
      if (service === item.serviceNumber) {
        console.log("buldm");
        dummy.push(item);
        var lastUnit=unit-item.unit;
        varmi = false;
        if (lastUnit <= 100) {
          dummyprice = lastUnit * 5;
        }
        else if (lastUnit > 100 && lastUnit <= 500) {
          dummyprice = lastUnit * 8;
        }
        else if (lastUnit > 500) {
          dummyprice = lastUnit * 10;
        }
        setBillPrice(dummyprice);
        console.log(dummyprice);  
      }
      else {

        varmi = true;
        if (unit <= 100) {
          dummyprice = unit * 5;
        }
        else if (unit > 100 && unit <= 500) {
          dummyprice = unit * 8;
        }
        else if (unit > 500) {
          dummyprice = unit * 10;
        }
        setBillPrice(dummyprice);



        console.log("bulamadım", index);
      }


    });
    if (varmi == true) {
      temp.push(
        {
          id: tempID,
          serviceNumber: service,
          unit: unit,
          unitCost: dummyprice,
        }
      );
      setBillData(temp);
    }
    else{
      temp.push(
        {
          id: tempID,
          serviceNumber: service,
          unit: unit,
          unitCost: dummyprice,
        }
      );
      setBillData(temp);
    }


    setTempData(dummy);
    console.log("Temp:",tempData);

    console.log("dummy",dummy);



    setModalVisible(!modalVisible);

  }



  return (




    <SafeAreaView style={styles.barContainer}>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        style={{ alignSelf: "center" }}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{ elevation: 5, height: "50%",marginTop:'30%' ,width: "90%", backgroundColor: "transparent", borderRadius: 14, justifyContent: "center", alignSelf: "center", alignContent: "center", flexDirection: "column" }}>
          <View style={{ flex: 1, backgroundColor: "#e0e0e0", flexDirection: "column", width: "100%", borderRadius: 14, justifyContent: 'center', alignItems: 'center', }}>
            <Text style={styles.modalDetails}>Bill Details</Text>
            <Text style={styles.modalText}>Account Number: {accountNumber} </Text>

            <FlatList
              data={tempData.slice(tempData.length<=2?0:tempData.length-3,tempData.length)}
              keyExtractor={(key) => key.id}
              renderItem={(item) => {
                return (
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.modalText}> Id: {item.item.id} </Text>
                    <Text style={styles.modalText}> Unit Usage: {item.item.unit} </Text>
                    <Text style={styles.modalText}> Bill Price: {item.item.unitCost}$ </Text>
                  </View>
                )

              }}
            />

            <Text style={styles.modalText}> Unit Usage: {unitsNumber} </Text>
            <Text style={styles.modalText}> Bill Price: {billPrice}$ </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={{ fontSize: 24, color: "white", textAlign: 'center', }}>Hide Details</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Text style={styles.barText} >Generic Eletrical Energy Cost Calculator</Text>
      <View style={styles.topContainer}>
        <View style={styles.isletmeNoContainer}>
          <TextInput
            style={styles.isletmeNoText}
            onChangeText={setAccountNumber}
            value={accountNumber}
            maxLength={10}
            keyboardType="phone-pad"
          />
        </View>
        <View style={styles.sayacDegeriContainer}>
          <TextInput
            style={styles.sayacDegeriText}
            onChangeText={setUnitsNumber}
            value={unitsNumber}
            keyboardType="phone-pad"
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
          style={styles.calButton}
            onPress={() => costCalc(accountNumber, unitsNumber, tempUnits)}
             ><Text style={{textAlign:'center',color:'black' , fontSize:16}}>Calculate</Text></TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>

  );


}

const styles = StyleSheet.create({
  barContainer: {
    textAlign: 'center',
    flex: 1,
    backgroundColor: '#f5f5f5',
    flexDirection: 'column',
    padding: 15,
    alignContent: "center",
    justifyContent: "center",

  },
  isletmeNoContainer: {
    flex: 0.2,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  sayacDegeriContainer: {
    flex: 0.2,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 0.2,
    flexDirection: 'column',
    backgroundColor: 'transparent',
    justifyContent: 'center',

  },
  topContainer: {
    flex: 0.5,
    flexDirection: 'column',

  },
  barText: {
    fontSize: 32,
    alignSelf: 'center',
    textAlign: 'center',
    color: '#424242',
    marginBottom: 5,


  },
  isletmeNoText: {
    backgroundColor:'#e0e0e0' , 
    borderColor: 'black',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 30,
    width: '80%',
    alignSelf: 'center',
  },
  sayacDegeriText: {
    borderColor: 'black',
    borderWidth: 1,
    borderStyle: 'solid',
    backgroundColor:'#e0e0e0',
    borderRadius: 30,
    width: '80%',
    alignSelf: 'center',
    
  },
  modalDetails: {
    fontSize: 38,
    color: 'black',
    textAlign: 'center',
    marginVertical: 15,
  },
  modalText: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 5,
  },
  button: {
    marginTop: 15,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: '50%',
    alignSelf: 'center',
    marginBottom: 15,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  calButton:{
    borderColor:'#bdbdbd',
    borderWidth: 1,
    borderRadius: 20,
    width: '80%',
    height: 50,
    alignSelf: 'center',
    flexDirection:'column',
    justifyContent:'center',
    backgroundColor: '#e0e0e0',
  },

});