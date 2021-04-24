import React, { useEffect, useState } from "react";

export const RegisterUser = () => {
    const [form, setForm] = useState({
        name: '',
        password: ''
    })
    return (
        <div>
            <h1>Register</h1>
            <form>
                <label>
                    Username:
                    <input name="username" value={form.name} />  
                </label>
                <label>
                    Password:
                    <input name="password" value={form.password} />  
                </label>
                <button type="submit">Register</button>
            </form>
        </div>
    )
}