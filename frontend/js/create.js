document.addEventListener('DOMContentLoaded', () => {
    const buttonJS = document.getElementById('button')

    buttonJS.addEventListener('click', (e) => {
        e.preventDefault()
        let usernameJS = document.getElementById('username').value
        let passwordJS = document.getElementById('password').value
        let first_nameJS = document.getElementById('first_name').value
        let role = "user"

        let dataFilter = {first_name:first_nameJS, email:usernameJS, password:passwordJS, role:role};
        
        if(usernameJS && passwordJS && first_nameJS) {
            fetch("http://localhost:3000/create", {
                method: "Post",
                body: JSON.stringify(dataFilter),
                headers: {
                "Content-type": "application/json; charset=UTF-8",
                }
            })
                .then((response) => response.json())
                .then((json) => console.log(json));
                alert("Usuario creado correctamente")
                //TODO redireccionar a la página principal
        } else {
            alert("Debe llenar todos los datos")
        }
    })
})