const vscode = require('vscode');
const path = require('path');
const fs = require('fs');

let pathMD = null;
let pathComfy = null;
let pathPython = null;
let pathOutput = null;
let pathWorkflows = null;
let panel = undefined;
let term = undefined;

const WORKFLOWS = [
	"default_txt2img_api.json",
	"default_txt2img_vae_api.json",
	"default_img2img_api.json",
	"default_inpaint_api.json",
	"default_inpaint_pro_api.json"
]

function setPaths(ctx) {
	pathComfy = vscode.workspace.getConfiguration('mental-diffusion').comfyPath;
	pathPython = vscode.workspace.getConfiguration('mental-diffusion').comfyPython;
	pathOutput = vscode.workspace.getConfiguration('mental-diffusion').output;
	pathWorkflows = vscode.workspace.getConfiguration('mental-diffusion').workflows;

	if (pathOutput == '.output')
		pathOutput = ctx.extensionPath + '/.output';
	if (pathWorkflows == '.workflows')
		pathWorkflows = ctx.extensionPath + '/.workflows';

	if (!fs.existsSync(pathComfy + "/main.py"))
		vscode.window.showErrorMessage("Mental Diffusion: Set ComfyUI Source Path in settings.");
	if (!fs.existsSync(pathPython))
		vscode.window.showErrorMessage("Mental Diffusion: Set ComfyUI Python Path in settings.");
	if (!fs.existsSync(pathOutput))
		vscode.window.showErrorMessage("Mental Diffusion: Set Output Path in settings.");
	if (!fs.existsSync(pathWorkflows))
		vscode.window.showErrorMessage("Mental Diffusion: Set Workflows Path in settings.");
}

function activate(ctx) {
	pathMD = ctx.extensionPath;
	
	if (!fs.existsSync(pathMD + '/.input'))
		fs.mkdirSync(pathMD + '/.input');
	if (!fs.existsSync(pathMD + '/.output'))
		fs.mkdirSync(pathMD + '/.output');
	if (!fs.existsSync(pathMD + '/.workflows'))
		fs.mkdirSync(pathMD + '/.workflows');

	setPaths(ctx);

	ctx.subscriptions.push(vscode.commands.registerCommand('md.start', () => {
		setPaths(ctx);
		openTerminal();
		openWebInterface();
	}));

	ctx.subscriptions.push(vscode.commands.registerCommand('md.comfy', () => {
		setPaths(ctx);
		openTerminal();
	}));

	ctx.subscriptions.push(vscode.commands.registerCommand('md.webui', () => {
		setPaths(ctx);
		openWebInterface();
	}));
}

function openTerminal() {
	if (term) term.dispose();
	const args = vscode.workspace.getConfiguration('mental-diffusion').comfyArguments;
	term = vscode.window.createTerminal('ComfyUI');
	term.sendText('cls');
	term.sendText(`${pathPython} -s ${pathComfy}/main.py --enable-cors-header --preview-method auto ${args}`);
	term.show();
}

function openWebInterface() {
	if (panel) panel.dispose();
	panel = vscode.window.createWebviewPanel(
		'MD', 'Mental Diffusion', vscode.ViewColumn.One, {
			enableScripts: true,
			retainContextWhenHidden: true
		}
	);
	panel.webview.html = fs.readFileSync(pathMD + '/src/index.html').toString();
	panel.webview.onDidReceiveMessage(msg => {
		switch (msg.type) {
			case "startup":
				panel.webview.postMessage({
					path_md: pathMD,
					workflows: getWorkflows().concat(getCustomWorkflows(pathWorkflows)),
					workflow_upscale: fs.readFileSync(`${ pathMD }/configs/upscale_api.json`).toString(),
					styles: fs.readFileSync(`${ pathMD }/configs/styles.json`).toString()
				});
				break;

			case "input": // save image to .input
				const input = path.join(pathMD + '/.input', msg.filename);
				fs.writeFileSync(input, decodeBase64Image(msg.base64).data);
				break;

			case "output": // save image to .output or custom path
				saveImage(path.join(pathOutput, msg.filename), msg.base64, msg.openfile);
				break;

			case "open_output":
				vscode.env.openExternal(pathOutput);
				break;

			case "open_workflows":
				vscode.env.openExternal(pathWorkflows);
				break;

			case "url":
				vscode.env.openExternal(vscode.Uri.parse(msg.url));
				break;
			
			case "alert":
				vscode.window.showInformationMessage(msg.message);
				break;
		}
	});
}

function getWorkflows() {
	const arr = [];
	for (let i = 0; i < WORKFLOWS.length; i++) {
		const filepath = `${ pathMD }/configs/${ WORKFLOWS[i] }`;
		arr.push([ WORKFLOWS[i], fs.readFileSync(filepath).toString() ]);
	}
	return arr;
}

function getCustomWorkflows(dir) {
	const arr = [];
	fs.readdirSync(dir).forEach((file) => {
		const filepath = dir + '/' + vscode.Uri.file(file).path;
		if (filepath.endsWith(".json"))
			arr.push([ vscode.Uri.file(file).path.substring(1), fs.readFileSync(filepath).toString() ]);
	});
	return arr;
}

function saveImage(fpath, base64, isOpen) {
	if (fs.existsSync(path.dirname(fpath))) {
		fpath = incrementFilename(fpath);
		fs.writeFileSync(fpath, decodeBase64Image(base64).data);
		if (isOpen)
			vscode.commands.executeCommand('vscode.open', vscode.Uri.file(fpath));
	} else {
		vscode.window.showErrorMessage("The output directory does not exists");
	}
}

function incrementFilename(filepath) {
	const ext = path.extname(filepath);
	const name = path.basename(filepath, ext);
	const ending = name.split('_').pop();
	let idx = 1;
	while (fs.existsSync(filepath)) {
		if (!isNaN(ending) && ending.length < 3) {
			idx += parseInt(ending);
			filepath = `${ path.dirname(filepath) }/${ name }_${ idx }${ ext }`;
		} else {
			filepath = `${ path.dirname(filepath) }/${ name }_${ idx }${ ext }`;
			idx++;
		}
	}
	return filepath;
}

function decodeBase64Image(b64) {
	const matches = b64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
	const response = {};
	response.type = matches[1];
	response.data = Buffer.from(matches[2], 'base64');
	return response;
}

function deactivate() {
	if (term) term.dispose();
	if (panel) panel.dispose();
}

module.exports = {
	activate,
	deactivate
}
