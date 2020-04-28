export const getEvent = async () => {
    let url = 'http://localhost:9090/eventinfo/api/event/get';
    try{
        const response = await fetch(url, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.token
            }
        });
        return response;
    }
    catch(error){
        console.log(error);
    }
}

export const sendMail = async (email) => {
    let url = 'http://localhost:9090/report/api/sendmail?email=' + email;
    try{
        const response = await fetch(url, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.token
            }
        });
        return response;
    }
    catch(error){
        console.log(error);
    }
}