*Leia isto em outros idiomas: [Português](README.md)*

---

# Super File Renamer

Automation script for Google Apps Script that allows you to clean, replace text, remove specific intervals, and add prefixes or suffixes to file names within a Google Drive folder.

## 🚀 How to Use (Tutorial)

To use the script safely, it is highly recommended to create a **test folder** in your Google Drive with copies of some files to practice before running the code on the originals.

### Step 1: Get the Folder ID in Google Drive
The script needs to know which folder to target.
1. Open your Google Drive on the computer and enter the folder containing the files.
2. In your browser's address bar, the link will look similar to: `https://drive.google.com/drive/folders/1A2b3C4d5E6f7G8h9I0j?usp=sharing`
3. Copy **only** the code that comes after `folders/` and before any `?`. In the example, the ID is: `1A2b3C4d5E6f7G8h9I0j`.

### Step 2: Access Google Apps Script
1. Go to **script.google.com** and sign in with your Google account.
2. Click the blue **"New project"** button.
3. Delete all the default code in the editor.
4. Paste the entire source code (`Code.gs`) of this project into the blank space.
5. Rename the project at the top (e.g., "File Renamer") and click the floppy disk icon to Save.

### Step 3: Configure the Rules
Scroll down the code to the `// ================= CONFIGURAÇÕES =================` section. Change only what is between **single quotes** or the **numbers**:
* **Folder:** On the line `const ID_DA_PASTA = 'COLE_AQUI_O_ID_DA_PASTA';`, replace the text inside the quotes with the ID you copied.
* **Remove at ends:** Change the numbers to trim letters. Ex: `const REMOVER_DO_INICIO = 5;`
* **Remove Interval:** Ex: `const REMOVER_INTERVALO = { inicio: 9, fim: 24 };`
* **Remove Between Texts:** Ex: `marcadorInicial: 'Class ', marcadorFinal: '- Theme'`
* **Remove Specific Terms:** Ex: `['Copy of ', ' - old']`
* **Replace Terms:** Ex: `{'Aulinha': 'Aula', 'Doc_': 'Document '}`
* **Add Prefix/Suffix:** Fill in the quotes for `PREFIXO` or `SUFIXO`.

### Step 4: Run a Simulation
1. On the top toolbar, ensure the **`simularRenomeacao`** option is selected.
2. Click **Run**.
3. *First time only:* Google will ask for authorization. Click **Review permissions** > Choose your account > **Advanced** > **Go to project** > **Allow**.
4. Check the "Execution log" at the bottom of the screen to verify the simulated results.

### Step 5: Actually Rename
1. If the simulation is correct, return to the top toolbar.
2. Change the selection to **`renomearArquivosDaPasta`**.
3. Click **Run**. The files in the folder will be renamed.

## 👤 Authorship and development

Automation script independently developed by Pablo Phillipe Cândido dos Santos, designed for bulk file renaming and nomenclature standardization within the Google Drive environment.

The development involved the use of generative artificial intelligence tools as an auxiliary resource in the development process, with the author retaining responsibility for the conception, implementation, integration, and verification of the project.

Lattes Curriculum: [http://lattes.cnpq.br/9500873674712528](http://lattes.cnpq.br/9500873674712528)