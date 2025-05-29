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
            font-size: 1.1rem;
            font-weight: 400;
            text-align: center;
        }
    </style>


</head>

<body style="font-size: 14px;">

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

            <tr>
                <td style="font-weight: 700;">De M : </td>
                <td>{{$personne['nom']}}</td>
                <td></td>
            </tr>

            <tr>
                <td style="font-weight: 700;">La somme de : </td>
                <td>{{$montant['paye']}}</td>
                <td></td>
            </tr>

            <tr>
                <td style="font-weight: 700;">Pour : </td>
                <td>{{$paiement['motif']}}</td>
                <td></td>
            </tr>

            <tr>
                <td style="font-weight: 700;">Reste : </td>
                <td>{{$montant['reste']}}</td>
                <td></td>
            </tr>

            <tr style="text-align: center;">
                <td></td>
                <td></td>
                <td>
                    <div>Signature</div>
                    <div style="margin-top: 1.25rem;">{{$signataire['nom']}}</div>
                </td>
            </tr>


        </tbody>
    </table>
</body>

</html>