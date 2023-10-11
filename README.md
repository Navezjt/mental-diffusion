## Mental Diffusion

<img src="https://github.com/nimadez/mental-diffusion/blob/main/media/screenshot.jpg?raw=true">

ComfyUI Interface for VS Code<br>
Version 0.5.2 Alpha<br>
[VS Marketplace](https://marketplace.visualstudio.com/items?itemName=nimadez.mental-diffusion)<br>
[Download Nightly](https://github.com/nimadez/mental-diffusion/releases)

- [Installation](https://github.com/nimadez/mental-diffusion#installation)
- [Quickstart](https://github.com/nimadez/mental-diffusion#quickstart)
- [Custom Workflows](https://github.com/nimadez/mental-diffusion#custom-workflows)
- [Credits](https://github.com/nimadez/mental-diffusion#credits)

## Features
- [x] VS Code Extension
- [x] ComfyUI Bridge
- [x] Text to Image
- [x] Image to Image
- [x] Image Inpainting
- [x] Image Outpainting
- [x] Painting Canvas
- [x] Quick Mask Painting
- [x] LoRA and Custom VAE
- [x] Upscaler 4x
- [x] PNG Metadata
- [x] Canvas editor
- [x] Grid editor
- [x] Model Merging
- [x] Styles popup *(experimental)*
- [x] Batch rendering
- [x] Preview and progress bar
- [x] Resolution presets
- [x] Drag and drop images
- [x] Image comparison A/B
- [x] Split and swap image A/B
- [x] Pan and zoom canvas
- [x] Works completely offline
- [x] Ad-free, no trackers

#### Customizables
- [x] Theme color
- [x] Custom workflows
- [x] Image output directory
- [x] Editable styles.json
- [x] Resizable windows/editors
- [x] Preferences
- [x] Extension Settings

## Installation
- Get [Visual Studio Code](https://code.visualstudio.com/download)
- Get [ComfyUI](https://github.com/comfyanonymous/ComfyUI/releases) and setup models
- Download [RealESRGAN_x4plus.pth](https://github.com/xinntao/Real-ESRGAN/releases/download/v0.1.0/RealESRGAN_x4plus.pth) to "ComfyUI/models/upscale_models"
- Get Mental Diffusion from [Marketplace](https://marketplace.visualstudio.com/items?itemName=nimadez.mental-diffusion) or [download nightly](https://github.com/nimadez/mental-diffusion/releases)

#### Running
- Open *Extension Settings*
- Define the ComfyUI source path and Python path
- Run MD
```
MD:  ComfyUI server + MD UI
MDC: ComfyUI server only
MDU: MD UI only
```
You can also run ComfyUI server standalone with these two arguments:
```
main.py --enable-cors-header --preview-method auto
```
#### Updating
- Marketplace: Update the extension like any other extension
- Nightly: Run "*update.py*" to update MD to the latest version

```Notice: "update.py" preserve user data, but set custom paths in extension settings to avoid data loss when updating from the marketplace or vsix.```

## Quickstart
The canvas consists of 3 layers:
- **Front (A)**: Painting canvas *(to paint and mask)*
- **Middle (A)**: Image canvas *(editable using Canvas Editor)*
- **Back (B)**: Background image *(to compare, preview or store image)*

> Important: If you want your painting/adjustments to combine with the original image, you need to "Bake" the canvas or check "Auto bake", useful when copy, save, swap, split or dragging the canvas, sometimes you need to drag or save the original image.

> - MD uses PNG files to save and load metadata
> - MD can load single or multiple PNG files
> - Your data is safe and can be loaded again as long as "Autosave File" is checked
> - You can guide the image-to-image using brush strokes and color adjustments
> - To create an airbrush effect, decrease the brush size and increase the softness
> - If you swap the image A/B, all changes will be applied to the left image
> - To create a mask image, draw using the Mask tool or check the Mask mode
> - The upscaled image is saved to the file and is not returned to the MD
> - LoRA and VAE are supported by all workflows

| *Workflow* | *Strength* | *How To* |
| --- | --- | --- |
| TXT2IMG | 1.0 | Select "Text to Image" workflow and render |
| IMG2IMG | 0.01 - 0.99 | Select "Image to Image" workflow and load the "Initial Image" |
| INPAINT | 1.0 | Select "Inpaint" workflow and draw the mask |
| INPAINT PRO | 0.01 - 1.0 | Select "Inpaint Pro" workflow, load the "Initial Image" and draw the mask *(this workflow allows the strength amount to be used for inpainting)* |
| OUTPAINT | 1.0 | Select "Inpaint" workflow and open "Outpaint/Crop" window to set paddings |

> Inpaint example *(top is the original)*:<br>
<img src="https://github.com/nimadez/mental-diffusion/blob/main/media/inpainting.jpg?raw=true">

> Outpaint examples *(padding 128 and 256)*:<br>
<img src="https://github.com/nimadez/mental-diffusion/blob/main/media/outpainting.jpg?raw=true">

#### Mouse controls
| *Key* | *Action* |
| --- | --- |
| Left Button | Drag, draw, select |
| Middle Button | Reset pan and fit |
| Right Button | Pan canvas |
| Wheel | Zoom canvas in/out |

#### Keyboard shortcuts
| *Key* | *Action* |
| --- | --- |
| 0 - 9 | Select workflows |
| B | Bake canvas |
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
```Notice: Experimental, we need a more user-friendly solution.```

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
"_lora_name_"
"_lora_strength_"
"_width_"
"_height_"
"_widthx2_"
"_heightx2_"
"_positive_"
"_negative_"
"_image_init_"
"_image_mask_"
"_is_changed_" (to force comfyui to update the input image)
```
* *Tags are optional, you can choose according to your needs*
* *See examples in "configs" directory*
```
How to generate "workflow_api.json" file?
- Open ComfyUI http://localhost:8188/
- Open settings (gear icon)
- Check "Enable Dev mode options"
- Click "Save (API Format)"
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
<img src="https://github.com/nimadez/mental-diffusion/blob/main/media/devshot_diffusers.gif?raw=true" width="400"><br>
<img src="https://github.com/nimadez/mental-diffusion/blob/main/media/devshot.jpg?raw=true" width="400">

## License
Code released under the [MIT license](https://github.com/nimadez/mental-diffusion/blob/main/LICENSE).

> Mental Diffusion is not directly related to ComfyUI or ComfyUI team, and does not modify or hook ComfyUI files.

## Credits
- [Visual Studio Code](https://code.visualstudio.com/)
- [ComfyUI](https://github.com/comfyanonymous/ComfyUI)
- [Hugging Face](https://huggingface.co/)
- [Civitai](https://civitai.com/)
- [Real-ESRGAN](https://github.com/xinntao/Real-ESRGAN)
- [meta-png](https://github.com/lucach/meta-png)
