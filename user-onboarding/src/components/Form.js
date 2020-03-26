import App from '../App'
import axios from "axios";
import * as yup from "yup";
import React, {useState, useEffect } from "react";

const formSchema = yup.object().shape({
    name: yup.string().required("Required"),
    email: yup.string().email("Must be a valid email")
    .required("Required"),
    password: yup.string().min(8, "ez password, longer plz").required(),
    terms: yup.boolean().oneOf([true], "plz agree"),
});

function Form() {
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        password: "",
        terms: "",
    });

    const [errors, setErrors] = useState ({
        name: "",
        email: "",
        password: "",
        terms: "",
    });

    const [post, setPost] = useState([]);

    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
            setButtonDisabled(!valid);
        });
    }, [formState]);







export default Form