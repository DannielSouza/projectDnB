
# ProjectDnB | Front-end

Este projeto teve como forte inspiraçção o site do AirBnB e outros sites de reservas, fazendo um mix de pontos positivos e interessantes que eu vi neles e trazendo como melhorias no projeto, como está descrito no Readme na raiz do projeto.
## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/DannielSouza/projectDnB.git
```

Entre no diretório do projeto

```bash
  cd .\bnb
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run dev
```

## Overview

<table>
<tr>
<td>
  
**Home:** Ao entrar no site, é exibida uma tela com todas as propriedades atuais, onde ao passar o mouse sobre elas, o card é expandido e exibindo informações adicionais que são o número de quartos, banheiros e hóspedes suportados, além também de ser possivel visualizar outras as outras imagens da propriedade.
<br/>
<br/>
<img src="https://github.com/DannielSouza/projectDnB/assets/104663666/f34273b5-edc3-4443-ab1e-35b76bb0639d" />
</td>
</tr>
</table>
<br/>
<br/>
<br/>


<table>
<tr>
<td>    
  
**Pesquisa:** Quando clicamos na barra de pesquisa, localizada na navbar, é aberto um modal com todos os tipos de filtros separados por etapas, sendo elas local, datas de hospedagem e quantidade de quartos, banheiros e hóspedes. Caso não haja nenhuma propriedade que atenda os requisitos da pesquisa, é exibida uma mensagem na tela e o botão de resetar os filtros. Também é possivel filtrar apenas pelo tipo da propriedade, clicando nos tipos de propriedades abaixo da navbar.
<br/>
<div align="center" style="display: flex">
 <img width="49%" src="https://github.com/DannielSouza/projectDnB/assets/104663666/f01dc006-443f-4d36-b795-1f1084124bba"/>
 <img width="49%" src="https://github.com/DannielSouza/projectDnB/assets/104663666/87f1f8f4-dc83-41a1-a5c8-0a5a59cbc37d"/>
</div>
</td>
</tr>
</table>
<br/>
<br/>
<br/>

<table>
<tr>
<td>        
  
**Login e Registro:** Ao clicar no menu do usuário localizado na navbar, é aberto um menu com as opções de entrar e registrar-se, onde a depender da opção selecionada, é aberto um modal para concluir o processo. O modal de entrar também é aberto caso o usuário clique no botão de adicionar propriedade ou tentar fazer uma avaliação sem estar logado.
<br/>
<br/>
<img src="https://github.com/DannielSouza/projectDnB/assets/104663666/5e2f86d7-38e0-4b8e-9fa8-363cf61f0f12" />
</td>
</tr>
</table>
<br/>
<br/>
<br/>

<table>
<tr>
<td width="50%">
<p><strong>Criação de propriedade:</strong> Clicando no botão de adicionar propriedade localizado na navbar ou no menu de usuário, é aberto um modal onde se dará início à criação. Após fornecer todas as informações necessárias e criar, o usuário é redirecionado para uma página onde contém todas suas propriedades já criadas.</p>
</td>
<td width="50%">
<img src="https://media.giphy.com/media/kBI5S0wCYAxwpkjfIE/giphy.gif" />
</td>
</tr>
</table>
<br/>
<br/>
<br/>

<table>
<tr>
<td>
<p><strong>Página da propriedade:</strong> Nela você encontra as três primeiras imagens da propriedade, nota e comentários, descrição, mapa, calendário de dias disponíveis e a opção de fazer uma reserva. </p>
<p><strong>Clique nas imagens para ver com mais detalhes.</strong></p>
</td>
<td>
<img src="https://github.com/DannielSouza/projectDnB/assets/104663666/3f382790-f209-418c-b05f-fce7741f90f3" />
</td>
<tr>
<tr>
<td>
Clicando em "Mostrar mais fotos" é aberta uma tela onde contém todas as imagens.
</td>
<td>
<img src="https://github.com/DannielSouza/projectDnB/assets/104663666/ee49eb30-7ec5-4065-8344-8102e9543c32" />
</td>
</tr>
</table>
<br/>
<br/>
<br/>


<table>
<tr>
<td>    
<strong>Avaliação de propriedade:</strong> Clicando nas estrelas que simbolizam a nota do estabelecimento, é aberto um modal onde é possivel adicionar um comentário e escolher a nota para determinado estabelecimento.
<br/>
<div align="center" style="display: flex">
 <img width="49%" src="https://github.com/DannielSouza/projectDnB/assets/104663666/6def23fb-db19-4fb7-a12b-8c80b8ffac0a"/>
 <img width="49%" src="https://github.com/DannielSouza/projectDnB/assets/104663666/54789b8e-b8a1-4fc0-b7d4-dcf20aea21e3"/>
</div>
</td>
</tr>
</table>
<br/>
<br/>
<br/>

<table>
<tr>
<td width="50%">
<p><strong>Menu de usuário:</strong> Clicando no menu de usuário, é aberto um menu com diversas páginas possiveis para serem acessadas.</p>
<p>Minha conta: Tela de opções da conta do usuário, onde nela é possivel altear sua foto, email, gênero, data de nascimento e senha da conta.</p>
<p>Minhas viagens: Tela onde é exibido todas as reservas feitas por você em propriedade de terceiros.</p>
<p>Minhas reservas: Tela onde é exibido todas as reservas feitas outros usuários em suas propriedades.</p>
<p>Minhas casas: Tela onde é exibido todas propriedades cadastradas por você.</p>
<p>Favoritos: Tela onde é exibido todas as propriedades que você marcou como favorito.</p>
<p>Adicionar propriedade: Abre o modal de criação de propriedade.</p>
<p>Sair: Desloga da sua conta.</p>
</td>
<td width="50%">
<img src="https://github.com/DannielSouza/projectDnB/assets/104663666/59f28247-1c1c-4f2a-9a9d-f03c054d4fdf" />
</td>
</tr>
</table>
<br/>
<br/>
<br/>


## Libs utilizadas

**React:** biblioteca JavaScript para construir interfaces de usuário interativas;
<br/>

**Next:** framework para construir aplicativos web do lado do servidor usando React;
<br/>

**Typescript:** adiciona tipagem na aplicação, contribuindo para seu crecimento e faclilidade de desenvolvimento;
<br/>

**Js-cookie:** manipução dos cookies com mais facilidade, usado na autenticação;
<br/>

**React-leaflet:** exibição dos mapas; 
<br/>

**TailwindCSS:** estilização de todo o site;
<br/>

**Query-string:** manipução e criação de queries na url com mais facilidade, usado nas pesquisas;
<br/>

**React-date-range:** criação de inputs de range de datas e manipula-los com maior facilidade e eficiência;
<br/>

**React-icons:** icones otimizados e de fácil estilização;
<br/>

**React-hook-form:** formulários mais simples e sem repetir código;
<br/>

**React-select:** input de select flexivel e de maior facilidade de implementação;
<br/>

**React-hot-toast:** mensagens de feedbacks pós ação para o usuário;
<br/>

**React-responsive-carousel:** carrossel de imagens simples e responsivo, utilizado nos cads; 
<br/>

**React-spinners:** componentes de carregamentos com fácil uso e estilização;
<br/>

**React-star-rating:** componentes e funcionalidades de avaliação facilitados;
<br/>

**World countries:** Nomes de paises e cidades de todo o mundo com mais facilidade;
<br/>

**Zustand:** Armazenamento de estados e funções globais com o uso de hooks;
<br/>
