import React, { useState, useEffect } from 'react';
import {
  CContainer,
  CCard,
  CCardHeader,
  CCardBody,
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalTitle,
  CModalFooter,
  CRow,
  CCol,
  CSpinner,
  CAlert,
} from '@coreui/react';
import { CSmartTable } from '@coreui/react-pro';
import CIcon from '@coreui/icons-react';
import {
  cilAccountLogout,
  cilCheckCircle,
  cilPencil,
  cilTrash,
  cilWarning,
  cilX,
} from '@coreui/icons';
import { useHistory } from 'react-router-dom';
import Validation from '../../components/validation/Validation';

function Dashboard() {
  const history = useHistory();

  //For save restaurants
  const [users, setUsers] = useState();

  //For show loader in table restaurants
  const [loadingTable, setLoadingTable] = useState(true);

  //For show modal
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [idUserDelete, setIdUserDelete] = useState();
  const [nameUserDelete, setNameUserDelete] = useState();
  const [emailUserDelete, setEmailUserDelete] = useState();

  //Para mostrar las alertas del formulario, de éxito y error dependiendo el tipo
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  //columns of table restaurants
  const columnsTUsers = [
    {
      key: 'name_use',
      label: 'User',
      sorter: false,
      filter: false,
    },
    {
      key: 'email_use',
      label: 'Email',
      sorter: false,
      filter: false,
    },
    {
      key: 'name_rol',
      label: 'Rol',
      sorter: false,
      filter: false,
    },
    {
      key: 'actions',
      label: 'Actions',
      filter: false,
      sorter: false,
      _props: { colSpan: 3 },
    },
  ];

  const showModalDeleteUser = (id, name, email) => {
    setIdUserDelete(id);
    setNameUserDelete(name);
    setEmailUserDelete(email);

    setShowModalDelete(true);
  };

  //API for delete user
  const deleteUser = (id) => {
    setShowModalDelete(false);

    const data = {
      id_use_session: localStorage.getItem('id_use'),
      id_use: id,
    };

    fetch(`http://localhost:5000/deleteUser`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/JSON' },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.result) {
          setShowAlert(true);
          setAlertType(true);
          setAlertMessage(resp.message);
          window.scrollTo(0, 0);
          getUsers();
        } else {
          setShowAlert(true);
          setAlertType(false);
          setAlertMessage(resp.message);
          window.scrollTo(0, 0);
        }
        setShowModalDelete(false);
        setTimeout(() => {
          setShowAlert(false);
        }, 5000);
      })
      .catch((e) => {
        console.warn(e);
        localStorage.clear();
        history.push('/login');
      });
  };

  //API for edit user
  const editUser = (id_use) => {
    history.push('/editUser', { id_use: id_use });
  };

  //API for get all restaurants
  const getUsers = () => {
    fetch(`http://localhost:5000/getUsers`, {
      method: 'GET',
    })
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.result) {
          //Save restaurants of DB
          setUsers(resp.users);
        }
        setLoadingTable(false);
      })
      .catch(console.warn);
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <CContainer>
      <Validation />
      <CCard className='m-5'>
        <CCardHeader>Users</CCardHeader>
        <CCardBody>
          {/* For show loader of table users */}
          {loadingTable ? (
            <CRow className='mb-3'>
              <CCol sm={12} className='d-flex justify-content-center'>
                <CSpinner color='primary' />
              </CCol>
            </CRow>
          ) : (
            <CRow className='mb-3'>
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
                <div>{alertMessage}</div>
              </CAlert>

              <CCol sm={12}>
                <CButton
                  color='danger'
                  shape='square'
                  title='Log out'
                  onClick={() => {
                    localStorage.clear('/');
                    history.push('/login');
                  }}
                >
                  <CIcon icon={cilAccountLogout} /> Log out
                </CButton>
              </CCol>
              <CCol sm={12}>
                <CSmartTable
                  activePage={1}
                  clickableRows
                  columns={columnsTUsers}
                  columnSorter
                  items={users}
                  itemsPerPageSelect
                  itemsPerPage={5}
                  pagination
                  tableFilter={false}
                  cleaner={false}
                  tableHeadProps={{
                    color: 'primary',
                  }}
                  scopedColumns={{
                    actions: (item) => {
                      return (
                        <>
                          <td className='text-center border-0 m-auto'>
                            {/* Valid to edit only your own
                            user if your role is “user”, or all of them if your
                            role is “admin”. */}
                            {/* Valid to delete users if your role is “admin”, and
                            you cannot delete your own user. */}
                            {localStorage.getItem('name_rol') == 'admin' ? (
                              <>
                                <CButton
                                  color='success'
                                  className='me-1'
                                  shape='square'
                                  size='sm'
                                  title='Edit User'
                                  onClick={() => {
                                    editUser(item.id_use);
                                  }}
                                >
                                  <CIcon icon={cilPencil} />
                                </CButton>
                                {localStorage.getItem('email_use') !=
                                  item.email_use && (
                                  <CButton
                                    color='danger'
                                    shape='square'
                                    size='sm'
                                    title='Delete User'
                                    onClick={() => {
                                      showModalDeleteUser(
                                        item.id_use,
                                        item.name_use,
                                        item.email_use
                                      );
                                    }}
                                  >
                                    <CIcon icon={cilTrash} />
                                  </CButton>
                                )}
                              </>
                            ) : (
                              localStorage.getItem('name_rol') == 'user' &&
                              localStorage.getItem('email_use') ==
                                item.email_use && (
                                <CButton
                                  color='success'
                                  className='me-1'
                                  shape='square'
                                  size='sm'
                                  title='Editar contacto'
                                  onClick={() => {
                                    editUser(item.id_use);
                                  }}
                                >
                                  <CIcon icon={cilPencil} />
                                </CButton>
                              )
                            )}
                          </td>
                        </>
                      );
                    },
                  }}
                  tableProps={{
                    striped: true,
                    hover: true,
                    responsive: true,
                    bordered: true,
                  }}
                />
              </CCol>
            </CRow>
          )}
        </CCardBody>

        {/* Modal for delete */}
        <CModal
          alignment='center'
          visible={showModalDelete}
          onClose={() => {
            setShowModalDelete(false);
          }}
        >
          <CModalHeader>
            <CModalTitle>Delete User</CModalTitle>
          </CModalHeader>
          <CModalBody>
            Are you sure you want to delete the user <b>"{nameUserDelete}"</b>{' '}
            with the email <b>"{emailUserDelete}"</b>?
          </CModalBody>
          <CModalFooter>
            <CButton
              color='danger'
              className='text-white modalBtnConfirmacion'
              onClick={() => {
                deleteUser(idUserDelete);
              }}
            >
              <CIcon icon={cilTrash} /> Delete
            </CButton>
            <CButton
              color='secondary'
              className='text-white modalBtnConfirmacion'
              onClick={() => {
                setShowModalDelete(false);
              }}
            >
              <CIcon icon={cilX} /> Cerrar
            </CButton>
          </CModalFooter>
        </CModal>
      </CCard>
    </CContainer>
  );
}

export default Dashboard;
