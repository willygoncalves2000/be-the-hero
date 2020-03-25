import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.css'

import logoImg from '../../assets/logo.svg';
import { FiPower, FiTrash2 } from 'react-icons/fi';

export default function Profile(){
  const [incidents, setIncidents] = useState([]);
  
  //pega o nome da ong que foi armazenado no Storage
  const ongName = localStorage.getItem('ongName');
  const ongId = localStorage.getItem('ongId');

  const history = useHistory();

  // useEffect dispara alguma função em algum determinado momento do componente
  // recebe dois parametros: a função e quando ela vai ser executada
  // o segundo param é um array, sempre q esse array mudar, dispara a função
  // se o array estiver vazio, dispara somente uma vez
  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: ongId,
      }
    }).then(response => {
      setIncidents(response.data);
    })
  }, [ongId]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId,
        }
      });

      //altera o array de incidents, mantendo apenas o que possuem id diferente do que foi excluido
      setIncidents(incidents.filter(incident => incident.id !== id))
    } catch (err) {
      alert('Erro ao deletar caso, tente novamente');
    }
  }

  function handleLogout () {
    //remove os dados do localStorage
    localStorage.clear();
    //volta pra rota raiz (login)
    history.push('/');
  }

  return(
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero" />
        <span>Bem vinda, {ongName}</span>

        <Link className="button"to="/incidents/new">Cadastrar novo caso</Link>
        <button onClick={handleLogout}type="button">
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>
        
            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>
        
            <strong>VALOR:</strong>
            {/* converte o texto para moeda real */}
            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}</p>
        
            <button onClick={()=>handleDeleteIncident(incident.id)}type="button">
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}