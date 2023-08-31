## Mental Diffusion

<img src="https://github.com/nimadez/mental-diffusion/blob/main/media/screenshot.jpg?raw=true">

ComfyUI Interface for VS Code<br>
Version 0.2.9 alpha<br>
[Marketplace](https://marketplace.visualstudio.com/items?itemName=nimadez.mental-diffusion)<br>
[Nightly](https://github.com/nimadez/mental-diffusion/releases)

- [Installation](https://github.com/nimadez/mental-diffusion#installation)
- [Quickstart](https://github.com/nimadez/mental-diffusion#quickstart)
- [Custom Workflows](https://github.com/nimadez/mental-diffusion#custom-workflows)
- [FAQ](https://github.com/nimadez/mental-diffusion#faq)
- [Credits](https://github.com/nimadez/mental-diffusion#credits)

## Features
- [x] VS Code Extension
- [x] ComfyUI Bridge
- [x] Text to Image
- [x] Image to Image
- [x] Image Inpainting
- [x] Image Outpainting
- [x] Custom Workflows
- [x] Painting Canvas
- [x] Quick Mask Painting
- [x] Upscaler 4x
- [x] PNG Metadata
- [x] Drag and drop images
- [x] Image comparison A/B
- [x] Canvas editor
- [x] Styles editor
- [x] Metadata pool
- [x] Metadata grid
- [x] Batch rendering
- [x] Preferences
- [x] Optional upscale model
- [x] Optional theme color
- [x] Preview and progress bar
- [x] Pan and zoom canvas
- [x] Works completely offline
- [x] No miners and trackers

## Installation
- Get [Visual Studio Code](https://code.visualstudio.com/download)
- Get [ComfyUI](https://github.com/comfyanonymous/ComfyUI/releases) and setup models
- Download [RealESRGAN_x4plus.pth](https://github.com/xinntao/Real-ESRGAN/releases/download/v0.1.0/RealESRGAN_x4plus.pth) to "ComfyUI/models/upscale_models"
- Get Mental Diffusion from [Marketplace](https://marketplace.visualstudio.com/items?itemName=nimadez.mental-diffusion) or [get nightly](https://github.com/nimadez/mental-diffusion/releases)

#### Running
- Open *Extension Settings*
- Define the ComfyUI source path and Python path
- Run MD (md.start)
> You can also run ComfyUI server standalone with these two arguments:<br>```main.py --enable-cors-header --preview-method auto```

#### Updating
- Marketplace: Update the extension like any other extension
- Nightly: Run "*update.py*" to update MD to the latest version

> Notice: Set custom path for Output and Workflows directory in extension settings to avoid data loss when updating.

## Quickstart
> - Mental Diffusion uses PNG files to save and load metadata
> - Your data is safe and can be loaded again as long as "Autosave File" is checked
> - You can guide the image-to-image using brush strokes and color adjustments
> - If you want your painting to combine with the canvas image, you need to "Bake" the canvas *(or enable "Auto-Bake" in preferences)*

| *Workflow* | *Strength* | *How To* |
| --- | --- | --- |
| TXT2IMG | 1.0 | Select "Text to Image" workflow and render |
| TXT2IMG VAE | 1.0 | Select "Text to Image VAE" and select a custom VAE model |
| IMG2IMG | 0.01 - 0.99 | Select "Image to Image" workflow and load the "Initial Image" |
| INPAINT | 1.0 | Select "Inpaint" workflow and draw the mask |
| INPAINT PRO | 0.01 - 1.0 | Select "Inpaint Pro" workflow, load the "Initial Image" and draw the mask *(this workflow allows the strength amount to be used for inpainting)* |
| OUTPAINT | 1.0 | Select "Inpaint" workflow and open "Create Outpaint" window |

> Inpaint example *(top is the original)*:<br>
<img src="https://github.com/nimadez/mental-diffusion/blob/main/media/inpainting.jpg?raw=true">

> Outpaint examples *(padding 128 and 256)*:<br>
<img src="https://github.com/nimadez/mental-diffusion/blob/main/media/outpainting.jpg?raw=true">

#### Mouse controls
| *Key* | *Action* |
| --- | --- |
| Left Button | drag, draw, select |
| Middle Button | Pan/Zoom reset |
| Right Button | Pan canvas |
| Wheel | Zoom canvas in/out |

#### Keyboard shortcuts
| *Key* | *Action* |
| --- | --- |
| 0 - 9 | Select workflows |
| D | Drag tool |
| B | Brush tool |
| L | Line tool |
| E | Eraser tool |
| M | Mask tool |
| I | Activate eyedropper |
| R | Reset canvas zoom |
| ] | Increase tool size |
| [ | Decrease tool size |
| + | Increase tool opacity |
| - | Decrease tool opacity |
| CTRL + Enter | Render/Generate |
| CTRL + L | Load PNG metadata |
| CTRL + Z | Undo painting |
| CTRL + X | Redo painting |

## Custom Workflows
Basically, you can load any ComfyUI workflow API into mental diffusion<br>
Just copy JSON file to "**.workflows**" directory and replace tags

- Create "my_workflow_api.json" file in ".workflows" directory
- Replace supported tags *(with quotation marks)*
- Reload webui to refresh workflows
- Select workflow and hit Render button
```
"_seed_"
"_steps_"
"_cfg_"
"_sampler_name_"
"_scheduler_"
"_denoise_"
"_ckpt_name_"
"_vae_name_"
"_width_"
"_height_"
"_positive_"
"_negative_"
"_image_init_"
"_image_mask_"
```
* *Tags are optional, you can choose according to your needs*
```
How to generate "workflow_api.json" file?
- Open ComfyUI http://localhost:8188/
- Open settings (gear icon)
- Check "Enable Dev mode options"
- Click "Save (API Format)"
```

## FAQ
```
How to speed up rendering?
- Open NVIDIA Control Panel, enable "Adaptive" power management mode
- Do not constantly update the checkpoint, let it be cached and reused

Why did you switch to ComfyUI?
- I do not have the necessary hardware to expand the Diffusers features
- ComfyUI is a must-have SD package, there's a good chance you already have it
```

## History
```
↑ Ported to VS Code
↑ Upgrade from Diffusers to ComfyUI
↑ Upgrade from sdkit to Diffusers
↑ Undiff renamed to Mental Diffusion
↑ Undiff started with "sdkit"
↑ Created for my personal use
```
<img src="https://github.com/nimadez/mental-diffusion/blob/main/media/devshot_diffusers.gif?raw=true"><br>
<img src="https://github.com/nimadez/mental-diffusion/blob/main/media/devshot.jpg?raw=true">

## License
Code released under the [MIT license](https://github.com/nimadez/mental-diffusion/blob/main/LICENSE).

> Mental Diffusion is not directly related to ComfyUI or ComfyUI team, and does not modify or hook ComfyUI files.

## Credits
- [Visual Studio Code](https://code.visualstudio.com/)
- [ComfyUI](https://github.com/comfyanonymous/ComfyUI)
- [Hugging Face](https://huggingface.co/)
- [Real-ESRGAN](https://github.com/xinntao/Real-ESRGAN)
- [meta-png](https://github.com/lucach/meta-png)
