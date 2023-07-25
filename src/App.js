import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {

  //estado para lo que hay dentro del input 
  const [sentencia, setSentencia] = useState('')
  //estado para actualizar el text area
  const [text, setText] = useState('')
  //estado para el objeto del backend
  const [respuesta, setRespuesta] = useState('')
  const [tokens, setTokens] = useState(false)
  const [sintaxis, setSintaxis] = useState(false)
  const [semantica, setSemantica] = useState(false)
  const [traduccion, setTraduccion] = useState('')
  //Variable para cambiar el backend
  const URI = process.env.REACT_APP_URI;
  //estado para la respuesta del backend
  const [respuestaBackend, setRespuestaBackend] = useState(null); 

  const handleInputChange = (event) => {
    setSentencia(event.target.value);
  };


  const traducir = async () => {
    const res = await fetch(`${URI}/`,{
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        sentencia
      })
    })
    const data = await res.json()
    setRespuesta(data)
    setTokens(data[0])
    setSintaxis(data[1])
    setSemantica(data[2])
    setTraduccion(data[3])

    // if(data[3]!="No disponible"){
    //   setText(sentencia)
    // }
    
    console.log(data)
    


    //Código para hacer el proceso de post para el backend
    //descomentar para su uso

    // try {
    //   const response = await axios.post(url, { text });
    //   console.log('Respuesta del backend:', response.data);
    //   setRespuestaBackend(response.data); // Guarda la respuesta en el estado
    // } catch (error) {
    //   console.error('Error al enviar la sentencia:', error);
    // }

  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Traductor inglés a español presente simple</h1>
        <div className="centered-container">
          <h3>Estructura correcta de las oraciones</h3>
          <h6>Affirmative → Sujeto + Verbo + Complemento </h6>
          <h6>Negative → Sujeto + Negacion + Verbo + Complemento</h6>
          <h6>Question → Verbo auxiliar + Sujeto + Verbo + Complemento</h6>
          <div className="custom-search">
            <input 
              type="text" 
              className="custom-search-input" 
              placeholder="Escribe una oración"
              value={sentencia}
              onChange={handleInputChange}
            />
            <button 
              className="custom-search-button" 
              type="submit"
              onClick={traducir}
            > 
              Traducir
            </button>  
          </div>
          <textarea 
            className='custom-textarea'
            rows={2}
            readOnly
            value={traduccion}
          />

          {
            tokens ? (
              <div  className="centrado">
                <hr />
                <table>
                  <thead>
                    <tr>
                      <th>Tipo de palabra</th>
                      <th>palabra</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tokens.map((lista, index) => (
                      <tr key={index}>
                        <td>{lista[1]}</td>
                        <td>{lista[0]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div> 
            ) : (
              <h3></h3>
            )


          }

          {

            sintaxis ? (

              <div>
              <hr />
              <h2>{sintaxis}</h2>
              </div> 

            ) : (
              <h3></h3>
            )

          }

          {

          semantica ? (

            <div>
            <hr />
            <h2>{semantica}</h2>
            </div> 

          ) : (
            <h3></h3>
          )

          }


        </div>
      </header>
    </div>
  );
}

export default App;
