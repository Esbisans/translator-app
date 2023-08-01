import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {

  const objeto = {
    "tokens":{
      "correct": true,
      "response": [
      ["i","pronombre"],
      ["run","verbo"],
      ["the","determinante"]
    ],
    },
    "sintaxis":{
      "correct":true,
      "response":"Sin errores sintacticos"
    },
    "semantica":{
      "correct":false,
      "response":"Error sintactico"
    },
    "traduccion":{
      "correct":true,
      "response":"Estoy en el parque con mis sobrinos"
    }
    }

  //estado para lo que hay dentro del input 
  const [sentencia, setSentencia] = useState('')
  //estado para actualizar el text area
  const [text, setText] = useState('')
  //estado para el objeto del backend
  const [respuesta, setRespuesta] = useState(false)
  const [tokens, setTokens] = useState(false)
  const [sintaxis, setSintaxis] = useState(false)
  const [semantica, setSemantica] = useState(false)
  const [traduccion, setTraduccion] = useState('')
  //Variable para cambiar el backend
  const URI = process.env.REACT_APP_URI;
  //estado para la respuesta del backend
  //const [respuestaBackend, setRespuestaBackend] = useState(null); 

  const [utterance, setUtterance] = useState(null);

  const handleInputChange = (event) => {
    setSentencia(event.target.value);
  };

  const handleTextAreaChange = (event) => {
    setText(event.target.value);
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
    setTokens(data.tokens)
    setSintaxis(data.sintaxis)
    setSemantica(data.semantica)
    setTraduccion(data.traduccion)
    setText(data.traduccion.response)
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

  const traducirTest = () => {
    setRespuesta(objeto)
    setTokens(objeto.tokens)
    setSintaxis(objeto.sintaxis)
    setSemantica(objeto.semantica)
    setTraduccion(objeto.traduccion)
    setText(objeto.traduccion.response)
  }

  const handlePlaySpanish = () => {

    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);

    setUtterance(u);
    synth.speak(u);
    console.log(text)
  }

  const handlePlayEnglish = () => {

    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(sentencia);

    // Configurar el idioma del audio a inglés
    u.lang = 'en';

    setUtterance(u);
    synth.speak(u);

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
          {/* <div className="custom-search">
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
              onClick={traducirTest}
            > 
              Traducir
            </button>  
          </div> */}
          <div className="input-group input-group-lg my-5">
            <button className="btn btn-outline-light" 
              type="button" 
              id="button-addon1"
              onClick={handlePlayEnglish}
            >
              <i 
                className="bi bi-volume-down-fill"
              ></i>
            </button>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Escriba una oración" 
              aria-label="Escriba una oración" 
              aria-describedby="button-addon2"
              value={sentencia}
              onChange={handleInputChange}
            />
            <button 
              className="btn btn-outline-primary" 
              type="button" 
              id="button-addon2"
              onClick={traducirTest}
            > 
              Traducir
            </button>
          </div>
          <div className="form-floating mb-3">
            <textarea
              className="form-control" 
              id="floatingTextarea"
              value={text}
              onChange={handleTextAreaChange}
              placeholder="Traducción"
              style={{fontSize: "1.6rem", height: 100, paddingTop: 40}}
              readOnly

            />
            <label for="floatingTextarea">Traducción</label>
            {
              traduccion.correct ? (
                <button
                  className="btn btn-transparent position-absolute top-0 end-0"
                  onClick={handlePlaySpanish}
                >
                  <i 
                    className="bi bi-volume-down"
                    style={{fontSize: 30 , color: 'purple' }}
                  ></i>
                </button>
              ) : (
                null
              )
            }

          </div>
          {/* <textarea 
            className='custom-textarea'
            rows={2}
            readOnly
            
          /> */}

        </div>
        
        {
        respuesta ? (

          <div className='container col-8 mt-4 mb-4'>

            <div className="accordion" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                    {
                      tokens.correct ? (    
                        <button id='accordion-button-ok' className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                          <div>
                            <i 
                              className="bi bi-check-circle" 
                              style={{fontSize: 30 }}
                            ></i>
                            <span className="ms-2">Analizador léxico</span>
                          </div>
                        </button>
                      ) : (
                        <button id='accordion-button-nok' className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                          <div>
                            <i 
                              className="bi bi-x-circle" 
                              style={{fontSize: 30 }}
                            ></i>
                            <span className="ms-2">Analizador léxico</span>
                          </div>
                        </button>
                      )
                    }
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th scope="col">Tipo</th>
                          <th scope="col">Palabra</th>
                        </tr>
                      </thead>
                        <tbody>
                          {tokens.response.map((lista, index) => (
                            <tr key={index}>
                              <td>{lista[1]}</td>
                              <td>{lista[0]}</td>
                            </tr>
                          ))}
                        </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingTwo">
                  {
                    sintaxis.correct ? (    
                      <>
                        <button id='accordion-button-ok' className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                          <div>
                            <i 
                              className="bi bi-check-circle" 
                              style={{fontSize: 30 }}
                            ></i>
                            <span className="ms-2">Analizador sintáctico</span>
                          </div>
                        </button>
                        <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                          <div className="accordion-body">
                            <span>{sintaxis.response}</span>
                          </div>
                        </div>
                      </>
                      
                    ) : (
                      <>
                        <button id='accordion-button-nok' className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                          <div>
                          <i 
                              className="bi bi-x-circle" 
                              style={{fontSize: 30 }}
                            ></i>
                            <span className="ms-2">Analizador sintáctico</span>
                          </div>
                        </button> 
                        <div id="collapseTwo" className="accordion-collapse collapse show" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                          <div className="accordion-body">
                            <span>{sintaxis.response}</span>
                          </div>
                        </div>
                      </>
                    )
                  }
                </h2>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingThree">
                {
                  semantica.correct ? (  
                    <>
                      <button id='accordion-button-ok' className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        <div>
                          <i 
                            className="bi bi-check-circle" 
                            style={{fontSize: 30 }}
                          ></i>
                          <span className="ms-2">Analizador semántico</span>
                        </div>
                      </button>
                      <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                          <span>{semantica.response}</span>
                        </div>
                      </div>
                    </>  
                  ) : (
                    <>
                      <button id='accordion-button-nok' className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        <div>
                          <i 
                            className="bi bi-x-circle" 
                            style={{fontSize: 30 }}
                          ></i>
                          <span className="ms-2">Analizador semántico</span>
                        </div>
                      </button>
                      <div id="collapseThree" className="accordion-collapse collapse show" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                          <span>{semantica.response}</span>
                        </div>
                      </div>
                    </>
                  )
                }
                </h2>
              </div>
            </div>
          </div>

        ) : (
          <hr />
        )
        }
      </header>

    </div>
  );
}

export default App;
