import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Link from "antd/es/typography/Link";
import { useDispatch } from "react-redux";
import { sendEmail } from "../../core/data/redux/api/bookingApi";


// Validation schema for Formik using Yup
const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
        .matches(/^[0-9]+$/, "Phone number must be digits only")
        .min(10, "Phone number must be at least 10 digits")
        .required("Phone number is required"),
});

function EmailModal() {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const initialValues = { name: "", email: "", phone: "" };

    const handleSubmit = (values) => {
        // Submit form data, for example, make an API call
        console.log("Form data submitted:", values);
        dispatch(sendEmail(values));
        handleClose(); // Close the modal after submission
    };

    return (
        <>
            <div className="listing-button" onClick={handleShow}>
                <Link className="btn btn-order">
                    <span>
                        <i className="feather icon-calendar me-2" />
                    </span>
                    Rent Now
                </Link>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter your details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                {/* Name Input Field */}
                                <div className="mb-3">
                                    <label htmlFor="name">Name</label>
                                    <Field
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        placeholder="Enter your name"
                                    />
                                    <ErrorMessage
                                        name="name"
                                        component="div"
                                        className="text-danger"
                                    />
                                </div>

                                {/* Email Input Field */}
                                <div className="mb-3">
                                    <label htmlFor="email">Email</label>
                                    <Field
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="Enter your email"
                                    />
                                    <ErrorMessage
                                        name="email"
                                        component="div"
                                        className="text-danger"
                                    />
                                </div>

                                {/* Phone Input Field */}
                                <div className="mb-3">
                                    <label htmlFor="phone">Phone Number</label>
                                    <Field
                                        type="text"
                                        name="phone"
                                        className="form-control"
                                        placeholder="Enter your phone number"
                                    />
                                    <ErrorMessage
                                        name="phone"
                                        component="div"
                                        className="text-danger"
                                    />
                                </div>

                                {/* Modal Footer with Buttons */}
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                    <Button type="submit" variant="primary" disabled={isSubmitting}>
                                        Submit
                                    </Button>
                                </Modal.Footer>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default EmailModal;
