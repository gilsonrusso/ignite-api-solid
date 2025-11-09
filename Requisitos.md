# GymPass - Academia

## Requisitos Funcionais - RFs (Funcionalidade da aplicaca, oque é possivel o usuario fazer na aplicacao. nao confunda as funcionalidades com rotas da aplicacao. nao necesariamente)

- [ ] Deve ser possivel se cadastrar.
- [ ] Deve ser possivel se autenticar.
- [ ] Deve ser possivel obter o perfil de um usuario logado.
- [ ] Deve ser possivel obter o numero de ckeck-ins realizados pelo o usuario logado.
- [ ] Deve ser possivel o usuario ober seu historico de check-ins.
- [ ] Deve ser possivel o usuario buscar academias proximas.
- [ ] Deve ser possivel o usuario buscar academias pelo nome.
- [ ] Deve ser possivel o usuario realizar o check-in em uma academia
- [ ] Deve ser possivel validar o check-in de um usuario.
- [ ] Deve ser possivel cadastrar uma academia
 
## Regras de negocios - RNs - (sao caminho que cada funcionalidade pode tomar. a regra SEMPRE vai esta associada a um requisito funcional.)

- [ ] o usuario nao deve se cadastrar com um e-mail duplicado.
- [ ] o usuario nao pode fazer dois check-ins no mesmo dia.
- [ ] o usuario nao pode fazer check-in se nao estiver a 100 metros da academia.
- [ ] o check-in so pode ser validado ate 20 minutos apos criado.
- [ ] o check-in so pode ser validado por administradores.
- [ ] a academina so pode ser cadastrada por adminsitradores.
 
## Requisitos Não Funcionais - RNFs (sao requisito que nao partem do cliente. banco de dados, estrategia de paginacao e etc...)

- [ ] a senha do usuario precisa ser criptografada.
- [ ] os dados da aplicacao precisam estar persisitidos em um banco postgres
- [ ] todas as lista de dados precisam esta paginadas com 20 items por paginas
- [ ] o usuario deve ser identificados por JWT. 