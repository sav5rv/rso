### Passo 1: Criar a Estrutura de Pastas

1. Navegue até o diretório onde estão as pastas "front" e "back".
2. Crie a pasta "back" se ela ainda não existir.

```bash
mkdir back
cd back
```

### Passo 2: Inicializar o Projeto Node.js

1. Inicialize um novo projeto Node.js:

```bash
npm init -y
```

Isso criará um arquivo `package.json` com as configurações padrão.

### Passo 3: Instalar Dependências

1. Instale o Express e o Mongoose (para interagir com o MongoDB):

```bash
npm install express mongoose dotenv nodemon cors path
```

- `express`: Framework web para Node.js.
- `mongoose`: Biblioteca para modelar dados do MongoDB.
- `dotenv`: Para gerenciar variáveis de ambiente.

### Passo 4: Criar a Estrutura de Arquivos

1. Crie um arquivo chamado `app.js` na pasta "back":

```bash
touch app.js
```

2. Crie uma pasta chamada `models` para armazenar os modelos do MongoDB:

```bash
mkdir models
```

### Passo 5: Configurar o Servidor Express

Abra o arquivo `app.js` e adicione o seguinte código:

```javascript
// app.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Conectar ao MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB conectado'))
    .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Rota de teste
app.get('/', (req, res) => {
    res.send('API está funcionando!');
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
```

### Passo 6: Configurar Variáveis de Ambiente

1. Crie um arquivo `.env` na pasta "back":

```bash
touch .env
```

2. Adicione a seguinte linha ao arquivo `.env` (substitua `<your_mongodb_connection_string>` pela sua string de conexão do MongoDB):

```
MONGODB_URI=<your_mongodb_connection_string>
```

### Passo 7: Testar o Servidor

1. Inicie o servidor:

```bash
node app.js
```

2. Abra o navegador e acesse `http://localhost:5000`. Você deve ver a mensagem "API está funcionando!".

### Passo 8: Criar um Modelo MongoDB (Opcional)

Se você quiser criar um modelo para usuários, por exemplo, crie um arquivo chamado `User.js` na pasta `models`:

```javascript
// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    celular: { type: String, required: true },
    dataNascimento: { type: Date, required: true },
    senha: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);
```

### Conclusão

Agora você tem um projeto Node.js básico configurado com Express e MongoDB. Você pode expandir isso adicionando rotas, controladores e lógica de negócios conforme necessário.