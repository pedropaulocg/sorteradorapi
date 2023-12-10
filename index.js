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
  { nome: "Tia Mila", took: false }
];
const participants = [
  { nome: "Pedro", took: false },
  { nome: "Ana Flavia", took: false },
  { nome: "Tia Wan", took: false },
  { nome: "Tio Paulo", took: false },
  { nome: "Paula", took: false },
  { nome: "Vovó Sina", took: false },
  { nome: "Tia Mila", took: false }
];

function getRandomName() {
  const randomIndex = Math.floor(Math.random() * namesArray.length);
  return {
    name: namesArray[randomIndex].nome,
    index: randomIndex
  };
}
const sortearNome = () => {
  const { name, index } = getRandomName()
  namesArray.splice(index, 1)
  
  return name
}

  app.get("/sortear/:user", (req, res) => {
  const {user} = req.params
  const idx = participants.findIndex(item => user == item.nome)
  if(participants[idx].took) {
    return res.status(403).json("Voce ja tirou o seu!")
  }
  namesArray.splice(idx, 1)
  const name = sortearNome()
  participants[idx].took = true
  namesArray.push({nome: user, took: false})

  return res.status(200).json({name})
})

const port = 3030

app.listen(port, () => {
  console.log('Server listen on port ' + port)
})
