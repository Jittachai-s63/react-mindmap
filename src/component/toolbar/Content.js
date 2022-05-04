import React from "react";
import "./modal.css";

export default ({ close }) => (
    <div className="modal">
        <a className="close" onClick={close}>
        &times;
        </a>
        <div className="content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a nostrum.
            Dolorem, repellat quidem ut, minima sint vel eveniet quibusdam voluptates
            delectus doloremque, explicabo tempore dicta adipisci fugit amet
            dignissimos?
            <br />
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur sit
            commodi beatae optio voluptatum sed eius cumque, delectus saepe
            repudiandae explicabo nemo nam libero ad, doloribus, voluptas rem alias.
            Vitae?
        </div>
    </div>
);