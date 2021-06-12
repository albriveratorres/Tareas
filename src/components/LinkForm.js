import { useState, useEffect } from 'react';
import { db } from '../firebase';

const LinkForm = (props) => {

  const initialStateValues = {
    tarea: '',
    proyecto: '',
    descripcion: ''
  }

  const  [values, setValues] = useState(initialStateValues);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setValues({...values, [name]: value});
  }

  const handleSubmit = e => {
    e.preventDefault();
    props.addOrEditTask(values);
    setValues({...initialStateValues})
  }

  const getTaskById = async (id) => {    
    const doc = await db.collection('tasks').doc(id).get();
    setValues({...doc.data()})
  }

  useEffect(() => {
    if(props.currentId === ''){
      setValues({...initialStateValues});
    } else {
      getTaskById(props.currentId);
    }
  }, [props.currentId]); 

  return (
    <form className="card card-body" onSubmit={handleSubmit}>
      <div className="form-group input-group">
          <div className="input-group-text bg-ligth">
          <i className="material-icons">dehaze</i>
          </div>
        <input 
          type="text"
          className="form-control" 
          placeholder="Tarea" 
          name="tarea"
          onChange={handleInputChange}
          value={values.tarea}
        />
      </div>
      <br />

      <div className="form-group input-group">
        <div className="input-group-text bg-ligth">
          <i className="material-icons">create</i>
        </div>
        <input 
          type="text"
          className="form-control" 
          placeholder="Proyecto" 
          name="proyecto"
          onChange={handleInputChange}
          value={values.proyecto}
        />
      </div>
      <br />
      <div className="form-group" >
        <textarea 
          name="descripcion" 
          rows="3" 
          className="form-control" 
          placeholder="Reporte de la tarea"
          onChange={handleInputChange}
          value={values.descripcion}
        />
      </div>
      <br />
      <button className="btn btn-primary btn-block">
        {props.currentId === '' ? 'Guardar' : 'Actualizar' }
      </button>
    </form>
  )
}

export default LinkForm;