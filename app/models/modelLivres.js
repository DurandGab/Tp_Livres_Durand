const nano = require('nano')('http://Gabindx1:Shyvanalabest2_@127.0.0.1:5984');
let dbLivres = nano.db.use('livres');

const  listeLivres = async () => {
    const query = {
        "selector": {},
        "fields": ["numero", "titre", "pages"],
        "sort": ["titre", "numero", "pages"],
    };
    try {
        let livres = await dbLivres.find(query);
        return livres.docs
    } catch (error) {
        console.error("Error fetching livres:", error);
        throw error
    }
}

const Livre = async (getNumero) => {
    const query = {
        "selector":{"numero" : getNumero},
        "fields": ["titre", "pages"],
    }
    try {
        let livres = await dbLivres.find(query);
        return livres.docs[0]
    } catch (error) {
        console.error("Error fetching livres:", error);
        throw error
    }
}

const LivrePages = async (getNumero) => {
    const query = {
        "selector":{"numero" : getNumero},
        "fields": ["pages"],
    }
    try {
        let livres = await dbLivres.find(query);
        return livres.docs[0].pages
    } catch (error) {
        console.error("Error fetching livres:", error);
        throw error
    }
}

const LivrePage = async (getNumero) => {
    const query = {
        "selector":{"numero" : getNumero},
        "fields": ["pages"],
    }
    try {
        let livres = await dbLivres.find(query);
        return livres.docs[0].pages
    } catch (error) {
        console.error("Error fetching livres:", error);
        throw error
    }
}

const NewLivre = async (newLivre) => {
    try {
        let insertLivre = await dbLivres.insert(newLivre);
        return insertLivre
    } catch (error) {
        console.error("Error fetching livres:", error);
        throw error
    }
}

const GetLivreByNumber = async (numLivreToUpdate) => {
    const query = {
        "selector": { "numero": numLivreToUpdate },
        "fields": ["_id", "_rev"],
    };

    try {
        const livreToGet = await dbLivres.find(query);
        return livreToGet.docs[0];
    } catch (error) {
        throw error;
    }
}

const UpdateLivre = async (updatedLivre) => {
    try {
        const updatedLivreResult = await dbLivres.insert(updatedLivre);
        return updatedLivreResult;
    } catch (error) {
        throw error;
    }
}

const DeleteLivre = async (id, rev) => {
    try {
        const result = await dbLivres.destroy(id, rev);
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = { listeLivres, Livre, LivrePages, LivrePage, NewLivre, GetLivreByNumber, UpdateLivre, DeleteLivre }