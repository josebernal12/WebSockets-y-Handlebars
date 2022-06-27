require('dotenv').config()  
const express = require('express')
const app = express()
const path = require('path')
const puerto = process.env.PORT
const { Server: IOServer } = require('socket.io') 
const expressServer = app.listen(puerto, (error) => {
    if(error) {
        console.log(error)
    } else {
        console.log(`Servidor escuchando puerto: ${puerto}`)
    }
})
const io = new IOServer(expressServer)
const messages = []
const product = []

app.use(express.static(path.join(__dirname, '/public')))


io.on('connection', socket => {
    console.log('Se conecto un usuario:', socket.id)
    io.emit('server:mensaje', messages)


     socket.on('chat:mensaje',products =>{
      product.push(products)
      io.emit('server:chat', product)

     })

    socket.on('cliente:mensaje', message => {
        messages.push(message)
        io.emit('server:mensaje', messages)
    })

})
