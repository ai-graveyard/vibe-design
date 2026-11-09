import inter from '../../assets/fonts/inter.woff2?inline';
import serif from '../../assets/fonts/sourceserif4.woff2?inline';
import interLicense from '../../assets/fonts/inter-OFL.txt?raw';
import serifLicense from '../../assets/fonts/sourceserif4-OFL.txt?raw';
import projectLicense from '../../LICENSE?raw';
import nightTrain from '../../assets/demo-media/night-train.webp?inline';
import headphones from '../../assets/demo-media/headphones.webp?inline';
export const visualAssets = { photo: nightTrain, product: headphones };

export const fontCss = `@font-face{font-family:'Recipe Inter';font-style:normal;font-weight:100 900;font-display:swap;src:url('${inter}') format('woff2')}@font-face{font-family:'Recipe Serif';font-style:normal;font-weight:400 700;font-display:swap;src:url('${serif}') format('woff2')}`;
export const licenses = `Vibe Design recipe references. Original layout and geometric artwork:
${projectLicense}

Fonts are embedded Latin subsets. CJK and monospace use system fonts, which are not redistributed.
Sample images: original AI-created night-train and headphones illustrations (2026-09-09), fictional subjects, distributed with Vibe Design. Local user images remain the user's content and are not covered by these licenses.

INTER — SIL OPEN FONT LICENSE
${interLicense}

SOURCE SERIF 4 — SIL OPEN FONT LICENSE
${serifLicense}`;
