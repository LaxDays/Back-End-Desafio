document.addEventListener('DOMContentLoaded', () => {
    const buttonJS = document.getElementById('button')
    
    buttonJS.addEventListener('click', (e) => {
        e.preventDefault()
        let usernameJS = document.getElementById('username').value
        let passwordJS = document.getElementById('password').value
        
        let dataFilter = {email:usernameJS, password:passwordJS};

        console.log(dataFilter)
        try {
            if(usernameJS && passwordJS) {
                fetch("http://localhost:3000/login", {
                    method: "Post",
                    body: JSON.stringify(dataFilter),
                    headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    }
                })
                    .then((response) => response.json())
                    .then((json) => console.log(json))
                    //TODO LOGIN ALERT 
            } else {
                alert("Debe llenar todos los datos")
            }
        } catch (error) {
            alert("La contraseña o correo son incorrectos")
        }
        
    })
})