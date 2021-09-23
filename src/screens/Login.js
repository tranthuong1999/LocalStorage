import React, { Component } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";



export default function Login() {

    const LoginSchema = yup.object().shape({
        EMAIL: yup.string().email('Email sai e nhé').required('Bạn phải nhập Email'),
        name: yup.string().required('Bạn phải nhập Name'),
    });
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(LoginSchema)
    });


    const onSubmit = (data) => {
        console.log('Submit data:', data);
    }



    return <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
        <div style={{ width: 500, height: 500, backgroundColor: 'gray', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ width: 300, height: 300, backgroundColor: 'white' }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <input {...register("EMAIL")} placeholder="Email" />
                        {errors.EMAIL && <p>{errors.EMAIL.message}</p>}
                        <input {...register("name")} placeholder="Name" />
                        {errors.name && <p>{errors.name.message}</p>}
                    </div>
                    <input type="submit" />
                </form>
            </div>
        </div>
    </div>
}
