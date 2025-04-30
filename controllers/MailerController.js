const nodemailer = require('nodemailer');


// Crée un transporteur SMTP
let transporter = nodemailer.createTransport({
    service: 'gmail', // Peut être remplacé par un autre service comme Outlook, Yahoo, etc.
    auth: {
        user: 'exemple@gmail.com', // Adresse e-mail
        pass: 'swpz swpz swpz swpz'       // Mot de passe d'application généré par le service d'email
    }
});

// Définis les options de l'e-mail
let mailOptions = {
    from: 'exemple@gmail.com',         // L'expéditeur
    to: 'exemple@et.client.fr',     // Destinataire(s)
    subject: 'Test d\'envoi de mail avec Node.js', // Sujet de l'e-mail
    text: 'Salut ! Ceci est un test d\'envoi de mail avec Nodemailer.', // Contenu en texte brut
    html: '<b>Salut !</b> Ceci est un test d\'envoi de mail avec Nodemailer.' // Contenu en HTML
};

// Envoie l'e-mail
exports.sendMail = function (req,res) {
    transporter.sendMail(mailOptions, function(error, info){
        console.log("begin send mail");
        
        if (error) {
            console.log(error);
        } else {
            console.log('Email envoyé : ' + info.response);
            res.send("Mail envoyé ")
        }
    });
}
