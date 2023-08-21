'use client'

import { NEXT_PUBLIC_CORBADO_PROJECT_ID } from "@/utils/environment";
import Corbado from "@corbado/webcomponent";
import '@corbado/webcomponent/pkg/auth_cui.css'
import { useEffect, useState } from "react";

const CORBADO_PROJECT_ID = NEXT_PUBLIC_CORBADO_PROJECT_ID;
const corbado = new Corbado.Session(CORBADO_PROJECT_ID);

const CorbadoAuth = () => {
    console.log("CORBADO_PROJECT_ID", CORBADO_PROJECT_ID);
    const session = new Corbado.Session(CORBADO_PROJECT_ID);
    let [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        session.refresh(user => {
            setCurrentUser(user);
        });
    }, [session]);

    return (
        <div>
            <corbado-auth project-id={CORBADO_PROJECT_ID} conditional="yes">
                <input id="corbado-username" autoComplete="webauthn" name="username" required />
            </corbado-auth>
        </div>
    )

}

export default CorbadoAuth
