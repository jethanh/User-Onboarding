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

    
    const formSubmit = e => {
        e.preventDefault();
        axios
            .post("https://reqres.in/api/users", formState)
            .then(response => {
                setPost(response.data);
                setFormState({
                    name: "",
                    email: "",
                    password: "",
                    terms: "",
                });
            })
            .catch(error => console.log(error.response));
    };

    const validateChange = e => {
        yup
        .reach(formSchema, e.target.name)
        .validate(e.target.name === "terms" ? e.target.checked : e.target.value)

        .then(valid => {
            setErrors({
                ...errors,
                [e.target.name]: ""
            });
        })
        .catch (err => {
            setErrors({
                ...errors,
                [e.target.name]: err.errors[0]
            });
        });
    };

    const inputChange = e => {
        e.persist();
        const newFormData = {
            ...formState,
            [e.target.name]:
            e.target.type === "checkbox" ? e.target.checked : e.target.value
        };

        validateChange(e);
        setFormState(newFormData);
    };

    return (
        <div className="formdiv">
        <form onSubmit={formSubmit}>
            <label htmlFor="name">
                name
                <input
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={inputChange}
                />
                {errors.name.length > 0 ? <p>{errors.name}</p> : null}
            </label>
            <label htmlFor="email">
                email
                <input
                    type="text"
                    name="email"
                    value={formState.email}
                    onChange={inputChange}
                />
                {errors.email.length > 0 ? <p>{errors.email}</p> : null}
            </label>
            <label htmlFor="password">
                password
                <input
                    type="password"
                    name="password"
                    value={formState.password}
                    onChange={inputChange}
                />
                {errors.password.length > 0 ? <p>{errors.password}</p> : null}
            </label>
            <label htmlFor="terms">
                <input
                    type="checkbox"
                    name="terms"
                    checked={formState.terms}
                    onChange={inputChange}
                />
                Terms & Conditions
            </label>
            { }
            <pre>{JSON.stringify(post.name, null, 2)}</pre>
            <button disabled={buttonDisabled}>Submit</button>
        </form>
        </div>
    );

}





export default Form