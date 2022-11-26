import React, { useEffect } from "react";

function Contact() {

    useEffect(() => {
        window.location.href = "http://localhost:8080/api/campusnet/login ";
    }, []);

    return (
        <div>
            <h2>Contact</h2>
        </div>
    );
}

export default Contact;