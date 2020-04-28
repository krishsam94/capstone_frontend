export const register = async (username, password) => {
    let data = {
        'userId': username,
        'password': password,
        'cpassword': password
    }
    let url = 'http://localhost:9090/auth/api/register';
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
        console.log(error)
    }
    
} 