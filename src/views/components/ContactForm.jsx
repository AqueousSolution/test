import React, { useState, useContext, useEffect } from "react";
import ContactsContext from "../../store/Contacts/ContactsContext";
import { CircularProgress, LinearProgress, Alert } from "@mui/material";
import Media from "../../assets/media.svg";
import IMAGE_API from "../../store/uploadImageURL";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { emailValid } from "../../utils/emailValidator";

const ContactForm = ({ closeContactModal }) => {
  const contactsContext = useContext(ContactsContext);
  const {
    addContact,
    updateContact,
    deleteContact,
    contactCreated,
    contactDeleted,
    contactUpdated,
    current,
  } = contactsContext;

  const [contactDetails, setContactDetails] = useState({
    cretatedAt: new Date().toISOString().slice(0, 10),
    name: "",
    avatar: "",
    birthday: "",
    email: "",
    phone: "",
  });

  const { avatar, birthday, email, phone } = contactDetails;

  const [nameDetails, setNameDetails] = useState({
    firstname: "",
    lastName: "",
  });

  const { firstName, lastName } = nameDetails;

  const [alert, setAlert] = useState("");

  const [buttonLoading, setButtonLoading] = useState(false);

  const [deleteLoading, setDeleteLoading] = useState(false);

  const [imageLoading, setImageLoading] = useState(false);

  const [imageError, setImageError] = useState("");

  const [error, setError] = useState("");

  const [emailError, setEmailError] = useState("");

  const handleImgChange = (e) => {
    e.preventDefault();
    setImageError(false);
    if (e.target.files[0]) {
      setImageLoading(true);

      let file = e.target.files[0];
      let formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", process.env.REACT_APP_API_KEY);
      formData.append("upload_preset", "equals");
      formData.append("cloud_name", "aqueousbobo");

      axios
        .post(IMAGE_API, formData)
        .then((res) => {
          if (res) {
            setImageLoading(false);
          }
          setContactDetails({ ...contactDetails, avatar: res.data.url });
          console.log(res.data.url);
        })
        .catch((err) => setImageError(true));
    }
  };

  const handleChange = (e) => {
    setContactDetails({ ...contactDetails, [e.target.name]: e.target.value });
  };

  const handleNameChange = (e) => {
    setNameDetails({ ...nameDetails, [e.target.name]: e.target.value });
  };

  const createContact = (e) => {
    e.preventDefault();
    setError(false);
    setEmailError(false)
    if (firstName && lastName && email && phone && birthday) {
        if(emailValid(email)){
            setButtonLoading(true);
            addContact(contactDetails);
        }else{
            setEmailError(true)
        }
  
    } else {
      setError(true);
      console.log(firstName, lastName, email, phone, birthday);
    }
  };

  const editContact = (e) => {
    e.preventDefault();
    setError(false);
    setEmailError(false)
    if (firstName && lastName && email && phone && birthday) {
        if(emailValid(email)){
            setButtonLoading(true);
            updateContact(contactDetails);
        }else{
            setEmailError(true)
        }
    } else {
      setError(true);
      console.log(firstName, lastName, email, phone, birthday);
    }
  };

  const removeContact = (e) => {
    e.preventDefault();
    setError(false);
    setDeleteLoading(true);
    deleteContact(current.id);
  };

  const close = () => {
    setAlert("");
    closeContactModal();
  };

  useEffect(() => {
    if (current) {
      let nameArray = current.name.split(" ");

      setContactDetails(current);

      setNameDetails({
        firstName: nameArray[0],
        lastName: nameArray[1],
      });
    }
    //eslint-disable-next-line
  }, [current]);

  useEffect(() => {
    if (lastName && firstName) {
      setContactDetails({
        ...contactDetails,
        name: firstName + " " + lastName,
      });
    }
    //eslint-disable-next-line
  }, [firstName, lastName]);

  useEffect(() => {
    if (contactCreated) {
      setButtonLoading(false);
      setAlert("Contact successfully Created");
      setTimeout(close, 3000);
    } else if (contactDeleted) {
      setDeleteLoading(false);
      setAlert("Contact successfully Deleted");
      setTimeout(close, 3000);
    } else if (contactUpdated) {
      setButtonLoading(false);
      setAlert("Contact successfully Updated");
      setTimeout(close, 3000);
    }
    // eslint-disable-next-line
  }, [contactCreated, contactDeleted, contactUpdated]);

  console.log(alert, contactUpdated);

  return (
    <>
      <div className="modal">
        {alert ? <Alert severity="success">{alert}</Alert> : <p></p>}
        <div className="modal-header">
          <h1>{current ? "Update contact" : "Add a contact"}</h1>
          <p onClick={closeContactModal}>X</p>
        </div>
        <form>
          {error && (
            <p style={{ color: "red" }}>Please fill up all the fields</p>
          )}
          {emailError && (
            <p style={{ color: "red" }}>This email is not a valid email</p>
          )}
          <div className="flex">
            <label htmlFor="firstName">
              First Name
              <input
                type="text"
                id="firstName"
                className="modal-input"
                name="firstName"
                value={firstName}
                onChange={handleNameChange}
              />
            </label>

            <label htmlFor="lastName">
              Last Name
              <input
                type="text"
                id="lastName"
                className="modal-input"
                name="lastName"
                value={lastName}
                onChange={handleNameChange}
              />
            </label>
          </div>

          <div className="flex">
            <label htmlFor="email">
              Email
              <input
                type="email"
                id="email"
                className={emailError ? "error modal-input" : "modal-input"}
                name="email"
                value={email}
                onChange={handleChange}
              />
            </label>

            <label htmlFor="phone">
              Phone Number
              <input
                type="text"
                id="phone"
                className="modal-input"
                name="phone"
                value={phone}
                onChange={handleChange}
              />
            </label>
          </div>
          <label htmlFor="batch-date">
            Birthday
            <TextField
              id="date"
              type="date"
              variant="outlined"
              name="birthday"
              value={birthday}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </label>

          <div className="media-bg">
            {imageLoading ? <LinearProgress size={14} /> : null}
            {avatar ? (
              <>
                <img
                  src={avatar ? avatar : Media}
                  alt="uploaded media"
                  className="uploaded-pic"
                />
                <div className="uploaded-pic-details">
                  <p></p>
                  <p>Uploaded Avatar</p>
                </div>
                <label
                  htmlFor="product-form__img"
                  className="uploaded-pic-button"
                >
                  Change Avatar
                  <input
                    type="file"
                    id="product-form__img"
                    className="product-form__name"
                    name="productPic"
                    accept="image/jpeg, image/png"
                    onChange={handleImgChange}
                  />
                </label>
              </>
            ) : (
              <>
                <img src={Media} alt="media" className="media" />
                <label htmlFor="product-form__img">
                  Add avatar
                  <input
                    type="file"
                    id="product-form__img"
                    className="product-form__name"
                    name="productPic"
                    accept="image/jpeg, image/png"
                    onChange={handleImgChange}
                  />
                </label>

                <p style={{ color: "red" }}>
                  {imageError && "There was an error uploading this image"}
                </p>
              </>
            )}
          </div>
          <div className="flex">
            <button
              onClick={current ? removeContact : closeContactModal}
              className="delete"
            >
              {deleteLoading && (
                <CircularProgress style={{ color: "black" }} size={14} />
              )}
              {!deleteLoading ? (current ? "Delete Contact" : "Close") : ""}
            </button>
            <button onClick={current ? editContact : createContact}>
              {buttonLoading && (
                <CircularProgress style={{ color: "white" }} size={14} />
              )}
              {!buttonLoading
                ? current
                  ? "Update Contact"
                  : "Create Contact"
                : ""}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ContactForm;
