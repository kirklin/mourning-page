import type { FILTER_SCALE, MourningPageMode } from "./types";
import { appendStyle } from "./utils";

/**
 * RenderMourningPage
 * @param selector Element DOM element to alter
 * @param mourningPageMode "DEFAULT" | "CSS_FILTER" | "GRAYSCALE"
 * @param Filter_Scale Integer 0 - 100
 * @param CALL_BACK fn Optional callback function to invoke when done, or an error occurs
 * @constructor
 */
export default function RenderMourningPage(
  selector?: string,
  mourningPageMode?: MourningPageMode,
  Filter_Scale: FILTER_SCALE = 100,
  CALL_BACK?: Function,
) {
  const EL: HTMLObjectElement | HTMLElement | HTMLMapElement | HTMLLinkElement | HTMLHtmlElement | HTMLAnchorElement | HTMLAreaElement | HTMLAudioElement | HTMLBaseElement | HTMLQuoteElement | HTMLBodyElement | HTMLBRElement | HTMLButtonElement | HTMLCanvasElement | HTMLTableCaptionElement | HTMLTableColElement | HTMLDataElement | HTMLDataListElement | HTMLModElement | HTMLDetailsElement | HTMLDialogElement | HTMLDivElement | HTMLDListElement | HTMLEmbedElement | HTMLFieldSetElement | HTMLFormElement | HTMLHeadingElement | HTMLHeadElement | HTMLHRElement | HTMLIFrameElement | HTMLImageElement | HTMLInputElement | HTMLLabelElement | HTMLLegendElement | HTMLLIElement | HTMLMenuElement | HTMLMetaElement | HTMLMeterElement | HTMLOListElement | HTMLOptGroupElement | HTMLOptionElement | HTMLOutputElement | HTMLParagraphElement | HTMLPictureElement | HTMLPreElement | HTMLProgressElement | HTMLScriptElement | HTMLSelectElement | HTMLSlotElement | HTMLSourceElement | HTMLSpanElement | HTMLStyleElement | HTMLTableElement | HTMLTableSectionElement | HTMLTableCellElement | HTMLTemplateElement | HTMLTextAreaElement | HTMLTimeElement | HTMLTitleElement | HTMLTableRowElement | HTMLTrackElement | HTMLUListElement | HTMLVideoElement | null
      = document.querySelector(selector ?? "html");
  mourningPageMode = mourningPageMode ?? "CSS_FILTER";

  if (typeof CALL_BACK != "function") {
    CALL_BACK = (err: Error) => {
      if (err) {
        throw err;
      }
    };
  }
  if (mourningPageMode === "DEFAULT") {
    [
      "filter", "-webkit-filter", "-moz-filter", "-ms-filter", "-o-filter",
    ].forEach((GrayFilter) => {
      EL?.style.setProperty(GrayFilter, "none", "important");
    });
  }
  if (mourningPageMode === "CSS_FILTER") {
    [
      "filter", "-webkit-filter", "-moz-filter", "-ms-filter", "-o-filter",
    ].forEach((GrayFilter) => {
      EL?.style.setProperty(GrayFilter, `grayscale(${Filter_Scale}%)`, "important");
    });
    EL?.style.setProperty("filter", "url(data:image/svg+xml;utf8,#grayscale);", "important");
    EL?.style.setProperty("filter", "progid:DXImageTransform.Microsoft.BasicImage(grayscale=1)", "important");
  }
  if (mourningPageMode === "CSS_MIX_BLEND_MODE") {
    const styleStr = `${selector ?? "html"} { position: relative;background: #fff;}${selector ?? "html"}::before {content: '';position: absolute;inset: 0;background: rgba(0, 0, 0, ${Filter_Scale / 100});mix-blend-mode: color;pointer-events: none;z-index: 9999;}`;
    appendStyle(styleStr);
  }
  if (mourningPageMode === "CSS_BACKDROP_FILTER") {
    const styleStr = `${selector ?? "html"} { position: relative;}${selector ?? "html"}::before {content: '';position: absolute;inset: 0;backdrop-filter: grayscale(${Filter_Scale}%);pointer-events: none;z-index: 9999;}`;
    appendStyle(styleStr);
  }
  if (mourningPageMode === "GRAYSCALE") {
    // TODO
  }
  CALL_BACK();
}
