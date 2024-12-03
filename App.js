import React from 'react';
import { View, Button, Vibration, Alert } from 'react-native';

export default function App() {
  const handleVibration = async () => {
    try {
      // Vibra por 1 segundo (1000 ms)
      Vibration.vibrate(1000);

      // Envia a notificação para a API
      const response = await fetch('https://notificacao-fgpo.onrender.com/notify-vibration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: 'Dispositivo vibrou', 
          timestamp: new Date().toISOString() // Formato correto para a data
        }),
      });

      // Verifica se a resposta foi bem-sucedida
      if (response.ok) {
        Alert.alert('Sucesso', 'Vibração registrada no banco de dados!');
      } else {
        Alert.alert('Erro', `Falha ao registrar vibração: ${response.status}`);
      }
    } catch (error) {
      console.error('Erro ao conectar ao servidor:', error);
      Alert.alert('Erro', 'Não foi possível conectar ao servidor. Verifique sua conexão.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Vibrar" onPress={handleVibration} />
    </View>
  );
}
