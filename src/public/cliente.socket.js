const socket = io()

const formMessage = document.querySelector('#formMessage')
const usernameInput = document.querySelector('#usernameInput')
const messageInput = document.querySelector('#messageInput')
const messagePool = document.querySelector('#messagePool')

async function renderProducts(products) {
  const response = await fetch('/plantilla.hbs')
  const plantilla = await response.text()

  products.forEach(product => {
      const template = Handlebars.compile(plantilla)
      const html = template(product)
      document.querySelector('#producto').innerHTML += html
      document.querySelector('#precio').innerHTML += html
      document.querySelector('#thumbnail').innerHTML += html
  })
}

socket.on('chat:mensaje' , products =>{
  renderProducts(products)


})


formMessage.addEventListener('submit', event =>{
   event.preventDefault()
    
   const username = usernameInput.value
   const message = messageInput.value
   const hours = new Date()
 const fecha = ([hours.getDate(),hours.getMonth(),hours.getFullYear()] )
 const time = ([hours.getHours(), hours.getMinutes()])
 const resultado = fecha.join("/")
 
   
  
   
   socket.emit('cliente:mensaje', {username,message,resultado,time })
})


socket.on('server:mensaje', data =>{
messagePool.innerHTML =""

data.forEach(message =>{
messagePool.innerHTML += `<h2>  <b style= 'color: blue'> ${message.username}:  <b style= 'color: red'> [${message.resultado}]:  [${message.time}]:  <b style= 'color: green'> ${message.message} </h2>`

})


})