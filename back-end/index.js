const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Para trabalhar com JSON

// Conectar ao MongoDB
mongoose.connect('mongodb+srv://root:root@cluster0.owyiz.mongodb.net/notificacao?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado ao MongoDB!'))
.catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Importar o modelo Notification
const Notification = require('./notification');

// Rota para registrar vibração
app.post('/notify-vibration', async (req, res) => {
  const { message, timestamp } = req.body;

  try {
    const newNotification = new Notification({ message, timestamp });
    await newNotification.save();
    res.status(200).send('Vibração registrada com sucesso!');
  } catch (error) {
    console.error('Erro ao salvar notificação:', error);
    res.status(500).send('Erro ao registrar vibração.');
  }
});

// Rota para listar as notificações (opcional)
app.get('/notifications', async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).send('Erro ao buscar notificações.');
  }
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
