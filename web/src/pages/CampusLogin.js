import React, { useEffect } from "react";

function Contact() {

    useEffect(() => {
        window.location.href = "https://nem.grp1.diplomportal.dk/api/campusnet/login ";
    }, []);

    return (
        <div>
            <h2>Contact</h2>
        </div>
    );
}

export default Contact;