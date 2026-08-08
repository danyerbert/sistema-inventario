<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: sans-serif; font-size: 11px; }
        h1 { font-size: 16px; margin-bottom: 4px; }
        p.subtitle { color: #666; margin-top: 0; margin-bottom: 16px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
        th, td { border: 1px solid #ccc; padding: 6px 8px; text-align: left; }
        th { background-color: #f3f3f3; }
        h2 { font-size: 13px; margin-top: 24px; }
    </style>
</head>
<body>
    <h1>Inventario de equipos</h1>
    <p class="subtitle">Generado el {{ now()->format('d/m/Y H:i') }} — Total: {{ $total }} equipos</p>

    <table>
        <thead>
            <tr>
                <th>N° inventario</th>
                <th>Tipo</th>
                <th>Marca</th>
                <th>Serial</th>
                <th>Puesto</th>
                <th>Estado</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($equipos as $equipo)
                <tr>
                    <td>{{ $equipo->property_number }}</td>
                    <td>{{ $equipo->typeOfEquipment->type_of_equipment }}</td>
                    <td>{{ $equipo->brand->name_brand }}</td>
                    <td>{{ $equipo->serial }}</td>
                    <td>{{ $equipo->workstation->number_workstation ?? '—' }}</td>
                    <td>{{ $equipo->operationalStatus->operational_status }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <h2>Desglose por tipo de equipo</h2>
    <table style="width: 300px;">
        <thead>
            <tr>
                <th>Tipo</th>
                <th>Cantidad</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($resumen as $tipo => $cantidad)
                <tr>
                    <td>{{ $tipo }}</td>
                    <td>{{ $cantidad }}</td>
                </tr>
            @endforeach
            <tr>
                <td><strong>Total</strong></td>
                <td><strong>{{ $total }}</strong></td>
            </tr>
        </tbody>
    </table>
</body>
</html>