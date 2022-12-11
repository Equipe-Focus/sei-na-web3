# Sistema Eletrônico de Informações (SEI) na WEB3
## Hackaton Web3 - Equipe Focus

API para integração do Sistema Eletrônico de Informações (SEI) à Web3 na gestão de contratos. A tecnologia blockchain irá permitir maior transparência e rastreabilidade nas diferentes etapas dos processos que o compõem a TED, desde a manifestação inicial de interesse das partes até a prestação de contas e relatórios finais para seu encerramento.  

### Arquitetura SEI na WEB3
![](https://gateway.pinata.cloud/ipfs/QmcK7St5n9mxiapztQFwCV18n4HTaytATsD1rT4jPRJJ9e)

1. Camada de Serviço:
Possibilida o uso de modelos pré-definidos de documentos para cada etapa dos processos, implantação de contratos inteligentes, armazenamento de documentos associados às respectivas etapas de um processo e consulta de processos por ID do processo, por etapa de processo e ID de documento.

*Funcionalidades*
* Implantar Contrato
* Listar Contrato
* Selecionar modelo pré-definido e Criar Documento
* Buscar Documento
* Buscar Documento(s) por Processo e/ou Etapa 
* Atualizar Documento
* Validar Documento
* Remover Documento

2. Camada Blockchain:
Consiste na comunicação com as blockchains integradas à solução. Para este projeto específico a solução conecta-se à Celo, mas pode ser integrada de forma genérica à outras blockchains baseadas em Ethereum Virtual Machine (EVM).

### Fluxo da Solução
![](https://gateway.pinata.cloud/ipfs/Qmbpxx5N5jeXzKtDvEqRx57tmK63Pf7ihaUCwLQf7XdvpH)

* Fluxo de Processos de Termo de Execução Descentralizada: o ciclo pode ser executado cada vez que uma etapa seja realizada.
* Consultar Processo: para fins de rastreabilidade e transparência, um usuário externo pode consultar um processo e o retorno estão todos os metadados (imutáveis) e documentos no IPFS divididos por Etapa. Com isso o usuário pode consultar a etapa atual do processo, assim como acessar os documentos de cada etapa.

## Configurações Técnicas para Execução da API

### Execução
1. Clone o repositório e instale suas dependências.

```
git clone https://github.com/blockchainone/sei-web3.git
cd sei-web3
```

```
npm install
```

2. Adicione as seguintes variáveis de ambiente com suas credenciais:

```
CELOEP=<CELO_ENDPOINT>
CELOPK=<CHAVE_PRIVADA_CELO>

PINATAURL=<PINATAURL>
PINATAJWT=<PINATAURL>
PINATAGATEWAY=<PINATAGATEWAY>

#database-local
URL=<URL>
USERNAMEDB=<USERNAMEDB>
PASSWORDDB=<PASSWORDDB>
SCHEMADB=<SCHEMADB>
HOSTDB=<HOSTDB>

#server
SERVER=<SERVER>
PORT=<PORT>
PORTSSL=<PORTSSL>
SECRET=<SECRET>
KEY=<KEY>
BUFFER=<BUFFER>
```

3. Inicie o servidor express:
```
npm run dev
```

