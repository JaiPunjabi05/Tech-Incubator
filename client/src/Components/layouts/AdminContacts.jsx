import {useEffect, useState} from "react";
import { useAuth } from "../../store/auth";
import {toast} from "react-toastify";

export const AdminContacts = () => {

    const [contactData, setContactData] = useState([]);
    const {authorizationToken} = useAuth();
    const getContactsData = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/admin/contacts",{
                method:"GET",
                headers:{
                    Authorization: authorizationToken,
                }
            });

            const data = await response.json();
            console.log(data);

            if(response.ok){
                setContactData(data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const deleteContactById = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/contacts/delete/${id}`,{
                method: "DELETE",
                headers:{
                    Authorization : authorizationToken
                }
            })

            if(response.ok){
                getContactsData();
                toast.success("Deleted Successfully!")
            }else{
                toast.error("Deletion Failed!");
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getContactsData();
    },[]);

    return (
        <>
            <section className="admin-users-section">
                <div className="container">
                    <h1>Admin Contacts Data</h1>
                </div>
            </section>
            <div className="container admin-users">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Message</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contactData.map((currContact, index) => {
                            const {username, email, message, _id} = currContact;
                            return <tr key={index}>
                                <td>{username}</td>
                                <td>{email}</td>
                                <td>{message}</td>
                                <td> <button className="btn" onClick={() => {deleteContactById(_id)}}>Delete</button></td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}