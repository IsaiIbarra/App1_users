import React, { useState } from 'react';
import logo from '../../assets/images/logo_login.png';
import {
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CForm,
  CInputGroup,
  CInputGroupText,
  CFormInput,
  CButton,
  CCardImage,
  CAlert,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilUser, cilLockLocked, cilWarning } from '@coreui/icons';
import { useHistory } from 'react-router-dom';
import Validation from '../../components/validation/Validation';

const Login = () => {
  const history = useHistory();
  //For show an error
  const [alertError, setAlertError] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const signIn = (e) => {
    e.preventDefault();
    setAlertError(false);

    const data = {
      email_use: e.target.email_use.value,
      password_use: e.target.password_use.value,
    };

    fetch(`http://localhost:5000/signIn`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/JSON' },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        //Valid the tries of user
        if (
          parseInt(localStorage.getItem('tries')) < 5 ||
          localStorage.getItem('tries') == null
        ) {
          if (resp.result) {
            //Save session credentials
            localStorage.setItem('id_use', resp.user.id_use);
            localStorage.setItem('email_use', resp.user.email_use);
            localStorage.setItem('name_rol', resp.user.name_rol);
            localStorage.setItem('tries', 0);

            history.push('/');
          } else {
            setAlertError(true);
            setAlertMessage(resp.message);
          }
        } else {
          setAlertError(true);
          setAlertMessage('You have exceeded the limit of tries!!');
        }

        //Increment or create the space for storage the tries
        if (localStorage.getItem('tries') != null) {
          let tries = parseInt(localStorage.getItem('tries'));
          localStorage.setItem('tries', tries + 1);
        } else {
          localStorage.setItem('tries', 1);
        }
      })
      .catch(console.warn);
  };

  const restartTries = () => {
    localStorage.setItem('tries', 0);

    fetch(`http://localhost:5000/restartTries`, {
      method: 'GET',
    })
      .then((resp) => resp.json())
      .then((resp) => {
        setAlertError(false);
      })
      .catch(console.warn);
  };

  return (
    <CContainer>
      <Validation />
      <CRow className='justify-content-center m-5'>
        <CCol md={6} className='align-self-center'>
          {/* Alert for inform to user */}
          <CAlert
            color='danger'
            className='d-flex align-items-center'
            visible={alertError}
          >
            <CIcon
              icon={cilWarning}
              className='flex-shrink-0 me-2'
              width={24}
              height={24}
            />
            <div>{alertMessage}</div>
          </CAlert>
          <CCard className='p-3 carta'>
            <CCardBody>
              <CForm onSubmit={signIn}>
                {/* Logo */}
                <CRow className='justify-content-center px-5 mb-2'>
                  <CCardImage orientation='top' src={logo} />
                </CRow>
                <p className='text-medium-emphasis'>Enter your account</p>
                {/* Email */}
                <CRow className='mb-3'>
                  <CCol>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        name='email_use'
                        placeholder='Email...'
                        required
                      />
                    </CInputGroup>
                  </CCol>
                </CRow>
                {/* Password */}
                <CRow className='mb-3'>
                  <CCol>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type='password'
                        name='password_use'
                        placeholder='Password...'
                        required
                      />
                    </CInputGroup>
                  </CCol>
                </CRow>

                {/* Button sign in */}
                <CRow className='mb-2'>
                  <CCol xs={6}>
                    <CButton type='submit' color='primary' className='px-4'>
                      Sign in
                    </CButton>
                  </CCol>
                </CRow>

                {/* Button restart tries for the exam review */}
                <CCol xs={12} className='text-right'>
                  <CButton color='link' className='px-0' onClick={restartTries}>
                    Restart tries (funcionality placed only for the exam review)
                  </CButton>
                </CCol>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default Login;
