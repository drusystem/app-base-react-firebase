import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

export const registerUser = async (email,password) =>{
    const usuarioRegistrado = await createUserWithEmailAndPassword(auth,email,password)
    return usuarioRegistrado;
}