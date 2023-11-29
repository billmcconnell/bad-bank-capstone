import React, { useEffect } from "react";
import { Card } from "./context";

export function AllData() {
    const [data, setData] = React.useState('');
    // const baseUrl = process.env.NODE_ENV === 'development' ? '' : 'http://localhost:5500';
    // const baseUrl = process.env.REACT_APP_PORT || 'http://localhost:5500';
    const baseUrl = process.env.REACT_APP_PORT;

    function fetchData() {
        fetch(`${baseUrl}/account/all`)
            .then(async (res) => {

                const data = await res.json();
                return setData(data);
            })
    }

    useEffect(() => {
        if (data === '') { fetchData() }


    }, [data, fetchData]);

    if (data !== '')
        return (
            <Card
                bgcolor="dark"
                header='All Data'
                body={
                    <>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Balance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map(
                                    (user, index) => (
                                        <tr key={index}>
                                            <th scope="row">{index}</th>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.balance}</td>
                                        </tr>
                                    )
                                )}

                            </tbody>
                        </table>


                    </>
                }
            />
        )
    else return (
        <Card
            bgcolor="primary"
            header='All Data'
            body={
                <>
                    <h5>No Data</h5>
                </>
            }
        />
    )
}

export default AllData
