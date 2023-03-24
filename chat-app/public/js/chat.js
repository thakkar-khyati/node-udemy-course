const socket=io()
const form = document.querySelector('#formData')
const input = form.querySelector('input')
const button = form.querySelector('button')
const locationBtn = document.querySelector('#send-location')
const messages = document.querySelector('#messages')

const messageTemplate = document.querySelector('#message-template').innerHTML
const locationTemplate = document.querySelector('#location-template').innerHTML
const sidebarTemplete = document.querySelector('#sidebar-templete').innerHTML

const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })

const autoScroll = ()=>{
    
    // //new message element
    // const newMessage = messages.lastElementChild

    // //Height of the new message
    // const newMessageStyles = getComputedStyle(newMessage)
    // const newMessageMargin = parseInt(newMessageStyles.marginBottom)
    // const newMessageHeight = newMessage.offsetHeight + newMessageMargin

    // //visible height
    // const visibleHeight = messages/offsetHeight

    // //height of messages container
    // const containerHeight = messages.scrollHeight

    // //how far have i scrolled
    // const scrollOffSet = messages.scrollTop +visibleHeight

    // if(containerHeight - newMessageHeight<= scrollOffSet){
    //     messages.scrollTop = messages.scrollHeight
    // }

    const $newMessage = messages.lastElementChild

    // Height of the new message
    const newMessageStyles = getComputedStyle($newMessage)
    const newMessageMargin = parseInt(newMessageStyles.marginBottom)
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin

    // Visible height
    const visibleHeight = messages.offsetHeight

    // Height of messages container
    const containerHeight = messages.scrollHeight

    // How far have I scrolled?
    const scrollOffset = messages.scrollTop + visibleHeight

    if (containerHeight - newMessageHeight <= scrollOffset) {
        messages.scrollTop = messages.scrollHeight
    }

}


socket.on('message',(msg)=>{
    
    const html = Mustache.render(messageTemplate,{
        username:msg.username,
        message:msg.text,
        createdAt:moment(msg.createdAt).format('h:mm a')
    })
    messages.insertAdjacentHTML('beforeend',html)
    autoScroll()
})

socket.on('locationMessage',(url)=>{
    console.log(url)
    const html = Mustache.render(locationTemplate,{
        username:url.username,
        url:url.url,
        createdAt:moment(url.createdAt).format('h:mm a')
    })
    messages.insertAdjacentHTML('beforeend',html)
    autoScroll()
})

socket.on('roomData',({room,users})=>{
    const html = Mustache.render(sidebarTemplete,{
        room,
        users
    })
    document.querySelector('#sidebar').innerHTML = html
})

form.addEventListener("submit",(e)=>{

    e.preventDefault()
    form.setAttribute('disabled','disabled')
    const msg = e.target.elements.message.value
    socket.emit('sendMessage',msg,(callback)=>{
        form.removeAttribute('disabled')
        input.value = ''
        input.focus()
        console.log(callback)
        //console.log('Message delivered')
    })
})

locationBtn.addEventListener('click',()=>{
    if(!navigator.geolocation){
        return alert('geolocation is not supported')
    }

    locationBtn.setAttribute('disabled','disabled')
    navigator.geolocation.getCurrentPosition((position)=>{
        console.log(position)

        socket.emit('sendLocation',{ latitude: position.coords.latitude, longitude: position.coords.longitude},()=>{
            locationBtn.removeAttribute('disabled')
            console.log("location Sent")
        })
    })
})

socket.emit('join', {username, room},(error)=>{
    if(error){
        alert(error)
        location.href ='/'
    }
})

// socket.on('countUpdated',(count)=>{
//     console.log("count is updated! ",count)
// })

// document.getElementById("increment").addEventListener("click",()=>{
//     console.log("printing click")
//     socket.emit('increment')
// })