@component('mail::message')

Cher(e) {{$data['nom']}},

<p>Nous sommes ravis de vous informer que votre compte sur {{$data['plateforme']}} a été créé avec succès.</p>

Voici vos informations de connexion :

<ul>
    <li>Adresse e-mail : $data['email']</li>
    <li>Mot de passe : $data['password']</li>
</ul>

<p>Vous pouvez vous connecter en utilisant ces informations sur notre site [lien du site] dès maintenant. Nous vous encourageons à changer votre mot de passe dès votre première connexion pour des raisons de sécurité.</p>

<p>Si vous avez oublié votre mot de passe, vous pouvez réinitialiser votre mot de passe en utilisant l'option "Mot de passe oublié" sur la page de connexion.</p>


Cordialement,
[NOM ENVOYER]
[FONCTION ENVOYER]
@endcomponent