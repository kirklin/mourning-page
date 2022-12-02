export type MourningPageMode = "DEFAULT" | "CSS_FILTER" | "GRAYSCALE";
type BuildPowersOf2LengthArrays<N extends number, R extends never[][]> =
    R[0][N] extends never ? R : BuildPowersOf2LengthArrays<N, [[...R[0], ...R[0]], ...R]>;

type ConcatLargestUntilDone<N extends number, R extends never[][], B extends never[]> =
    B["length"] extends N ? B : [...R[0], ...B][N] extends never
      ? ConcatLargestUntilDone<N, R extends [R[0], ...infer U] ? U extends never[][] ? U : never : never, B>
      : ConcatLargestUntilDone<N, R extends [R[0], ...infer U] ? U extends never[][] ? U : never : never, [...R[0], ...B]>;

type Replace<R extends any[], T> = { [K in keyof R]: T };

type TupleOf<T, N extends number> = number extends N ? T[] : {
  [K in N]:
  BuildPowersOf2LengthArrays<K, [[never]]> extends infer U ? U extends never[][]
    ? Replace<ConcatLargestUntilDone<K, U, []>, T> : never : never;
}[N];

type RangeOf<N extends number> = Partial<TupleOf<unknown, N>>["length"];
type RangeOf2<From extends number, To extends number> = Exclude<RangeOf<To>, RangeOf<From>> | From;
export type FILTER_SCALE = RangeOf2<0, 100>;

/**
 * RenderMourningPage
 * @param EL Element DOM element to alter
 * @param mourningPageMode "DEFAULT" | "CSS_FILTER" | "GRAYSCALE"
 * @param Filter_Scale Integer 0 - 100
 * @param CALL_BACK fn Optional callback function to invoke when done, or an error occurs
 * @constructor
 */
export default function RenderMourningPage(
  EL?: HTMLElement,
  mourningPageMode: MourningPageMode = "CSS_FILTER",
  Filter_Scale: FILTER_SCALE = 100,
  CALL_BACK?: Function,
) {
  if (!mourningPageMode ?? null) {
    mourningPageMode = "CSS_FILTER";
  }
  if (!EL ?? null) {
    EL = document.querySelector<HTMLHtmlElement>("html") || new Document().createElement("html");
  }
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
  }
  if (mourningPageMode === "GRAYSCALE") {
  // TODO
  }
  CALL_BACK();
}

