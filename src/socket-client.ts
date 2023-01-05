import { Manager, Socket } from 'socket.io-client'

let socket: Socket
export const connectToServer = (token: string) => {
  const manager = new Manager('http://localhost:3000/socket.io/socket.io.js', {
    extraHeaders: {
      Authorization: token,
    },
  })
  socket?.removeAllListeners()
  socket = manager.socket('/')
  addListeners()
}

const addListeners = () => {
  const clientsUl = document.querySelector('#clients-ul')!
  const messageForm = document.querySelector<HTMLFormElement>('#message-form')!
  const messageInput =
    document.querySelector<HTMLInputElement>('#message-input')!
  const messagesUl = document.querySelector<HTMLUListElement>('#messages-ul')!
  const serverStatusLabel = document.querySelector('#server-status')!

  socket.on('connect', () => {
    serverStatusLabel.innerHTML = 'connected'
  })

  socket.on('disconnect', () => {
    serverStatusLabel.innerHTML = 'disconnect'
  })

  socket.on('clients-updated', (clients: string[]) => {
    let listClient = ''
    clients.forEach((client) => {
      listClient += `<li>${client}</li>`
    })

    clientsUl.innerHTML = listClient
  })

  //  Form
  messageForm.addEventListener('submit', (e) => {
    e.preventDefault()
    if (!messageInput.value.trim().length) return

    socket.emit('message-client', {
      id: socket.id,
      message: messageInput.value,
    })
    messageInput.value = ''
  })

  socket.on('message-server', (data: { fullName: string; message: string }) => {
    let newMessage = `<li>
      <strong>${data.fullName}</strong>
      <span>${data.message}</span>
     </li>`

    const li = document.createElement('li')
    li.innerHTML = newMessage
    messagesUl.appendChild(li)
  })
}
