import React, { Component } from 'react'

import axios from 'axios';


class index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listData: [],
        }
    }


    componentDidMount() {
        // fetch('https://jsonplaceholder.typicode.com/posts')
        //     .then(response => response.json())
        //     .then(json => {
        //         this.setState({ listData: json });
        //         fetch('https://jsonplaceholder.typicode.com/users')
        //             .then(response => response.json())
        //             .then(json => {
        //                 console.log('List user:', json);
        //             })
        //     })
        this.getData();
    }

    async getData() {
        // const postsJson = await fetch('https://jsonplaceholder.typicode.com/posts');
        // const posts = await postsJson.json();
        const postsJson = await axios.get('https://jsonplaceholder.typicode.com/posts');
        console.log('posts:', postsJson.data);

        // const userJson = await fetch('https://jsonplaceholder.typicode.com/users');
        // const users = await userJson.json();
        // console.log('users:', users);
    }


    render() {
        const { listData } = this.state;
        console.log('listData:', listData);
        return <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            {
                listData.map(e => {
                    return <div>
                        <div>Id: {e.id}</div>
                        <div>{e.title}</div>
                        <div>------------------------------------</div>
                    </div>
                })
            }
        </div>
    }

}

export default index;
