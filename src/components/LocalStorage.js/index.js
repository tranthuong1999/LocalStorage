import React, { Component } from 'react'
import { Button } from 'reactstrap';
// import * as Material from '@material-ui/core';

import { confirmAlert } from 'react-confirm-alert';
import './index.css';


class index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            students: [],
            name: '',
            country: '',
            nameError: '',
            countryError: '',
        }
    }

    componentDidMount() {
        const studentLocal = localStorage?.getItem('Student');
        if (studentLocal != null) {
            const students = JSON.parse(studentLocal);
            this.setState({
                students
            })
        }
    }

    handleSave() {
        const { name, country, students } = this.state;
        const check = students.find(e => e.name === name.trim());
        if (check) {
            this.setState({
                nameError: "Name already exits"
            })
            return;
        }

        const student = {
            name: name.trim(),
            country: country.trim(),
        }
        if (name.trim() === '') {
            this.setState({
                nameError: " Please enter name"
            })
            return;
        }
        //if name có ít nhất 1 ký tự đặc biệt 
        //return 
        if (country.trim() === '') {
            this.setState({
                countryError: " Please enter country"
            })
            return;
        }

        students.push(student)
        this.setState({
            students,
            name: '',
            country: '',
        })

        localStorage.setItem('Student', JSON.stringify(students))
    }
    handleClickDelete = (key) => {
        const { students } = this.state
        console.log("student : ", students)
        students.splice(key, 1)
        localStorage.setItem('Student', JSON.stringify(students))
        this.setState({
            students
        })
    }
    deleteItem = (key) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <h4>Bạn có chắc chắn muốn xóa không !!!!</h4>
                        <Button color="secondary" onClick={onClose}>No</Button>
                        <Button color="warning" onClick={() => {
                            this.handleClickDelete(key)
                            onClose()
                        }}>Yes, Delete it!</Button>
                    </div>
                )
            }
        })
    }
    render() {
        // Yeu cau:
        // - Add icon delete -> bỏ button delete đi 
        // - Dùng Material Model, Material Table 
        // - Phân trang: pagination: 
        const { students, name, country, nameError, countryError } = this.state;
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
            <div style={{ width: 500, height: 500, borderWidth: 1, borderColor: '#cacaca', backgroundColor: '#cacaca' }}>
                <div>Reuse Component, LocalStorage, JSON</div>
                <div style={{ marginBottom: 10, display: "block" }}>
                    <input
                        value={name}
                        placeholder={'Name'}
                        onChange={e => this.setState({ name: e.target.value, nameError: '' })}
                    />
                </div>
                <span style={{ color: "red" }}> {nameError} </span>
                <div>
                    <input
                        value={country}
                        placeholder={'Country'}
                        onChange={e => this.setState({ country: e.target.value })}
                    />
                </div>
                <span style={{ color: "red" }}> {countryError} </span>
                <div>
                    <Button style={{ marginTop: 10, position: "absolute" }} color="primary" onClick={() => this.handleSave()}>Save</Button>
                </div>

                <div className="row" style={{ marginTop: 80 }}>
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th> Name</th>
                                <th> Country</th>
                                <th> Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                students.map((student, key) => {
                                    return [
                                        <tr key={key}>
                                            <td> {student.name} </td>
                                            <td> {student.country}</td>
                                            <td>
                                                <button style={{ marginLeft: "10px" }}
                                                    onClick={() => this.deleteItem(key)}
                                                    className="btn btn-danger">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ]

                                })
                            }
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    }
}



export default index;