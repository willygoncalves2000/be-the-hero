import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Incidents () {
  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  function navigateToDetail(incident) {
    //chama a outra rota e passa informações como parametro
    //nome entre parentese deve ser igual ao nome da rota criada em routes.js
    navigation.navigate('Detail', { incident });
  }

  async function loadIncidents() {
    if (loading) {
      return;
    }

    //verifica se carregou a primeira página, e se todas já foram carregadas
    if (total > 0 && incidents.length === total){
      return;
    } 

    setLoading(true);
    
    const response = await api.get('incidents', {
      params: { page }
    });

    //anexa dois vetores dentro de um único vetor
    setIncidents([...incidents, ...response.data]);
    setTotal(response.headers['x-total-count']);
    setPage(page + 1);
    setLoading(false);
  }
  useEffect(() => {
    loadIncidents();
  }, []);

  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} casos</Text>
        </Text>
      </View>

      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

      {/* lista os casos */}
      <FlatList 
        data={incidents}
        style={styles.incidentList}
        // cria um identificador para cara item listado
        keyExtractor={incident => String(incident.id)}
        // remove a aparencia do scroll
        showsVerticalScrollIndicator={true}

        //dispara a função quando o usuário chega no final da lista
        onEndReached={loadIncidents}
        //quantos porcento do final da lista atual o usuário precisa estar para que mais itens sejam carregados
        onEndReachedThreshold={0.2}
        renderItem={({ item: incident}) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG:</Text>
            <Text style={styles.incidentValue}>{incident.name}</Text>

            <Text style={styles.incidentProperty}>CASO:</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>

            <Text style={styles.incidentProperty}>VALOR:</Text>
            <Text style={styles.incidentValue}>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL' 
              }).format(incident.value)}</Text>

            <TouchableOpacity 
              style={styles.detailsButton} 
              onPress={() => navigateToDetail(incident)}
            >
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={16} color='#E02041'/>
            </TouchableOpacity>
        </View>
        )}
      />
    </View>
  );
}