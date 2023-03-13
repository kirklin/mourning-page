import type { FILTER_SCALE, MourningPageMode } from "./types";
import { appendStyle } from "./utils";

// 定义悼念页面策略接口
interface MourningPageStrategy {
  render(config: MourningPageConfig): void;
}
// 定义悼念页面策略类
class DefaultMourningPageStrategy implements MourningPageStrategy {
  render(config: MourningPageConfig): void {
    const el: HTMLElement | null = document.querySelector(config.selector);
    ["filter", "-webkit-filter", "-moz-filter", "-ms-filter", "-o-filter"].forEach((filter) => {
      el?.style.setProperty(filter, "none", "important");
    });
  }
}
class CssFilterMourningPageStrategy implements MourningPageStrategy {
  render(config: MourningPageConfig): void {
    const el: HTMLElement | null = document.querySelector(config.selector);
    ["filter", "-webkit-filter", "-moz-filter", "-ms-filter", "-o-filter"].forEach((filter) => {
      el?.style.setProperty(filter, `grayscale(${config.filterScale}%)`, "important");
    });
    el?.style.setProperty(
      "filter",
      "url(data:image/svg+xml;utf8,#grayscale);",
      "important",
    );
    el?.style.setProperty(
      "filter",
      "progid:DXImageTransform.Microsoft.BasicImage(grayscale=1)",
      "important",
    );
  }
}
class CssMixBlendModeMourningPageStrategy implements MourningPageStrategy {
  render(config: MourningPageConfig): void {
    const styleStr = `${config.selector} {
      position: relative;
      background: #fff;
    }
    ${config.selector}::before {
      content: '';
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, ${config.filterScale / 100});
      mix-blend-mode: color;
      pointer-events: none;
      z-index: 9999;
      }`;
    appendStyle(styleStr);
  }
}
class CssBackdropFilterMourningPageStrategy implements MourningPageStrategy {
  render(config: MourningPageConfig): void {
    const styleStr = `${config.selector} {
     position: relative; 
     } 
     ${config.selector}::before {
      content: ''; 
      position: absolute; 
      inset: 0; 
      backdrop-filter: grayscale(${config.filterScale}%); 
      pointer-events: none; 
      z-index: 9999; 
      }`;
    appendStyle(styleStr);
  }
}

export class MourningPageConfig {
  selector: string;
  mode: MourningPageMode;
  filterScale: FILTER_SCALE;
  callback?: Function;

  constructor(selector: string, mode: MourningPageMode, filterScale: FILTER_SCALE = 100, callback?: Function) {
    this.selector = selector;
    this.mode = mode;
    this.filterScale = filterScale;
    this.callback = callback;
  }
}

export class RenderMourningPage {
  private static strategies: Map<MourningPageMode, MourningPageStrategy> = new Map([
    ["DEFAULT", new DefaultMourningPageStrategy()],
    ["CSS_FILTER", new CssFilterMourningPageStrategy()],
    ["CSS_MIX_BLEND_MODE", new CssMixBlendModeMourningPageStrategy()],
    ["CSS_BACKDROP_FILTER", new CssBackdropFilterMourningPageStrategy()],
  ]);

  static render(config: MourningPageConfig): void {
    const strategy = this.strategies.get(config.mode);
    if (strategy) {
      strategy.render(config);
    }
    if (config.callback && typeof config.callback === "function") {
      config.callback();
    }
  }
}
