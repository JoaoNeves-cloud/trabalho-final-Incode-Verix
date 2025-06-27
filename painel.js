document.addEventListener('DOMContentLoaded', () => {
    const botoesDetalhes = document.querySelectorAll('.botao-detalhes');
    const secaoDetalhesProcesso = document.querySelector('.secao-detalhes-processo');

    botoesDetalhes.forEach(botao => {
        botao.addEventListener('click', (evento) => {
            const linhaProcesso = evento.target.closest('.linha-processo');
            const processoId = linhaProcesso.dataset.processoId;
            const cartaoDetalhesId = `detalhes-processo-${processoId}`;
            const cartaoDetalhes = document.getElementById(cartaoDetalhesId);

           
            document.querySelectorAll('.cartao-detalhes-processo').forEach(cartao => {
                cartao.style.display = 'none';
            });

          
            if (cartaoDetalhes) {
                cartaoDetalhes.style.display = 'block';
            } else {
 
                console.warn(`Cartão de detalhes para o processo ${processoId} não encontrado.`);
              
            }
        });
    });
});