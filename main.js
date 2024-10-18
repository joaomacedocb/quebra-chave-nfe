function nomeDoMes(mes) {
    const meses = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    return meses[parseInt(mes) - 1];
}

function quebrarChave(chave) {
    const ano = chave.substring(2, 4);
    const mesNumero = chave.substring(4, 6);
    const mesNome = nomeDoMes(mesNumero);

    return {
        chaveCompleta: chave,
        uf: chave.substring(0, 2),
        ano: `20${ano}`,
        mes: mesNome,
        cnpj: chave.substring(6, 20),
        modelo: chave.substring(20, 22),
        serie: chave.substring(22, 25),
        numero: chave.substring(25, 34),
        codigoNumerico: chave.substring(34, 42),
        digitoVerificador: chave.substring(42, 43)
    };
}

document.getElementById('chaveForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const chaveInput = document.getElementById('chaveInput').value;
    const chaves = chaveInput.split('\n').map(chave => chave.trim()).filter(chave => chave !== "");

    const tbody = document.querySelector("#tabelaResultado tbody");
    tbody.innerHTML = '';

    chaves.forEach(chave => {
        if (chave.length !== 44 || isNaN(chave)) {
            alert(`A chave de acesso "${chave}" deve conter exatamente 44 dígitos numéricos.`);
        } else {
            const partes = quebrarChave(chave);

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${partes.chaveCompleta}</td>
                <td>${partes.uf}</td>
                <td>${partes.ano}</td>
                <td>${partes.mes}</td>
                <td>${partes.cnpj}</td>
                <td>${partes.modelo}</td>
                <td>${partes.serie}</td>
                <td>${partes.numero}</td>
                <td>${partes.codigoNumerico}</td>
                <td>${partes.digitoVerificador}</td>
            `;
            tbody.appendChild(row);
        }
    });
});

document.getElementById('copiarDados').addEventListener('click', function () {
    const tabela = document.getElementById('tabelaResultado');
    let texto = '';

    for (let i = 0; i < tabela.rows.length; i++) {
        let row = tabela.rows[i];
        for (let j = 0; j < row.cells.length; j++) {
            texto += row.cells[j].innerText + (j === row.cells.length - 1 ? '' : '\t');
        }
        texto += '\n';
    }

    navigator.clipboard.writeText(texto)
        .then(() => {
            alert('Dados da tabela copiados com sucesso!');
        })
        .catch(err => {
            alert('Erro ao copiar os dados: ', err);
        });
});