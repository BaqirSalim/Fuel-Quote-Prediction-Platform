//schema for login
// {
//     username: "string",
//     password: "string"
// }

export function useLogin() {
    const [logins, setLogins] = useState([]);

    const addLogin = (newLogin) => {
        setLogins([...logins, newLogin]);
    };

    return {logins, addLogin};
}