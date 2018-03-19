export function HtShow(toShow: boolean, className: string = "flex") {
  return `display: ${toShow ? className : "none"};`;
}
