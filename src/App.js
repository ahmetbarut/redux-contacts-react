import { useState, useEffect } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addContact, removeContact, editContact } from "./store/contacts";

function App() {
  const contacts = useSelector(state => state.contacts.contacts);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [updatedModal, setUpdatedModal] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");

  const [editName, setEditName] = useState("");
  const [editId, seteditId] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editImage, setEditImage] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleUpdatedModalClose = () => setUpdatedModal(false);

  const handleUpdatedModalShow = (id) => {
    const contact = contacts.find(contact => contact.id === id);
    setEditName(contact.name);
    setEditPhone(contact.phone);
    setEditImage(contact.image);
    seteditId(contact.id);
    setUpdatedModal(true)
  };


  const handleSubmit = e => {
    e.preventDefault();

    if (!name || !phone || !image) {
      alert("Please fill all fields");
      return;
    }
    
    dispatch(
      addContact({
        id: contacts.length + 1,
        name,
        phone,
        image
      })
    );
    setName("");
    setPhone("");
    setImage("");
    handleClose();
  };

  const handleEditSubmit = () => {
    if (!name || !phone || !image) {
      alert("Please fill all fields");
      return;
    }
    
    dispatch(
      editContact({
        id: editId,
        name: editName,
        phone: editPhone,
        image: editImage
      })
    );
    setEditName("");
    setEditPhone("");
    setEditImage("");
    seteditId("");
    handleUpdatedModalClose();
  }

  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-md-4">
          <Card>
            <Card.Header>
              <Card.Title className="d-flex flex-row justify-content-between">
                <span>
                  <i className="fas fa-user-circle"></i> Contact List
                </span>
                <span>
                  <Button variant="outline-primary" onClick={handleShow}>
                    <i className="fas fa-plus"></i> Add Contact
                  </Button>

                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Add New Contact</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                        <fieldset>
                          <Form.Group className="mb-3">
                            <Form.Label htmlFor="name">Name</Form.Label>
                            <Form.Control onChange={event => setName(event.target.value)} id="name" placeholder="Name" />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label htmlFor="phone">Phone</Form.Label>
                            <Form.Control onChange={event => setPhone(event.target.value)} id="phone" placeholder="Phone" />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label htmlFor="image">image</Form.Label>
                            <Form.Control onChange={event => setImage(event.target.value)} id="image" placeholder="Phone" />
                          </Form.Group>

                        </fieldset>
                      </Form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button onClick={handleSubmit} type="submit">Save</Button>
                    </Modal.Footer>
                  </Modal>

                  <Modal show={updatedModal} onHide={handleUpdatedModalClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Update Contact</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                        <fieldset>
                          <Form.Group className="mb-3">
                            <Form.Label htmlFor="name">Name</Form.Label>
                            <Form.Control onChange={event => setEditName(event.target.value)} value={editName} id="name" placeholder="Name" />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label htmlFor="phone">Phone</Form.Label>
                            <Form.Control onChange={event => setEditPhone(event.target.value)} value={editPhone} id="phone" placeholder="Phone" />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label htmlFor="image">image</Form.Label>
                            <Form.Control onChange={event => setEditImage(event.target.value)} value={editImage} id="image" placeholder="Phone" />
                          </Form.Group>

                        </fieldset>
                      </Form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button onClick={() => {
                        handleEditSubmit()
                      }} type="submit">Save</Button>
                    </Modal.Footer>
                  </Modal>

                </span>
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <div>
                {
                  contacts.map((contact, key) => (
                    <div key={key} className="row mt-1 border p-1 align-items-center">
                      <div className="col-md-2">
                        <img src={contact.image}
                          alt="profile"
                          className="img-fluid rounded-circle"
                          style={{ "width": "50px", "height": "50px" }}
                        />
                      </div>
                      <div className="col-4">
                        <div className="d-flex flex-column">
                          <span className="h5">
                            {contact.name}
                          </span>
                          <span className="text-muted h6">
                            <i>
                              {contact.phone}
                            </i>
                          </span>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="d-flex flex-column">
                          <span className="h5 d-flex flex-row justify-content-between">
                            <Button
                              onClick={() => {
                                handleUpdatedModalShow(contact.id)
                              }
                              }
                              variant="success" className="btn-sm text-white">
                              Update
                            </Button>
                            <Button variant="danger"
                              onClick={() => {
                                dispatch(removeContact({ id: contact.id }));
                              }} className="btn-sm text-white">
                              Remove Contact
                            </Button>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default App;
