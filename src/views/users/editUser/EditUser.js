import React, { useState, useEffect } from 'react';
import {
  CRow,
  CCard,
  CCardHeader,
  CCardBody,
  CForm,
  CButton,
  CCol,
  CInputGroup,
  CInputGroupText,
  CFormInput,
  CFormSelect,
  CFormLabel,
  CSpinner,
  CAlert,
  CFormTextarea,
  CFormSwitch,
  CTooltip,
  CListGroup,
  CListGroupItem,
  CFormCheck,
  CCollapse,
  CContainer,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import {
  cilUser,
  cilAt,
  cilArrowCircleLeft,
  cilCheckCircle,
  cilWarning,
  cilFactory,
  cilLocationPin,
  cilPhone,
  cilPowerStandby,
  cilCalendar,
  cilBriefcase,
  cilSave,
  cilLockLocked,
} from '@coreui/icons';
import { cilInfoCircle, cilKey } from '@coreui/icons-pro';
import Validation from '../../../components/validation/Validation';
import { useHistory, useLocation } from 'react-router-dom';

const EditUser = () => {
  //Para redireccionar
  const history = useHistory();

  //Para tomar los atributos del usuario mandados por props
  const location = useLocation();

  //For catch id user to edit
  const [idUser, setIdUser] = useState(
    location.state != null ? location.state.id_use : null
  );

  //For save user to edit
  const [user, setUser] = useState();

  //For save roles of DB
  const [roles, setRoles] = useState();

  //For show inputs password change
  const [passwordVisible, setPasswordVisible] = useState(false);

  //For show loader while load user information
  const [loading, setLoading] = useState(true);

  //For show loader when edit user API is loading
  const [loadingSubmitButton, setLoadingSubmitButton] = useState(false);

  //Para mostrar las alertas del formulario, de éxito y error dependiendo el tipo
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState(false);
  const [alertMensaje, setAlertMensaje] = useState('');

  //API for edit user
  const editUser = (e) => {
    setLoadingSubmitButton(true);
    e.preventDefault();
    const data = {
      name_use: e.target.name_use.value,
      email_use: e.target.email_use.value,
      id_rol: e.target.id_rol.value,
      password_use: e.target.password_use.value,
      confirm_password: e.target.confirm_password.value,
      id_use: e.target.id_use.value,
    };

    //API para actualizar usuario
    fetch(`http://localhost:5000/editUser`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/JSON' },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.result) {
          //Mostrar alerta
          setShowAlert(true);
          setAlertType(true);
          setAlertMensaje(resp.message);
          window.scrollTo(0, 0);
          //Volver a la tabla de empresas despues de un tiempo determinado
          setTimeout(() => {
            history.push('/');
          }, 2500);
        } else {
          //Mostrar alerta
          setShowAlert(true);
          setAlertType(false);
          setAlertMensaje(resp.message);
          window.scrollTo(0, 0);
        }
        setLoadingSubmitButton(false);
      })
      .catch((e) => {
        console.warn(e);
        // localStorage.clear();
        // history.push('/login');
      });
  };

  //API for consult user information to edit
  const getUserEdit = () => {
    if (idUser != null) {
      setLoading(true);

      const data = {
        id_use: idUser,
      };

      //API para creación de token
      fetch(`http://localhost:5000/getUserEdit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/JSON' },
        body: JSON.stringify(data),
      })
        .then((resp) => resp.json())
        .then((resp) => {
          if (resp.result) {
            //Save user data and all roles
            setUser(resp.user);
            setRoles(resp.roles);

            setLoading(false);
          } else {
            setShowAlert(true);
            setAlertType(false);
            setAlertMensaje(resp.message);
            window.scrollTo(0, 0);
          }
        })
        .catch(console.warn);
    }
  };

  useEffect(() => {
    getUserEdit();
  }, []);

  return (
    <CContainer>
      <Validation />
      <CCard className='mb-4 m-5'>
        <CCardHeader>Edit User</CCardHeader>
        <CCardBody>
          {loading ? (
            <CRow className='mb-3'>
              <CCol sm={12} className='d-flex justify-content-center'>
                <CSpinner color='primary' />
              </CCol>
            </CRow>
          ) : (
            <CForm onSubmit={editUser}>
              {/* Alert for inform to user */}
              <CAlert
                color={alertType ? 'success' : 'danger'}
                className='d-flex align-items-center'
                visible={showAlert}
              >
                <CIcon
                  icon={alertType ? cilCheckCircle : cilWarning}
                  className='flex-shrink-0 me-2'
                  width={24}
                  height={24}
                />
                <div>{alertMensaje}</div>
              </CAlert>
              <CRow>
                {/* Title */}
                <CRow className='mb-3'>
                  <CCol sm={9}>
                    <h5 className='card-title mb-3'>User Information</h5>
                  </CCol>
                </CRow>

                {/* ID, name, email, rol */}
                <CRow className='mb-3'>
                  <CCol sm={2}>
                    <CFormLabel>ID User:</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilKey} />
                      </CInputGroupText>
                      <CFormInput
                        name='id_use'
                        placeholder='ID...'
                        defaultValue={user.id_use}
                        disabled={true}
                      />
                    </CInputGroup>
                  </CCol>
                  <CCol sm={3}>
                    <CFormLabel>User:</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        name='name_use'
                        placeholder='User...'
                        defaultValue={user.name_use}
                        required
                      />
                    </CInputGroup>
                  </CCol>
                  <CCol sm={4}>
                    <CFormLabel>Email:</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilAt} />
                      </CInputGroupText>
                      <CFormInput
                        name='email_use'
                        placeholder='Email...'
                        defaultValue={user.email_use}
                        required
                      />
                    </CInputGroup>
                  </CCol>
                  <CCol sm={3}>
                    <CFormLabel>Rol:</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormSelect
                        name='id_rol'
                        defaultValue={user.name_rol}
                        disabled={user.name_rol == 'user' ? true : false}
                      >
                        {roles != null &&
                          roles.map((a) => (
                            <option key={a.id_rol} value={a.id_rol}>
                              {a.name_rol}
                            </option>
                          ))}
                      </CFormSelect>
                    </CInputGroup>
                  </CCol>
                </CRow>

                {/* Boton para abrir el collapse de cambiar contraseña */}
                <CRow className='mb-3'>
                  <CCol sm={12}>
                    <div className='d-grid gap-2'>
                      {passwordVisible ? (
                        <CButton
                          color='secondary'
                          onClick={() => {
                            setPasswordVisible(!passwordVisible);
                          }}
                        >
                          Ocultar Cambiar Contraseña
                        </CButton>
                      ) : (
                        <CButton
                          color='secondary'
                          variant='outline'
                          onClick={() => {
                            setPasswordVisible(!passwordVisible);
                          }}
                        >
                          Cambiar contraseña
                        </CButton>
                      )}
                    </div>
                  </CCol>
                </CRow>
                {/* Password, confirm password */}
                <CRow>
                  <CCol sm={12}>
                    <CCollapse visible={passwordVisible}>
                      <CCard className='mb-3'>
                        <CCardBody>
                          <CRow>
                            <CCol>
                              <CFormLabel>New Password:</CFormLabel>
                              <CInputGroup>
                                <CInputGroupText>
                                  <CIcon icon={cilLockLocked} />
                                </CInputGroupText>
                                <CFormInput
                                  type='password'
                                  name='password_use'
                                  placeholder='Password...'
                                />
                              </CInputGroup>
                            </CCol>
                            <CCol>
                              <CFormLabel>Confirm Password:</CFormLabel>
                              <CInputGroup>
                                <CInputGroupText>
                                  <CIcon icon={cilLockLocked} />
                                </CInputGroupText>
                                <CFormInput
                                  type='password'
                                  name='confirm_password'
                                  placeholder='Password...'
                                />
                              </CInputGroup>
                            </CCol>
                          </CRow>
                        </CCardBody>
                      </CCard>
                    </CCollapse>
                  </CCol>
                </CRow>
              </CRow>
              <CRow>
                <CCol sm={12} className='d-flex justify-content-center'>
                  <CButton
                    color='danger'
                    className='mt-4 me-2'
                    onClick={() => history.goBack()}
                  >
                    <CIcon icon={cilArrowCircleLeft} /> Back
                  </CButton>

                  <CButton
                    type='submit'
                    color='success'
                    className='text-white mt-4'
                    disabled={loadingSubmitButton}
                  >
                    {loadingSubmitButton ? (
                      <>
                        <CSpinner size='sm' color='light' /> Cargando...
                      </>
                    ) : (
                      <>
                        <CIcon icon={cilSave} /> Save changes
                      </>
                    )}
                  </CButton>
                </CCol>
              </CRow>
            </CForm>
          )}
        </CCardBody>
      </CCard>
    </CContainer>
  );
};

export default EditUser;
