import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {

  //estado para lo que hay dentro del input 
  const [sentencia, setSentencia] = useState('')
  //estado para actualizar el text area
  const [text, setText] = useState('')
  //Variable para cambiar el backend
  const url = 'http://localhost:8000/ruta-del-backend'
  //estado para la respuesta del backend
  const [respuestaBackend, setRespuestaBackend] = useState(null); 

  const handleInputChange = (event) => {
    setSentencia(event.target.value);
  };


  const traducir = async () => {
    setText(sentencia)
    


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
        <h1>Traductor inglés a español</h1>
        <div className="centered-container">
          <p>Contenido del contenedor centrado.</p>
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
            rows={6}
            readOnly
            value={text}
          />
        </div>
      </header>
    </div>
  );
}

export default App;
