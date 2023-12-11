import express from "express";
import cors from 'cors'
const app = express()
app.use(cors())
const namesArray = [
  { nome: "Pedro", took: false },
  { nome: "Ana Flavia", took: false },
  { nome: "Tia Wan", took: false },
  { nome: "Tio Paulo", took: false },
  { nome: "Paula", took: false },
  { nome: "Vovó Sina", took: false },
  { nome: "Tia Mila", took: false },
  { nome: "Laura", took: false },
  { nome: "Luisa", took: false }
];
const participants = [
  { nome: "Pedro", took: false },
  { nome: "Ana Flavia", took: false },
  { nome: "Tia Wan", took: false },
  { nome: "Tio Paulo", took: false },
  { nome: "Paula", took: false },
  { nome: "Vovó Sina", took: false },
  { nome: "Tia Mila", took: false },
  { nome: "Laura", took: false },
  { nome: "Luisa", took: false }
];

function getRandomName(user) {
  const availableNames = namesArray.filter(item => !item.took && item.nome !== user);
  if (availableNames.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * availableNames.length);
  return {
    name: availableNames[randomIndex].nome,
    index: namesArray.findIndex(item => item.nome === availableNames[randomIndex].nome)
  };
}

const sortearNome = (user) => {
  const result = getRandomName(user);

  if (!result) {
    return null;
  }

  const { name, index } = result;
  namesArray[index].took = true;
  return name;
}

app.get("/sortear/:user", (req, res) => {
  const { user } = req.params;
  const idx = participants.findIndex(item => user === item.nome);

  if (idx === -1) {
    return res.status(404).json("Usuário não encontrado");
  }

  if (participants[idx].took) {
    return res.status(403).json("Você já tirou o seu!");
  }

  const name = sortearNome(user);

  if (!name) {
    
    return res.status(403).json("Todos os nomes já foram sorteados");
  }

  participants[idx].took = true;

  return res.status(200).json({ name });
});
const port = 3030

app.listen(port, () => {
  console.log('Server listen on po ' + port)
})
