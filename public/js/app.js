console.log('client side javascript')





const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message_one = document.querySelector("#message_one")
const message_two = document.querySelector("#message_two")

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    message_one.textContent = 'Loading...'
    const url = "http://localhost:3000/weather?address=" + location
    fetch(url).then((response) => {

        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
                message_one.textContent = data.error
                message_two.textContent = ""

            } else {
                console.log(data)
                message_one.textContent = data.location
                message_two.textContent = "Description - " + data.description + ". The temperature is " + data.current_temp + " degrees, but it feels like " + data.feels_like + " degrees"

            }


        })
    })
})