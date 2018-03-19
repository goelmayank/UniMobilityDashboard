export declare class DropdownDirective {
    show: boolean;
    appDropdown: 'onHover' | 'onClick';
    hover: boolean;
    onMouseEnter(event: any): void;
    onMouseLeave(event: any): void;
    onClick(event: any): void;
    constructor();
    ngOnInit(): void;
}
