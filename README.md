# coursesio
## Este projeto foi desenvolvido enquanto eu fazia parte da Startup de tecnologia para área da saúde **Zhealth Blockchain**. O propósito do desenvolvimento desse projeto foi melhorar minhas habilidades como programador backend utilizando as tecnlogias AdonisJS e MaterialUI
### A regra de negócio diz que um adm poderá se cadastrar, visualizar os usuários e informações sobre os cursos que ele criará. O usuário poderá se cadastrar no sistema, vincular-se à um curso e visualizar os outros integrantes desse curso.
### Para rodar a aplicação, baixe o backend e front end, execute o comando "npm install" dentro da root de cada um dos dois projetos e posteriormente à isso poderá startar o servidor através do comando "adonis serve --dev" no backend e "yarn start" no front end.
#### As rotas para consumo do software insonmia está nesse diretório e as rotas para consumo serão
  * ##### /users - POST **
    - (O sistema se inicia com o adm já cadastrado). Essa rota possibilitará o auto cadastro de um usuário
  * ##### /authenticate - POST
    - Realiza a autenticação e se o usuário for atenticado, recebe um token JWT
  * ##### /users - GET - Auth
    - APENAS PARA ADM, buscará todos os usuários e mostrará à quantos cursos ele está vinculado
  * ##### /users/:id - GET - Auth
    - APENAS PARA ADM, busca apenas um usuário e trás suas informações, informações dos cursos vinculados e quantidade de cursos
  * ##### /users/:id - PUT - Auth
    - APENAS PARA O USER/ADM SOLICITANTE, altero seus dados com exceção do tipo de perfil (O que determina se é adm ou user)
  * ##### /users/:id - DELETE - Auth
    - Permite que um adm apague qualquer user, um user possa se apagar mas não permite que o adm apaga a si mesmo
  * ##### /courses - POST - Auth
    - APENAS PARA ADM, permite o cadastro de um curso
  * ##### /courses - GET - Auth
    - APENAS PARA ADM, visualizará todos os cursos cadastrados e quantos usuários estão vinculados à esse curso 
    - APENAS PARA USER, visualizará todos os cursos
  * ##### /courses/:id - GET - Auth
    - APENAS PARA ADM, visualizará o curso com informações a mais que o user e visualizará todos os usuários vinculados à esse curso
    - APENAS PARA USER, visualizará o curso com menores informações e conseguirá visualizar todos os outros integrantes do curso
  * ##### /courses/:id - PUT - Auth
    - APENAS ADM, realiza update do curso
  * ##### /courses/:id - DELETE - Auth
    - APENAS ADM, irá fazer o delete de um curso
  * ##### /subscription/courses/:id - POST - Auth
    - APENAS USER, poderá se vincular à um curso
  * ##### /subscription/courses - GET - Auth 
    - APENAS USER, visualizará todos os cursos que estiver vinculado
  * ##### /subscription/courses/:id - GET - Auth
    - APENAS USER, visualizará todos os usuários que estiverem vinculados ao mesmo curso que o seu (como se ele estivesse dentro de um grupo)
  * ##### /subscription/courses/:id - DELETE - Auth 
    - APENAS USER, desvincula-se de um curso 
