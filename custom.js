let vizor = document.getElementById("vizor");

// Inicializa o visor com 0
vizor.value = '0';

// INFO:Função para pegar o valor do botão clicado
function pegar_valor(valor) {
    if (valor === '=') {
        calcular();
    } else if (vizor.value === '0' || vizor.value === 'Erro') {
        vizor.value = valor; // Substitui 0 ou Erro por novo valor
    } else {
        // Evita valores consecutivos inválidos como operadores repetidos ou pontos extras
        if (is_operador_repetido(valor)) return;
        vizor.value += valor; // Adiciona o valor ao visor
    }
}

// INFO:Função para calcular a expressão
function calcular() {
    try {
        // Substitui símbolos para evitar problemas (ex.: × para *, ÷ para /)
        let expressao = vizor.value.replace(/×/g, '*').replace(/÷/g, '/');

        // Valida se a expressão é matemática válida antes de avaliar
        if (!is_expressao_valida(expressao)) {
            vizor.value = "Erro";
            return;
        }

        let resultado = Function('"use strict"; return (' + expressao + ')')(); // Alternativa ao eval
        vizor.value = resultado; // Mostra o resultado no visor
    } catch (error) {
        vizor.value = "Erro"; // Mostra "Erro" se a expressão for inválida
    }
}

// INFO:Função para limpar o visor
document.getElementById("C").onclick = function() {
    vizor.value = '0'; // Limpa o visor colocando um 0
};

// INFO:Valida se a expressão é matemática válida
function is_expressao_valida(expressao) {
    // Evita operadores consecutivos e verifica formato geral
    const regex_valida = /^[\d.]+([+\-*/][\d.]+)*$/;
    return regex_valida.test(expressao);
}

// INFO:Evita operadores repetidos ou pontos consecutivos
function is_operador_repetido(valor) {
    const operadores = ['+', '-', '*', '/', '.'];
    const ultimo_caractere = vizor.value.slice(-1);

    // Verifica se o último caractere e o atual são operadores repetidos
    if (operadores.includes(ultimo_caractere) && operadores.includes(valor)) {
        return true;
    }

    // Evita pontos duplicados em um mesmo número
    if (valor === '.' && vizor.value.split(/\D+/).slice(-1)[0].includes('.')) {
        return true;
    }

    return false;
}
