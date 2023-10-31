# ProjectDnB | Back-end

## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/DannielSouza/projectDnB.git
```

Entre no diretório do projeto

```bash
  cd .\server
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm start
```

# Overview

## Rotas de autênticação

#### Criação de usuário
- Retorna o usuário criado

```http
  POST /auth/register
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | **Obrigatório**. Nome do usuário. |
| `email` | `string` | **Obrigatório**. E-mail do usuário. |
| `password` | `string` | **Obrigatório**. Senha do usuário. |
| `confirmPassword` | `string` | **Obrigatório**. Confirmação de senha para segurança. |

<br>

#### Login de usuário
- Retorna o usuário e seu token

```http
  POST /auth/login
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `email` | `string` | **Obrigatório**. E-mail do usuário. |
| `password` | `string` | **Obrigatório**. Senha do usuário. |

<br>

#### Login de usuário apenas com token
- Retorna o usuário e seu token

```http
  POST /auth/token/${token}
```

<br>

#### Mudança de senha
- Retorna o usuário atualizado

```http
  POST /auth/reset
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `oldPassword` | `string` | **Obrigatório**. Senha atual do usuário. |
| `password` | `string` | **Obrigatório**. Nova senha do usuário. |
| `confirmPassword` | `string` | **Obrigatório**. Confirmação da nova senha.

<br>


## Rotas de propriedades

#### Criação de propriedade
- Retorna a propriedade criada

```http
  POST /listings
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `title` | `string` | **Obrigatório**. Titulo da propriedade. |
| `description` | `string` | **Obrigatório**. Descrição da propriedade. |
| `images` | `Array` | **Obrigatório**. Imagens da propriedade. |
| `category` | `string` | **Obrigatório**. Categoria da propriedade. |
| `roomCount` | `number` | **Obrigatório**. Quantidade de quartos. |
| `bathroomCount` | `number` | **Obrigatório**. Quantidade de banheiros. |
| `guestCount` | `number` | **Obrigatório**. Quantidade de hóspedes. |
| `location` | `string` | **Obrigatório**. Pais de localização da propriedade. |
| `price` | `string` | **Obrigatório**. Valor da diária da propriedade. |
| `userId` | `string` | **Obrigatório**. Id do usuário que está criando a propriedade. |

<br>

#### Buscar todas propriedades do usuário
- Retorna um array com todas as propriedade criadas pelo usuário

```http
  GET /listings/user/${userId}
```

<br>

#### Buscar propriedade pelo ID
- Retorna uma propriedade

```http
  GET /listings/${id}
```

<br>

#### Buscar propriedades usando filtros
- Retorna um array de propriedades

```http
  GET /listings
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `category` | `string` | **Opcional**. Categoria da propriedade. |
| `roomCount` | `number` | **Opcional**. Quantidade de quartos. |
| `bathroomCount` | `number` | **Opcional**. Quantidade de banheiros. |
| `guestCount` | `number` | **Opcional**. Quantidade de hóspedes. |
| `userId` | `string` | **Opcional**. Id do usuário que está criando a propriedade. |
| `startDate` | `string` | **Opcional**. Data de inicio da reserva. |
| `endDate` | `string` | **Opcional**. Data de fim da reserva. |

<br>

#### Exclui uma propriedade pelo ID
- Retorna uma propriedade

```http
  DELETE /listings/${id}
```

<br>

#### Busca propriedades favoritadas pelo usuário
- Retorna um array de propriedades favoritadas

```http
  GET /listings/favorites/${userId}
```

<br>

#### Cadastra imagens no banco de dados
- Retorna um array de urls das imagens cadastradas

```http
  POST /listings/image
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `images` | `array` | **Obrigatório**. Array de imagens para serem cadastradas. |

<br>



## Libs utilizadas

**Express:** framework para construir servidores com maior facilidade e desempenho;
<br/>

**Typescript:** adiciona tipagem na aplicação, contribuindo para seu crecimento e faclilidade de desenvolvimento;
<br/>

**Bcrypt:** adiciona praticidade e mais recursos no que se diz a respeito de encriptamento de dados, usando para encriptar as senhas;
<br/>

**Cors:** ferramenta essencial para habilitar ou restringir as solicitações de diferentes origens em sua aplicação;
<br/>

**Firebase-admin:** permite que você gerencie e interaja com serviços do Firebase a partir do backend de sua aplicação.
<br/>

**Lodash:** utilitários JavaScript que fornece muitas funções úteis para manipulação de dados, operações em arrays e objetos, além de facilitar o desenvolvimento em JavaScript.
<br/>

**Mongoose:** simplifica a interação com bancos de dados MongoDB, fornecendo um modelo de dados, validação e funcionalidades avançadas de consulta.
<br/>

**Multer:** middleware para o Node.js que facilita o upload de arquivos.
