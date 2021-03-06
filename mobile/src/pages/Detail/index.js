import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, Image, TouchableOpacity, ScrollView, Linking } from 'react-native';
import * as MailCompose from 'expo-mail-composer';

import logoImg from '../../assets/logo.png'

import styles from './styles';

export default function Detail () {
  const navigation = useNavigation();
  const route = useRoute();

  //recebe os dados do incident que foi clicado para ver detalhes
  const incident = route.params.incident;
  const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso "${incident.title}" com o valor de ${Intl.NumberFormat('pt-BR', { style: 'currency',currency: 'BRL' }).format(incident.value)}`;

  // voltar pra tela anterior
  function navigateBack() {
    navigation.goBack();
  }

  function sendMail() {
    MailCompose.composeAsync({
      subject: `Herói do caso: "${incident.title}"`,
      recipients: [incident.email],
      body: message,
    })
  }

  function sendWhatsapp() {
    //enviar messagem no wpp para esse numero com essa mensagem
    Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
  }

  return(
    <ScrollView showsVerticalScrollIndicator={false} >
       
       <View style={styles.container}>
        
        <View style={styles.header}>
          <Image source={logoImg} />

          <TouchableOpacity onPress={navigateBack}>
            <Feather name="arrow-left" size={28} color='#e02041'/>
          </TouchableOpacity>
        </View>
      
        <View style={styles.incident}>
          <Text style={[styles.incidentProperty, { marginTop: 0 }]}>ONG:</Text>
          <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

          <Text style={styles.incidentProperty}>CASO:</Text>
          <Text style={styles.incidentValue}>{incident.title}</Text>

          <Text style={styles.incidentProperty}>DESCRIÇÃO:</Text>
          <Text style={styles.incidentValue}>{incident.description}</Text>

          <Text style={styles.incidentProperty}>VALOR:</Text>
          <Text style={styles.incidentValue}>
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL' 
                }).format(incident.value)}</Text>

        </View>

        <View style={styles.contactBox}>
          <Text style={styles.heroTitle}>Salve o dia!</Text>
          <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>
        
          <Text style={styles.heroDescription}>Entre em contato</Text>
        
          <View style={styles.actions}>
            <TouchableOpacity onPress={sendWhatsapp}style={styles.action}>
              <Text style={styles.actionText}>WhatsApp</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={sendMail}style={styles.action}>
              <Text style={styles.actionText}>E-mail</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}