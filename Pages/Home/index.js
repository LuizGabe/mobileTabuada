import React, { useState } from "react";
import { View, Text, Button, TextInput, ImageBackground } from "react-native";
import { NavigationContainer } from '@react-navigation/native';

import { validarResposta, gerarNumero } from "../../utils/Home.modules";

import styles from './Home.style';
import backImg from '../../assets/fundo.png';

const TelaInicio = (props) => {
  const [ primeiroNumero, setPrimeiroNumero ] = useState(1);
  const [ segundoNumero, setSegundoNumero ] = useState(1);
  const [ respostaUsuario, setRespostaUsuario ] = useState(0);
  
  const criarQuestao = () => {
    setPrimeiroNumero(gerarNumero());
    setSegundoNumero(gerarNumero());
    setRespostaUsuario("");
  }

  const responder = () => {
    if ( validarResposta(primeiroNumero, segundoNumero, respostaUsuario) ) {
      props.navigation.navigate('RespostaCorreta');
    } else {
      props.navigation.navigate('RespostaErrada', {
        resposta: (primeiroNumero * segundoNumero)
      });
    }
    criarQuestao();
  }

  return (
    <ImageBackground source={backImg} style={styles.imagemFundo}>
      <View style={styles.tela}>
        <View style={styles.boxPergunta}>
          <Text style={styles.titulo}>
            Duvido você acertar!
          </Text>

          <View style={styles.boxQuestao}>
            <Text style={styles.texto}>            
              { primeiroNumero }
            </Text>

            <Text style={styles.texto}>
              X
            </Text>

            <Text style={styles.texto}>            
              { segundoNumero }
            </Text>

            <Text style={styles.texto}>
              =
            </Text>

            <TextInput 
              textAlign="center"
              onChangeText={ setRespostaUsuario } 
              keyboardType="numeric" 
              value={respostaUsuario.toString()} 
              autoFocus={true}
              maxLength={3} 
              style = { styles.input }/>
          </View>

          <View style={styles.opcoes}>
            

            <View style={styles.boxBotao}>
              <Button title="Responder" onPress={responder} color="#a0df52"/>
            </View>
          </View>

        </View>

        <View style={styles.boxBotaoTabuada}>
          <Button title="Ver tabuada" onPress={() => props.navigation.navigate('Tabuada')} color="#1f4f66"/>
        </View>
      </View>
    </ImageBackground>
  );
}

export default TelaInicio;