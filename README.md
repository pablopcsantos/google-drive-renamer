*Read this in other languages: [English](README-en.md)*

---

# Super Renomeador de Arquivos

Script de automação para Google Apps Script que permite limpar, substituir textos, remover intervalos exatos e adicionar prefixos ou sufixos aos nomes de arquivos contidos em uma pasta do Google Drive.

## 🚀 Como utilizar (Tutorial)

Para utilizar o script com segurança, recomenda-se criar uma **pasta de teste** no seu Google Drive com cópias de alguns arquivos para praticar antes de rodar o código nos originais.

### Passo 1: Pegar o ID da Pasta no Google Drive
O script precisa saber em qual pasta ele vai trabalhar.
1. Abra o seu Google Drive pelo computador e entre na pasta onde estão os arquivos.
2. Na barra de endereços do seu navegador, o link será semelhante a: `https://drive.google.com/drive/folders/1A2b3C4d5E6f7G8h9I0j?usp=sharing`
3. Copie **apenas** o código que vem depois de `folders/` e antes de qualquer `?`. No exemplo, o ID é: `1A2b3C4d5E6f7G8h9I0j`.

### Passo 2: Acessar o Google Apps Script
1. Acesse o site **script.google.com** e faça login com a sua conta do Google.
2. Clique no botão azul **"Novo projeto"**.
3. Apague todo o código que estiver no editor.
4. Cole todo o código-fonte (`Code.gs`) do projeto neste espaço.
5. Renomeie o projeto lá em cima (ex: "Renomeador de Arquivos") e clique no ícone de disquete (Salvar).

### Passo 3: Configurar as Regras
Role o código até a seção `// ================= CONFIGURAÇÕES =================`. Altere apenas o que estiver entre **aspas simples** ou os **números**:
* **Pasta:** Na linha `const ID_DA_PASTA = 'COLE_AQUI_O_ID_DA_PASTA';`, substitua o texto dentro das aspas pelo ID que você copiou.
* **Remover nas extremidades:** Mude os números para cortar letras. Ex: `const REMOVER_DO_INICIO = 5;`
* **Remover Intervalo:** Ex: `const REMOVER_INTERVALO = { inicio: 9, fim: 24 };`
* **Remover Entre Textos:** Ex: `marcadorInicial: 'Aula ', marcadorFinal: '- Tema'`
* **Remover Termos Específicos:** Ex: `['Cópia de ', ' - velho']`
* **Substituir Termos:** Ex: `{'Aulinha': 'Aula', 'Doc_': 'Documento '}`
* **Adicionar Prefixo/Sufixo:** Preencha as aspas do `PREFIXO` ou `SUFIXO`.

### Passo 4: Fazer uma Simulação
1. Na barra de ferramentas superior, garanta que a opção **`simularRenomeacao`** está selecionada.
2. Clique em **Executar**.
3. *Apenas na primeira vez:* O Google pedirá autorização. Clique em **Revisar permissões** > Escolha a sua conta > **Avançado** > **Acessar projeto** > **Permitir**.
4. Olhe o "Log de execução" na parte inferior da tela para conferir os resultados.

### Passo 5: Renomear de Verdade
1. Se a simulação ficou correta, volte à barra superior.
2. Mude a seleção para **`renomearArquivosDaPasta`**.
3. Clique em **Executar**. Os arquivos na pasta serão renomeados.

## 👤 Autoria e desenvolvimento

Script de automação desenvolvido de forma independente por Pablo Phillipe Cândido dos Santos, destinado à renomeação em massa e padronização de nomenclatura de arquivos no ambiente Google Drive.

O desenvolvimento contou com a utilização de ferramentas de inteligência artificial generativa como recurso auxiliar no processo de desenvolvimento, mantendo-se sob responsabilidade do autor a concepção, implementação, integração e verificação do projeto.

Currículo Lattes: [http://lattes.cnpq.br/9500873674712528](http://lattes.cnpq.br/9500873674712528)