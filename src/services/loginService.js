export const login = async (username,password) => {
    let data = {
        'userId':username,
        'password' : password
    }
    let url = 'http://localhost:9090/auth/api/login';
    try{
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response;
    }
    catch(error){
        console.log(error);
    }
} 