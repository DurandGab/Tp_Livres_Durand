const modelLivres = require("../models/modelLivres.js");

const getLivres = async (req, res) => {
    try {
        const livres = await modelLivres.listeLivres(req, res);
        res.json(livres);
    } catch (error) {
        console.error("Error in getLivres:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const getLivre = async (req, res) => {
    const getNumero = parseInt(req.params.numlivre, 10);

    try {
        const livre = await modelLivres.Livre(getNumero);
        if (!livre || livre.length === 0) {
            return res.status(404).json({ error: "Aucun livre trouvé avec ce numéro" });
        }
        res.json(livre);
    } catch (error) {
        console.error("Error in getLivres:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const getLivrePages = async (req, res) => {
    const getNumero = parseInt(req.params.numlivre, 10);

    try {
        const livre = await modelLivres.LivrePages(getNumero);
        if (!livre || livre.length === 0) {
            return res.status(404).json({ error: "Aucun livre trouvé avec ce numéro" });
        }
        res.json(livre);
    } catch (error) {
        console.error("Error in getLivres:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const getLivrePage = async (req, res) => {
    const getNumero = parseInt(req.params.numlivre, 10);
    const getNumPage = parseInt(req.params.numpage, 10);

    try {
        const livre = await modelLivres.LivrePages(getNumero);
        if (!livre || livre.length === 0) {
            return res.status(404).json({ error: "Aucun livre trouvé avec ce numéro" });
        }
       
        if (getNumPage < 1 || getNumPage > livre.length) {
            return res.status(404).json({ error: "Numéro de page invalide" });
        }
        res.json(livre[getNumPage - 1]);
    } catch (error) {
        console.error("Error in getLivres:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const postLivre = async (req, res) => {
    const { numero, titre, pages} = req.body;

    if (!numero || !titre || !pages) {
        return res.status(400).json({ error: "il manque certaines info pour ajouter un livre" });
    }

    const newLivre = {
        numero,
        titre,
        pages
    };

        const { value, error } = schema.validate(newLivre);
        if (error == undefined) {
            const insertLivre = await modelLivres.NewLivre(newLivre);
            res.status(201).json(insertLivre);
        } else {
            res.status(500).json({ error: error });
        }
}

const putLivre = async (req, res) => {
    const numLivreToUpdate = parseInt(req.params.numlivre, 10);
    const livreToGet = await modelLivres.GetLivreByNumber(numLivreToUpdate);

    if (!livreToGet) {
        return res.status(404).json({ error: 'Livre non trouvé' });
    }

    const { numero, titre, pages } = req.body;
    const validateUpdatedLivre = { numero, titre, pages };

    const { value, error } = schema.validate(validateUpdatedLivre);

    if (error) {
        return res.status(500).json({ error: error });
    }

    const updatedLivre = {
        _id: livreToGet._id,
        _rev: livreToGet._rev,
        numero,
        titre,
        pages
    };

    try {
        const updatedLivreResult = await modelLivres.UpdateLivre(updatedLivre);
        res.status(201).json(updatedLivreResult);
    } catch (error) {
        console.error('Error updating livre:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const deleteLivre = async (req, res) => {
    const numLivreToUpdate = parseInt(req.params.numlivre, 10);
    const livreToDelete = await modelLivres.GetLivreByNumber(numLivreToUpdate);

    if (!livreToDelete) {
        return res.status(404).json({ error: 'Livre non trouvé' });
    }
    try {
        const result = await modelLivres.DeleteLivre(livreToDelete._id, livreToDelete._rev);

        if (result.n === 0) {
            return res.status(404).json({ error: 'Livre non trouvé' });
        }

        res.status(200).json({ message: 'Livre supprimé' });
    } catch (error) {
        console.error('Erreur lors de la suppression du livre:', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
}

const Joi = require('joi').extend(require('@joi/date'));
const schema = Joi.object({
    numero: Joi.number()
        .integer()
        .min(1)
        .required(),
    titre : Joi.string()
        .min(3)
        .required(),
    pages : Joi.array()
        .items(Joi.string())
        .min(1)
        .required()
})



module.exports = {getLivres, getLivre, getLivrePages, getLivrePage, postLivre, putLivre, deleteLivre}