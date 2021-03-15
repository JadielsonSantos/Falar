import React, { useState, useEffect } from 'react';
import * as Linking from 'expo-linking';
import { TouchableOpacity, StatusBar, Text, View, Modal, StyleSheet} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import * as Animatable from 'react-native-animatable';
import { TextInput, Button } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Speech from 'expo-speech';
import * as Updades from 'expo-updates';
import { useFonts } from 'expo-font';
import { estilo } from "./style";

export default function Home() {
   // Variaves usadas 
  const [modalVisible, setModalVisible] = useState(false);
  const [modal, setModal] = useState(false);
  const [text, setText] = useState('Seja bem vindo, cole seu texto ai em baixo e deixe eu lê para voce...');
  // Variaves para salva no async storage 
  const [taxa, setTaxa] = useState('');
  const [rape, setRape] = useState('');
  // Variaves do async storage
  const [salvataxa, setSalvataxa] = useState();
  const [salvarape, setSalvarape] = useState();
  const [atualiza, setAtualiza] = useState();
  
  const modalProps = {
     statusBarTranslucent: false,
     hardwareAccelerated: true,
     animationType: "slide",
     visible: modalVisible,
     onRequestClose: () => {
          setModalVisible(!true);
        }
  };
  const modalapoioProps = {
     statusBarTranslucent: false,
     hardwareAccelerated: true,
     animationType: "slide",
     visible: modal,
     onRequestClose: () => {
          setModal(!true);
        }
  };
  // Funcao para quando inicia pega as variaves guardada
  useEffect(() => {
    getdados();
    setRape("");
    setTaxa("");
  },[atualiza]);
  const getdados = async () => {
    try {
      const taxasalvo = await AsyncStorage.getItem('@taxa');
      const rapesalvo = await AsyncStorage.getItem('@rape');
      if(taxasalvo !== null) {
        // value previously stored
        
      }
      setSalvataxa(parseFloat(taxasalvo));
      setSalvarape(parseFloat(rapesalvo));
    } catch(e) {
      // error reading value
      alert('erro');
    }
  };

  // Pega as variaves e guarda no AsyncStorage
  const setdados = async (ta, ra) => {
    try {
      await AsyncStorage.setItem('@taxa', ta);
      await AsyncStorage.setItem('@rape', ra);
    } catch (e) {
      // saving error
      alert('erro');
    }
  };
  
  
  // Funcao Principal, De falar
  const speak = (texto) => {
    Speech.speak(texto, {
      pitch: salvataxa,
      rate: salvarape
    });
  };
  
  
  const [loaded] = useFonts({
    Coda: require('../../assets/fonts/CodaCaption.ttf'),
  });
  
  
  return (
    <View style={estilo.container}>
      <StatusBar style="auto" />
      
      <View style={estilo.view}>
        <Text style={{
          color: "#fff",
          fontWeight: "bold"
        }}>
          FALAR
         </Text>
        <Ionicons name="settings-outline" size={24} color="white" onPress={() => { setModalVisible(true) }} />
      </View>
      <Animatable.View duration={1000} animation="fadeInUpBig" style={estilo.body}>
        <View style={{ alignItems: 'center' }}>
          <TextInput
            style={{ width: '80%' }}
            mode="outlined"
            placeholder="Digite O Texto:"
            onChangeText={text => setText(text)}
          />
          <Button icon="play" mode="contained" onPress={() => {
            speak(text)}}
            style={{ width: '80%', marginTop: 30, color: "#0054ff" }}
          >
            Falar
          </Button>
          <Button icon="stop" mode="outlined"
            onPress={() => Speech.stop()}
            style={{ marginTop: 30, width: '80%'}}
          >
            Para
          </Button>
        </View>
      </Animatable.View>

      <Modal {...modalProps}>
        <View style={{ flex: 1, backgroundColor: "#4b0182" }}>
          <View style={{flexDirection: "row", alignItems: "center",justifyContent: 'space-between'}}>
             <Ionicons name="arrow-back-outline" size={26} color="white"
               style={{
                 marginTop: 15,
                 marginBottom: 10,
                 marginLeft: 10
               }}
               onPress={() => { setModalVisible(!true) }} />
             <Ionicons name="logo-usd" size={26} color="white"
               style={{
                 marginTop: 15,
                 marginBottom: 10,
                 marginRight: 10
               }}
               onPress={() => {setModal(true) }} />
          </View>
          <Animatable.View duration={1000} animation="fadeInUpBig" style={estilo.modal}>
            <TextInput
              keyboardType='numeric'
              style={{ width: '80%', marginBottom: 40 }}
              mode="outlined"
              placeholder="Tó entre 1 ate 9:"
              onChangeText={text => setTaxa(text)}
            />
            <TextInput
              keyboardType='numeric'
              style={{ width: '80%' }}
              mode="outlined"
              placeholder="Velocidade entre 1 ate 9:"
              onChangeText={text => setRape(text)}
            />
            <Button mode="contained"
              style={{ marginTop: 30, width: '80%', color: '#0054ff' }}
              onPress={() => {
              if(taxa == "" || rape == "") {
                 alert("Preencha Os Campos Vazios");
              }else {
                setdados(taxa, rape);
                setAtualiza(!atualiza);
                setModalVisible(!true);
              };
              }}
            >
              Configurar
          </Button>
          </Animatable.View>
        </View>
      </Modal>
     
     
     <Modal {...modalapoioProps}>
        <View style={{ flex: 1}}>
          <View>
            <Text style={{color: "#000", fontFamily: 'Coda', textAlign: "center"}}>
               Seja Bem Vindo
            </Text>
            <View style={{flex: 2}}>
               <Text style={{color: "#000", fontFamily: 'Coda', textAlign: "center"}}>
               Contribui com App, para podemos cria mais com intuito de ajuda... Agradecemos sua contribuição ❤️
                  </Text>
                    <Text>
                     So segui esse link
                     </Text>
                  <Text>
                  <TouchableOpacity onPress={() => Linking.openURL('https://nubank.com.br/pagar/1bh5di/bLhALjEk8p')}
                     >
                    <Text style={{color: "#0054ff", fontWeight: "bold"}}>
                     https://nubank.com.br/doe/
                    </Text>
                    </TouchableOpacity>
                  </Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
    
  );
}