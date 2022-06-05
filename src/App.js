import React from 'react';
import logo from './assets/images/logo_login.png';
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
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilUser, cilLockLocked } from '@coreui/icons';

function App() {
  const login = () => {};

  return (
    <CContainer>
      <CRow className='justify-content-center m-5'>
        <CCol md={6} className='align-self-center'>
          <CCard className='p-3 carta'>
            <CCardBody>
              <CForm onSubmit={login}>
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
                <CRow>
                  <CCol xs={6}>
                    <CButton type='submit' color='primary' className='px-4'>
                      Sign in
                    </CButton>
                  </CCol>
                </CRow>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
}

export default App;
