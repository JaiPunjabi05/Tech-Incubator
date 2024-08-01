import {useState} from "react";
import {useAuth} from "../store/auth";
import {toast} from "react-toastify";

const defaultContactFormData = {
    username : "",
    email : "",
    message : "",
}

export const Contact = () => {

    const [contact, setContact] = useState(defaultContactFormData);

    const [userData, setUserData] = useState(true);

    const {user} = useAuth();

    if(userData && user){
        setContact({
            username : user.username,
            email : user.email,
            message : "",
        })
        setUserData(false);
    }

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setContact({
            ...contact,
            [name] : value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch("http://localhost:5000/api/form/contact",{
                method:"POST",
                headers:{
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify(contact)
            });

            if(response.ok){
                setContact(defaultContactFormData);
                toast.success("Message Sent Successfully!");
            }
        } catch (error) {
            toast.error("Message NOT Sent!");
            console.log(error);
        }
    }

    return (
        <>
            <section className="section-contact">

                <div className="contact-content container">
                    <h1 className="main-heading">Contact Us</h1>
                </div>

                <div className="container grid grid-two-cols">
                    <div className="contact-img">
                        <img src="/images/support.png" alt="Contact Image" />
                    </div>
                    <section className="section-form">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="username">Username</label>
                                <input type="text" name="username" id="username" autoComplete="off" required value={contact.username} onChange={handleInput} />
                            </div>
                            <div>
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" id="email" autoComplete="off" required value={contact.email} onChange={handleInput} />
                            </div>
                            <div>
                                <label htmlFor="message">Message</label>
                                <textarea name="message" id="message" cols="30" rows="6" autoComplete="off" required value={contact.message} onChange={handleInput}></textarea>
                            </div>
                            <div>
                                <button type="submit">Send</button>
                            </div>
                        </form>
                    </section>
                </div>
                <section className="mb-3">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d405689.3064817408!2d-122.370763851671!3d37.40289150787736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb68ad0cfc739%3A0x7eb356b66bd4b50e!2sSilicon%20Valley%2C%20CA%2C%20USA!5e0!3m2!1sen!2sin!4v1716619932209!5m2!1sen!2sin" width="100%" height="450" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </section>
            </section>
        </>
    )
}