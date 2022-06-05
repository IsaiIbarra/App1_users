import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Permissions from '../permissions/Permissions';
// import axios from 'axios';

const Validation = () => {
  const history = useHistory();
  const location = useLocation();

  //Validar cuando se hayan asignado los permisos a las variables de store para poder ir a Permission a redireccionar
  const [validar, setValidar] = useState(false);

  //API para validar los permisos y la sesión del usuario
  const validarSesion = () => {
    const data = {
      id_use: localStorage.getItem('id_use'),
    };

    fetch(`http://localhost:5000/validUser`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/JSON' },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.result) {
          //Save session credentials
          localStorage.setItem('email_use', resp.user.email_use);
          localStorage.setItem('name_rol', resp.user.name_rol);

          if (location.pathname == '/login') {
            history.push('/');
          }
        } else {
          localStorage.clear();
          history.push('/login');
        }
        setValidar(true);
      })
      .catch((e) => {
        console.warn(e);
        localStorage.clear();
        history.push('/login');
      });
  };

  useEffect(() => {
    //Para obtener la ip del usuario
    // getData();
    validarSesion();
  }, []);

  return validar && <Permissions />;
};

export default Validation;
