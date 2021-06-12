import { useEffect, useState } from 'react';
import LinkForm from './LinkForm';
import { db } from '../firebase';
import { toast } from 'react-toastify';

const Links = () => {

  const [tasks, setTasks] = useState([]);
  const [currentId, setCurrentId] = useState('');

  const addOrEditTask = async (task) => {
    if( currentId === '' ){
      await db.collection('tasks').doc().set(task);
      toast('Tarea agregada', {type: 'success'});
    } else {
      await db.collection('tasks').doc(currentId).update(task);
      toast('Tarea actualizada', {type: 'success'});
      setCurrentId('');
    }
  }

  const onDeleteTask = async id => {
    if(window.confirm('Estas seguro de eliminar la tarea?')){
      await db.collection('tasks').doc(id).delete()
      toast('Tarea borrada con exito', {type: 'error', autoClose: '2000'})
    }
  }

  const getTasks = async () => {
    db.collection('tasks').onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach(doc => {
        docs.push({...doc.data(), id: doc.id })
      });
      setTasks(docs);
    });
  }

  useEffect(() => {
    getTasks();
  }, [])

  return <div>
    <LinkForm {...{addOrEditTask, currentId, tasks}}/>
    <br />
    <div className="col-md-8">
      {tasks.map(task => (
        <div className="card mb-1" key={task.id}>
          <div className="card-body">
            <div className="d-flex justify-content-between">
            <h2>{ task.tarea }</h2>
              <div>
                <i 
                  className="material-icons"
                  onClick={() => setCurrentId(task.id)}
                >
                  create
                </i> 
                <i 
                  className="material-icons text-danger" 
                  onClick={() => onDeleteTask(task.id)}
                >
                  close
                </i>                            
              </div>        
            </div>
            
            <h4>{ task.proyecto }</h4>
            <p>{ task.descripcion }</p>
          </div>
        </div>
      ))}
    </div>
  </div>
}

export default Links