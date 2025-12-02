function Get(){
    fetch("https://93kz6.wiremockapi.cloud/ecoles/rubika/eleves?nom=David")
        .then(response => {
            if (!response.ok) {
                throw new Error("Réponse non valide");
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error("Erreur :", error);
        });
}


async function Post(url, data) {
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!res.ok) {
            const errText = await res.text();
            throw new Error(`HTTP ${res.status} - ${errText}`);
        }

        return await res.json();
    } 
    catch (err) {
        console.error('Erreur POST :', err);
        throw err;
    }
}

