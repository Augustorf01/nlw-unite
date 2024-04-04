// array
let participantes = [
  {
    nome: "Augusto Fonseca",
    email: "augusto@gmail.com",
    dataInscrição: new Date(2024, 3, 3, 12, 30),
    dataCheckIn: new Date(2024, 3, 6, 20, 00)
  },
  {
    nome: "Breno Alves",
    email: "breno@gmail.com",
    dataInscrição: new Date(2024, 3, 4, 12, 30),
    dataCheckIn: new Date(2024, 3, 7, 10, 30)
  },
  {
    nome: "Carla Lima",
    email: "carla@gmail.com",
    dataInscrição: new Date(2024, 3, 5, 12, 30),
    dataCheckIn: new Date(2024, 3, 8, 15, 45)
  },
  {
    nome: "Daniel Silva",
    email: "daniel@gmail.com",
    dataInscrição: new Date(2024, 3, 6, 12, 30),
    dataCheckIn: new Date(2024, 3, 9, 8, 20)
  },
  {
    nome: "Eduarda Santos",
    email: "eduarda@gmail.com",
    dataInscrição: new Date(2024, 3, 7, 12, 30),
    dataCheckIn: new Date(2024, 3, 10, 18, 10)
  },
  {
    nome: "Fernando Oliveira",
    email: "fernando@gmail.com",
    dataInscrição: new Date(2024, 3, 8, 12, 30),
    dataCheckIn: new Date(2024, 3, 11, 11, 55)
  },
  {
    nome: "Gabriela Costa",
    email: "gabriela@gmail.com",
    dataInscrição: new Date(2024, 3, 9, 12, 30),
    dataCheckIn: new Date(2024, 3, 12, 9, 40)
  },
  {
    nome: "Hugo Fernandes",
    email: "hugo@gmail.com",
    dataInscrição: new Date(2024, 3, 10, 12, 30),
    dataCheckIn: new Date(2024, 3, 13, 14, 25)
  },
  {
    nome: "Isabela Pereira",
    email: "isabela@gmail.com",
    dataInscrição: new Date(2024, 3, 11, 12, 30),
    dataCheckIn: new Date(2024, 3, 14, 16, 30)
  },
  {
    nome: "Júlio Martins",
    email: "julio@gmail.com",
    dataInscrição: new Date(2024, 3, 12, 12, 30),
    dataCheckIn: null
  }
];

const criarNovoParticipante = (participante) => {
  const dataInscrição = dayjs(Date.now()).to(participante.dataInscrição)

  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

  if(participante.dataCheckIn == null) {
    dataCheckIn = `
    <button 
    onclick="fazerCheckIn(event)" 
    data-email="${participante.email}"
    >
      Confirmar Check-in
    </button>`
    }
  return  `
  <tr>
    <td>
      <strong>
        ${participante.nome}
      </strong>
      <br>
      <small>
        ${participante.email}
      </small>
    </td>
    <td>${dataInscrição}</td>
    <td>${dataCheckIn}</td>
  </tr>`
}

const atualizarLista = (participantes) => {
  let output = ""
  // Estrutura de Repetição para iterar sobre os itens da lista- loop
  for(let participante of participantes) {
    output = output + criarNovoParticipante(participante) 
  }

  // substituir informação do html
  document.querySelector('tbody').innerHTML = output
}

atualizarLista(participantes)


/////////////////////////////////// AULA 2
const adicionarParticipante = (event) => {
  event.preventDefault()

  const formData = new FormData(event.target)

  // Objeto JavaScript - modelo de objeto para criar posteriormente criar uma lista  de objetos
  const participante = {
  nome: formData.get('nome'),
  email: formData.get('email'),
  dataInscrição: new Date(),
  dataCheckIn: null
  }

  // Verificar se o participante já existe
  const participanteExiste = participantes.find(
    (p) => p.email == participante.email
  )

    if (participanteExiste) {
      alert('Email já cadastrado!')
      return
    }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  // limpar o formulario
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
  //confirmar se realmente quer o check-in
  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'

  if(confirm(mensagemConfirmacao) == false) {
    return
  }

  // encontrar o participante dentro da lista
  const participante = participantes.find(
    (p) => p.email == event.target.dataset.email
  )

  // atualizar o check-in do participante
  participante.dataCheckIn = new Date()

  // atualizar a lista de participantes
  atualizarLista(participantes)
}