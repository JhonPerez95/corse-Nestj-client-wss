import './style.css'
import { connectToServer } from './socket-client'
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div>
  <h2>Websocket - client</h2>
  
  <input type="text" id="token-input" placeholder=" Send JWT"/>
  <button id="connect-btn">Connected</button>

  <br/>
  <hr/>
  <span id="server-status">offline</span>

  <ul id="clients-ul">
  </ul>

  <form id="message-form">
    <input type="text" id="message-input" />
  </form>

  <h3>Messages</h3>
  <ul id="messages-ul">
  </ul>
</div>
`

const tokenInput = document.querySelector<HTMLInputElement>('#token-input')!
const connectBtn = document.querySelector<HTMLButtonElement>('#connect-btn')!

connectBtn?.addEventListener('click', (e) => {
  e.preventDefault()
  console.log(tokenInput.value)
  // connectToServer(tokenInput?.value)
  if (!tokenInput.value.trim().length) return alert('Token is required')

  connectToServer(tokenInput.value.trim())
  tokenInput.value = ''
})

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
