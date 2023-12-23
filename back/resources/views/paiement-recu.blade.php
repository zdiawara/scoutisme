<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Récu paiement</title>
    <style>
        @font-face {
            font-family: "OpenSans";
            src:url("{{storage_path('fonts/OpenSans-Light.ttf')}}");
            font-weight: 300;
            font-style: normal
        }

        @font-face {
            font-family: "OpenSans";
            src:url("{{storage_path('fonts/OpenSans-Regular.ttf')}}");
            font-weight: 400;
            font-style: normal;
        }

        @font-face {
            font-family: "OpenSans";
            src:url("{{storage_path('fonts/OpenSans-SemiBold.ttf')}}");
            font-weight: 700;
            font-style: normal;
        }

        body {
            font-family: 'OpenSans';
            font-weight: 400;
        }

        .header {
            vertical-align: top;
        }

        .header-title {
            font-size: 1.2rem;
            font-weight: 700;
            margin-bottom: 1rem;
            text-align: center;
        }
    </style>


</head>

<body>

    <table style="width:100%">

        <tbody>

            <tr class="header">
                <td style="padding-bottom: 1rem;">
                    <img src="data:image/png;base64,{{ base64_encode(file_get_contents(public_path('img/logo.png'))) }}" width="90" />
                </td>
                <td class="header-title">
                    <div class="header-title">{{$association['nom']}}</div>
                    <div class="header-adresse">{{$association['adresse']}}</div>
                </td>
                <td>
                    <div style="font-size: 1.5rem">BPF</div>
                    <div>Reçu N° : {{$paiement['numero']}}</div>
                    <div>Date : {{$paiement['date']}}</div>
                </td>
            </tr>

            <tr style="padding-top: 1rem;">
                <td style="padding-bottom: 0.8rem">De M : </td>
                <td>{{$personne['nom']}}</td>
                <td>-</td>
            </tr>

            <tr>
                <td>La somme de : </td>
                <td>{{$montant['paye']}}</td>
                <td>-</td>
            </tr>

            <tr>
                <td style="padding-top: 2rem; padding-bottom: 2rem;">Pour : </td>
                <td>{{$paiement['motif']}}</td>
                <td>-</td>
            </tr>

            <tr>
                <td>Reste : </td>
                <td>{{$montant['reste']}}</td>
                <td>-</td>
            </tr>

            <tr style="text-align: center;">
                <td></td>
                <td style="padding-top: 2rem;">
                    <div>Signature</div>
                    <div style="margin-top: 2.5rem;">{{$signataire['nom']}}</div>
                </td>
                <td>-</td>
            </tr>


        </tbody>
    </table>
</body>

</html>