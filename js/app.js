

//declaracion de variables y expresiones regulares
const btnEnviar = document.querySelector('#enviar');
const nombre = document.querySelector('#nombre');
const apellido = document.querySelector('#apellido');
const cedula = document.querySelector('#cedula');
const direccion = document.querySelector('#direccion');
const correo = document.querySelector('#correo');
const celular = document.querySelector('#celular');
const regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
const regex2 = /^\d{8}$/;


//elementos a esconder app

const seccionPrincipal = document.querySelector('#principal');
const Spinner = document.querySelector('#spinner');

eventListeners();

// inicio de la app

 function eventListeners(){
     
   
    spinner.style.display = 'none';

     document.addEventListener('DOMContentLoaded',iniciarApp);
     

 
     celular.addEventListener('input',ValidarCelular);
     nombre.addEventListener('input',ValidarNombre);
     apellido.addEventListener('input',ValidarNombre);
     correo.addEventListener('input',ValidarCorreo);

     
     
     btnEnviar.addEventListener('click',enviarformulario)
     

    }
    
    
 function iniciarApp(e){
    
    console.log(btnEnviar);
    btnEnviar.disabled = true;

}


async function   enviarformulario   (e){
    e.preventDefault();
    
    const  solicitud = {

        celular:celular.value,
        nombre:nombre.value,
        Apellido:apellido.value,
        correo:correo.value,
        cedula:cedula.value

    
    }

    try {
        console.log(seccionPrincipal);
        seccionPrincipal.style.display = 'none';
        spinner.style.display = 'block';
        const data = await RealizarPeticion(solicitud);
        
        Swal.fire(
            'Buen Trabajo!',
            'Los datos se han enviados!',
            'success'
            )

            seccionPrincipal.style.display = 'block';
            spinner.style.display = 'none';

            
        } catch (error) {
            seccionPrincipal.style.display = 'block';
            spinner.style.display = 'none';
            return  Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error Consulta con el administrador!',
          })

    }

}


async function RealizarPeticion(solicitud){

    const url="https://chilibreinternet.herokuapp.com/api/solicitud";

    const solicitudPost = await fetch(url,{
    
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
                      },
        body:JSON.stringify(solicitud)

    });

    const solicitudData = await solicitudPost.json();


    if ( solicitudData.json >= 400  ){
        console.log('xd ?');

        throw Error('Error al guardar los datos') ;

    }

    return solicitudData;

}




 function ValidarCorreo(e){
    const valor = e.target.value;


      
    if (valor.length===0){
        console.log('hola');
        validarEnviar();
        return e.target.classList.remove('is-invalid')
        
    }

    if (valor.length>0){

        if (!regex.test(valor)) {
            
            console.log('invalido');
            validarEnviar();
            return e.target.classList.add('is-invalid')
            
        } else {
            
            console.log('valido');
            validarEnviar();
            return e.target.classList.remove('is-invalid')

        }
        
    }


}



function ValidarNombre(e){
    const valor = e.target.value;
    if (valor.length>0){

        
         e.target.classList.remove('is-invalid')
        
        
    }else{
        
         e.target.classList.add('is-invalid')


    }

    validarEnviar();

}

function ValidarCelular(e){
    const valor = e.target.value;
    if (valor.length>0 && regex2.test(valor) ){

        
        e.target.classList.remove('is-invalid')
       
       
   }else{
       
        e.target.classList.add('is-invalid')

        
   }
   validarEnviar();

}



function validarEnviar(){

    if (   apellido.value != '' && nombre.value != '' && regex2.test(celular.value)  ){

        if ( correo.value !='' && !regex.test(correo.value) ){
            console.log('adsx')
         return   btnEnviar.disabled = true;

        }

        btnEnviar.disabled = false;

        btnEnviar.removeAttribute("disabled");
        
        


        
    }else{

        btnEnviar.disabled = true;
    }
    

}



