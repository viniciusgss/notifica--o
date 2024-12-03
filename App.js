import React from 'react';
import { View, Button, Vibration, Alert } from 'react-native';

export default function App() {
  const handleVibration = async () => {
    Vibration.vibrate(1000); // Vibra por 1 segundo
    
    // Exemplo de envio para a API
    try {
      const response = await fetch('http://localhost:3000/notify-vibration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: 'Dispositivo vibrou', timestamp: new Date() }),
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Vibração registrada no banco de dados!');
      } else {
        Alert.alert('Erro', 'Falha ao registrar vibração.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Vibrar" onPress={handleVibration} />
    </View>
  );
}
