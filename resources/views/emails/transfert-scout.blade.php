@component('mail::message')

<p>Bonjour,</p>

<p>Je souhaite demander le transfert du scout <strong>{{ $data['nomScout'] }}</strong> N° <strong>{{ $data['numeroScout'] }}</strong>
    de l’unité <strong>{{ $data['uniteDepart'] }}</strong> vers ton unité <strong>{{ $data['uniteArrivee'] }}</strong>.</p>

<p>Merci de confirmer si vous êtes d’accord afin que nous puissions régulariser la situation.</p>

<p>
    <a href="{{ $data['confirmationUrl'] }}"
        style="display:inline-block;padding:10px 20px;background-color:#007BFF;color:#ffffff;
                  text-decoration:none;border-radius:5px;">
        Confirmer le transfert
    </a>
</p>

<p>Fraternellement,<br>
    {{ config('app.name') }}
</p>

@endcomponent