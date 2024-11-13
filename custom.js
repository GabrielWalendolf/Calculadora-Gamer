let vizor = document.getElementById("vizor");

// INFO:Função para pegar o valor do botão clicado
function pegar_valor(valor) {
    if (valor === '=') {
        calcular();
    } else {
        vizor.value += valor; // INFO:Adiciona o valor ao visor
    }
}

// INFO:Função para calcular a expressão
function calcular() {
    try {
        // INFO:Avalia a expressão matemática
        let resultado = eval(vizor.value);
        vizor.value = resultado; // INFO:Mostra o resultado no visor
    } catch (error) {
        vizor.value = "Erro"; // INFO:Mostra "Erro" se a expressão for inválida
    }
}

// INFO:Função para limpar o visor
document.getElementById("C").onclick = function() {
    vizor.value = ''; // INFO:Limpa o visor
};