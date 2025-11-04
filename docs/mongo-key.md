# mongo-key (keyfile) — Instruções e boas práticas

Este documento explica como gerar, proteger e usar o arquivo `mongo-key` que é usado como keyFile para autenticação interna entre os nós do ReplicaSet MongoDB.

Aviso de segurança

- Não comite o arquivo `mongo-key` ao repositório. Ele dá acesso de autenticação entre os nós do cluster.
- Garanta que somente usuários/contas de sistema confiáveis possam ler o arquivo.

Onde fica

- No projeto usamos a cópia em: `./mongo-key` (montada dentro dos containers em `/data/mongo-keyfile/mongo-key`).

Como gerar (exemplo)

1. Gere um conteúdo aleatório e salve em `./mongo-key`:

```bash
openssl rand -base64 756 > mongo-key
```

2. Defina o dono para o uid do MongoDB no container (imagem oficial usa uid 999):

```bash
sudo chown 999:999 mongo-key
```

3. Defina permissões restritas (leitura apenas):

```bash
chmod 400 mongo-key
```

Porque essas permissões

- O `mongod` exige que o keyFile seja proprietário correto e muito restrito (modo 400) para aceitar o arquivo.

Uso com Docker Compose

- No `docker-compose.yml` montamos `./mongo-key` em cada serviço Mongo e passamos a flag `--keyFile /data/mongo-keyfile/mongo-key` no comando `mongod`.

Rolling restart (boa prática)

- Ao introduzir o `keyFile` num cluster já existente, faça um rolling restart:
  1. Reinicie os secondaries primeiro (mongo2, mongo3).
  2. Reinicie o primary por último (mongo1).

Isso evita falhas de quorum e problemas de `AuthenticationFailed` enquanto os nós trocam chaves.

Recomendações adicionais

- Não armazene `mongo-key` em repositórios públicos.
- Para ambientes de produção, use um secret manager (Vault, AWS Secrets Manager, Docker Secrets, Kubernetes Secrets).
- Considere criptografar backups que contenham o keyfile.

Exemplo rápido para subir o cluster localmente (assumindo key criado):

```bash
# gerar key (se necessário)
openssl rand -base64 756 > mongo-key && sudo chown 999:999 mongo-key && chmod 400 mongo-key

# subir
docker compose up -d

# iniciar replica set (se ainda não tiver sido iniciado)
docker exec mongo1 mongosh --eval 'rs.initiate({_id: "rs0", members:[{_id:0, host: "mongo1:27017"},{_id:1, host: "mongo2:27017"},{_id:2, host: "mongo3:27017"}]})'

# confirmar status (autenticando se necessário)
docker exec mongo1 mongosh -u <admin> -p <pwd> --authenticationDatabase admin --eval 'rs.status()'
```

Notas finais

- Este README é um guia operacional para o repositório. Para produção, substitua esse fluxo por provisionamento automatizado de secrets e políticas de rotação.
