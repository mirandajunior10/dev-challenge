![QRPoint](https://qrpoint.com.br/wp-content/uploads/2018/12/cropped-MarcaVertical-03-1-150x150.png)

# Desafio Backend QRPoint

O desafio consiste em criar uma API REST que será consumida por um app (Android ou iOS), para obtenção e submissão de atestados do colaborador em um determinado empregador.

O desafio pode ser realizado nas linguagens: Go, Scala, Java, JavaScript(NodeJS), TypeScript(NodeJS) ou Python. Qualquer framework pode ser utilizado.

O candidato deve dar **fork** neste repositório e após o termino do desenvolvimento, realizar um **pull request** para análise do time.

### Extra

- [x] Utilizar Docker

- Bancos de dados PostgreSQL e Redis criados e utilizados em container com docker.

- [x] Autenticação nas requisições

- JWT Bearer Token
- Senhas criptografadas.

- [x] Utilizar cache

- Cache implementado com Redis.

- [x] Miscelânia

- Estrutura do projeto em DDD, em conformidade com algumas práticas SOLID.
- TypeORM utilizado como conexão com o banco de dados principal (PostgreSQL).
- Algumas rotas foram criadas para permitir a utilização da API.

---

## Rotas públicas

### POST `/employer/` - NOVO

Este método receberá o nome de empregador, senha para autenticação e thumbnail..

```json
{
  "employer_name": "S.H.I.E.L.D",
  "password": "12345",
  "thumbnail": "https://images.unsplash.com/photo-1505489435671-80a165c60816?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2031&q=80"
}
```

| Campo         | Tipo   |
| ------------- | ------ |
| employer_name | String |
| password      | String |
| thumbnail     | String |

...registrará o empregador no banco de dados e retornará seus dados.

```json
{
  "employer_name": "S.H.I.E.L.D",
  "employer_code": "9fe52edf-b36c-4c4b-8e0b-d00313e3eae7",
  "member_count": 0,
  "thumbnail": "https://images.unsplash.com/photo-1505489435671-80a165c60816?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2031&q=80",
  "register_date": "17/08/2020"
}
```

| Campo         | Tipo   |
| ------------- | ------ |
| employer_name | String |
| employer_code | String |
| member_count  | int    |
| thumbnail     | String |
| register_date | String |

### GET `/employer/{employerCode}`

Este método receberá um código de empregador e o validará retornando os seguintes dados:

```json
{
  "employer_name": "S.H.I.E.L.D",
  "employer_code": "9fe52edf-b36c-4c4b-8e0b-d00313e3eae7",
  "member_count": 0,
  "thumbnail": "https://images.unsplash.com/photo-1505489435671-80a165c60816?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2031&q=80",
  "register_date": "17/08/2020"
}
```

| Campo         | Tipo   |
| ------------- | ------ |
| employer_name | String |
| employer_code | String |
| member_count  | int    |
| thumbnail     | String |
| register_date | String |

### POST `/employee/` - NOVO

Este método receberá o CPF, pai, mãe, atributo hand, nome e data de nascimento do colaborador...

```json
{
  "CPF": "123456789",
  "name": "Tony Stark",
  "father": "Howard Stark",
  "mother": "Maria Stark",
  "birthday": "29/05/1970"
  "hand": true,
}
```

| Campo    | Tipo    |
| -------- | ------- |
| CPF      | String  |
| name     | String  |
| father   | String  |
| mother   | String  |
| birthday | String  |
| hand     | boolean |

... o registrará no banco de dados e retornará seus dados.

```json
{
  "CPF": "123456789",
  "name": "Tony Stark",
  "father": "Howard Stark",
  "mother": "Maria Stark",
  "birthday": "29/05/1970"
  "hand": true,
}
```

| Campo    | Tipo    |
| -------- | ------- |
| CPF      | String  |
| name     | String  |
| father   | String  |
| mother   | String  |
| birthday | String  |
| hand     | boolean |

### GET `/employee/{employeeCode}` - NOVO

Este método receberá um código de colaborador na url da requisição e o validará retornando os seguintes dados:

```json
{
  "CPF": "123456789",
  "name": "Tony Stark",
  "father": "Howard Stark",
  "mother": "Maria Stark",
  "birthday": "29/05/1970"
  "hand": true,
}
```

| Campo    | Tipo    |
| -------- | ------- |
| CPF      | String  |
| name     | String  |
| father   | String  |
| mother   | String  |
| birthday | String  |
| hand     | boolean |

### POST `/check-pin/` - NOVO

Este método receberá o código do empregador e CPF do colaborador no corpo da seguinte maneira:

```json
{
  "employee_cpf": "123456789",
  "employer_code": "9fe52edf-b36c-4c4b-8e0b-d00313e3eae7"
}
```

Este método retorna o código do empregador, CPF do empregado e pin code de 5 digitos criado pela API para uso.

```json
{
  "employee_cpf": "123456789",
  "employer_code": "9fe52edf-b36c-4c4b-8e0b-d00313e3eae7",
  "pin_code": "64620"
}
```

Este método une o empregador ao colaborador, gerando um registro na tabela members, que pode ser verificado no método abaixo.

### POST `/check-pin/{employerCode}`

Este método receberá um código pin no corpo da seguinte maneira:

```json
{
  "pin_code": "64620"
}
```

O código do empregador obtido anteriormente será passado na url junto com a requisição, o validará retornando os seguintes dados:

```json
{
  "member_name": "Tony Stark",
  "member_code": 1,
  "member_personal_data": {
    "father": "Howard Stark",
    "mother": "Maria Stark",
    "hand": true
  },
  "thumbnailHd": "https://images.unsplash.com/photo-1505489435671-80a165c60816?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2031&q=80",
  "birthday": "29/05/1970"
}
```

- Member

| Campo                | Tipo       |
| -------------------- | ---------- |
| member_name          | String     |
| member_code          | int        |
| member_personal_data | MemberData |
| thumbnailHd          | String     |
| birthday             | String     |

- MemberData

| Campo  | Tipo    |
| ------ | ------- |
| father | String  |
| mother | String  |
| hand   | boolean |

### POST `/sessions`

Este método receberá o código do empregador e respectiva senha...

```json
{
  "employer_code": "9fe52edf-b36c-4c4b-8e0b-d00313e3eae7",
  "password": "12345"
}
```

| Campo         | Tipo   |
| ------------- | ------ |
| employer_code | String |
| password      | String |

...validará os dados e retornará os dados do empregador e um JWT bearer token para utilizar nas requisições de licenças médicas.

```json
{
  "employer": {
    "employer_code": "9fe52edf-b36c-4c4b-8e0b-d00313e3eae7",
    "employer_name": "S.H.I.E.L.D",
    "member_count": 1,
    "thumbnail": "https://images.unsplash.com/photo-1505489435671-80a165c60816?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2031&q=80",
    "register_date": "17/08/2020"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTc2OTQ3MzYsImV4cCI6MTU5Nzc4MTEzNiwic3ViIjoiOWZlNTJlZGYtYjM2Yy00YzRiLThlMGItZDAwMzEzZTNlYWU3In0.vS9IIb-HpPwj_fUNLmxCzP46gJ3g7Tj4EwFT-cv_swA"
}
```

### O campo token deverá ser utilizado nas rotas abaixo, ou elas retornarão erro de autenticação. O token tem duração de um dia.

---

## Rotas privadas

### POST `/submit-medical-license`

Este método receberá os parâmetros de data de início, data de fim, duração (em minutos) e o código do membro na requisição, após isso, deve escrever os dados de atestado médico no banco.

**_Validações_**

- [X] Data inicial não pode ser posterior à data atual
- [X] Data final não pode ser anterior à data atual
- [X] Campo time não pode ser superior à 8 horas (480 minutos)

```json
{
  "initial_date": "01/10/2019",
  "final_date": "03/10/2019",
  "time": 65,
  "member_code": 1
}
```

| Campo        | Tipo   |
| ------------ | ------ |
| initial_date | String |
| final_date   | String |
| time         | int    |
| member_code  | int    |

### GET `/medical-licenses`

Este método retornará todos os atestados médicos criados por membros do empregador autenticado.

```json
[
  {
    "initial_date": "01/10/2019",
    "final_date": "03/10/2019",
    "time": 65
  },
  {
    "inicial_date": "05/09/2019",
    "end_date": "05/10/2019",
    "time": 480
  }
]
```
