//On importe le module express (il doit être installé avec "npm install express")
import express from 'express';
import contacts from "./db/mock-contacts.mjs";
// On crée une application Express
const app = express();
// On définit le port sur lequel le serveur va écouter
const port = process.env.PORT || 3000;

app.use(express.json());

// On crée une route GET sur la racine ("/")
// Quand un utilisateur ouvre http://localhost:3000/ dans son navigateur,
// cette fonction est appelée et envoie la liste des contacts en réponse
app.get("/", (req, res) => {
    res.json({contacts});
});

app.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const contact = contacts.find(contact => contact.id === id);
    res.json({contact});
});


// On démarre le serveur et on lui dit d’écouter sur le port défini
// Une fois lancé, le message est affiché dans la console
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})