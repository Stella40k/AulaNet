const form = document.getElementById("formulario");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const nombre = document.getElementById("nombre").value;
      const apellido = document.getElementById("apellido").value;
      const email = document.getElementById("email").value;
      const contraseña = document.getElementById("contraseña").value;
      const role = document.getElementById("role").value;
      const genero = document.getElementById("genero").value;
      const dni = document.getElementById("dni").value;
      const domicilio = document.getElementById("domicilio").value;
      const traslado = document.getElementById("traslado").value;
      const año = document.getElementById("año").value;
      const curso = document.getElementById("curso").value;
      const telefono = document.getElementById("telefono").value;
      try {
        const res = await fetch("http://localhost:3000/api/user/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ nombre, apellido, email,contraseña, role,
            genero, dni, domicilio, traslado, año, curso, telefono, 
           })
        });

        const data = await res.json();
        if(!data){

            console.log("no hay datos")
        }
        if (data.ok) {
          alert("Usuario creado correctamente");
        } else {
          alert("Error: " + data.error);
        }

      } catch (err) {
        console.error(err);
        alert("Error en la conexión con el servidor");
      }
    });
