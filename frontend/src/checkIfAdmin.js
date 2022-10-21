import React, { useSelector } from "react";
import { useNavigate } from "react-router-dom";
export default function checkIfAdmin() {
    const userLogIn = useSelector((state) => state.userLogIn);
    const { userInfo } = userLogIn;
    const navigate = useNavigate();
    if (!userInfo) {
        navigate('/')
    } else if (!userInfo.idAdmin) {
        navigate('/')
    }
}
