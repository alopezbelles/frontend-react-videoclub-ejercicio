import React, { useEffect, useState } from "react";
import { Col, Collapse, Container, Row } from "react-bootstrap";
import { useJwt } from "react-jwt";
import { useNavigate } from "react-router-dom";
import { deleteUser, getAllDeletedUsers, getAllLoans, getAllUsers } from "../../services/ApiCalls";
import userSlice from "../User/userSlice";
import "./admin.css";

function Admin() {

  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");
  
  let { decodedToken } = useJwt(token);

  const [openLoans, setOpenLoans] = useState(false);
  const [openUsers, setOpenUsers] = useState(false);
  const [openDeletedUsers, setOpenDeletedUsers] = useState(false);
  const [loans, setLoans] = useState([]);
  const [users, setUsers] = useState([]);
  const [deletedUsers, setDeletedUsers] = useState([]);
  const [deleted, setDeleted] = useState(false);


  useEffect(() => {
    getAllLoans(token).then((loans) => setLoans(loans));
  }, []);

  useEffect(() => {
    getAllUsers(token).then((users) => setUsers(users));
  }, [deleted]);
  
    useEffect(() => {
      getAllDeletedUsers(token).then((deletedUsers) => setDeletedUsers(deletedUsers));
    }, [deleted]);


  const isActive = (loan) => {
    if (loan.end_date == null) {
      return true;
    }
  };

  const isAdmin = () => {
    if (decodedToken?.role == "admin") {
      return true;
    } else {
      return false;
    }
  };

  const deleteUserAdmin = (user) => {
    deleteUser(user, token)
    .then(setDeleted(!deleted))
  }

  if (isAdmin()) {
    return (
      <Container className="adminContainer">
        <Row className="adminCardTitle mt-3">
          <div
            onClick={() => setOpenLoans(!openLoans)}
            aria-controls="example-collapse-text"
            aria-expanded={openLoans}
            className="collapseText"
          >
            LOANS
          </div>
        </Row>
        <Collapse in={openLoans}>
          <Row className="adminSection mt-3">
            {loans.map((loan, index) => {
              return (
                <Col
                  key={index}
                  className={`col-10 col-md-3 adminCard ${
                    isActive(loan) ? "active" : ""
                  }`}
                >
                  <div className="loanId">
                    <span>Loan {loan.id_loan}</span>
                  </div>
                  <div>
                    <span>User: </span>
                    {loan.User.username}
                  </div>
                  <div>
                    <span>E-mail: </span>
                    {loan.User.email}
                  </div>
                  <div>
                    <span>Movie: </span>
                    {loan.Movie.title}
                  </div>
                  <div>
                    <span>Rented at: </span>
                    {loan.date}
                  </div>
                  {isActive(loan) ? (
                    <div className="greenText">ACTIVE</div>
                  ) : (
                    <div className="redText">FINISHED AT {loan.end_date}</div>
                  )}
                </Col>
              );
            })}
          </Row>
        </Collapse>
        <Row className="adminCardTitle">
          <div
            onClick={() => setOpenUsers(!openUsers)}
            aria-controls="example-collapse-text"
            aria-expanded={openUsers}
            className="collapseText"
          >
            USERS
          </div>
        </Row>
        <Collapse in={openUsers}>
          <div>
            <Row className="adminSection mt-3">
              {users.map((user, index) => {
                return (
                  <Col key={index} className={`col-10 col-md-3 adminCard`}>
                    <div className="loanId">
                      <span>{user.email}</span>
                    </div>
                    <div>
                      <span>User: </span>
                      {user.username}
                    </div>
                    <div>
                      <span>Name: </span>
                      {user.name}
                    </div>
                    <div>
                      <span>Address: </span>
                      {user.address}
                    </div>
                    <div>
                      <span>City: </span>
                      {user.city}
                    </div>
                    <div
                      className="buttonDetail"
                      onClick={() => deleteUserAdmin(user)}
                    >
                      Delete user
                    </div>
                  </Col>
                );
              })}
            </Row>
          </div>
        </Collapse>
        <Row className="adminCardTitle">
          <div
            onClick={() => setOpenDeletedUsers(!openDeletedUsers)}
            aria-controls="example-collapse-text"
            aria-expanded={openDeletedUsers}
            className="collapseText"
          >
           DELETED USERS
          </div>
        </Row>
        <Collapse in={openDeletedUsers}>
          <div>
            <Row className="adminSection mt-3">
              {deletedUsers.map((deletedUser, index) => {
                return (
                  <Col key={index} className={`col-10 col-md-3 adminCard`}>
                    <div className="loanId">
                      <span>{deletedUser.email}</span>
                    </div>
                    <div>
                      <span>User: </span>
                      {deletedUser.username}
                    </div>
                    <div>
                      <span>Name: </span>
                      {deletedUser.name}
                    </div>
                    <div>
                      <span>Address: </span>
                      {deletedUser.address}
                    </div>
                    <div>
                      <span>City: </span>
                      {deletedUser.city}
                    </div>                  
                  </Col>
                );
              })}
            </Row>
          </div>
        </Collapse>
      </Container>
    );
  } else {
    <div>NOT AUTHORIZED</div>;
  }
}

export default Admin;
