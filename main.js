const btnLogin = document.getElementById("btnlogin");
const txtUsuario = document.getElementById("txtusuario");
const txtClave = document.getElementById("txtClave");
const recordarClave = document.getElementById("recordarClave");


function verificoDatosUsuario(data, user, clave) {
  const Resp = {
    valor: "NO",
    nombre: "",
    mail: "",
    clave: "",
  };

  if (user.length < 1) {
    alert("Por favor ingrese el mail");

    Resp.valor = "Falta Usuario";

    return Resp;
  } else if (clave.length < 1) {
    alert("Por favor ingrese la clave.");
    Resp.valor = "Falta Clave";
    return Resp;
  }

  

  let miUsuario = data.find((x) => x.mail == user);

    //console.log(miUsuario);

  if (typeof miUsuario === 'undefined') {
    
    Resp.value = "NO";
    return Resp;
  }


  if (miUsuario.clave == clave) {

    Resp.nombre=miUsuario.nombre;
    Resp.mail= miUsuario.mail;
    Resp.clave = miUsuario.clave;
    Resp.valor = "SI";


    return Resp;
  } else {

    Resp.value = "NO";
    return Resp;
  }
}

btnLogin.addEventListener("click", (e) => {
  e.preventDefault();

 

  let dato = verificoDatosUsuario(nombres, txtusuario.value, txtClave.value);
  

    if (dato == "Falta Usuario")
    {
        alert("Por favor ingrese un usuario");
        return;
    }


    if (dato == "Falta Clave")
    {
        alert("Por favor ingrese la clave");
        return;
    }



  if (dato.valor=="SI" && dato != "Falta Clave" && dato != "Falta Usuario" ) {
    console.log("Adentro");

    if (recordarClave.checked) {
        console.log ("esta chekeado", dato);
        
        datosenMemoria(dato , localStorage);
    }
    else{
        datosenMemoria(dato , sessionStorage);
    }

    window.location.href = "http://127.0.0.1:5500/jobs.html";

  } else {
    alert("Los datos ingresados no son validos.");
  }
});

function datosenMemoria(miUsuario, storage) {
  let datos = {
    nombre: miUsuario.nombre,
    clave: miUsuario.clave,
    mail: miUsuario.mail,
  };

  storage.setItem("MiUsuario", JSON.stringify(datos));
}


function logout ()
{
    localStorage.clear();
    sessionStorage.clear();
}

function buscoUsuarioenMemoria(storage)
{
    let miUsuario = JSON.parse(storage.getItem('datos'));
    return miUsuario;   
}

