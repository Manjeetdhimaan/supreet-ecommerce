import {Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';

@Directive({
    selector: '[animation], [delay], [duration], [offset], [triggerOnce]'
})
export class AnimateDirective {

    //컴포넌트속성
    @Input('animation') animationClass:string = 'fadeInUp'
    @Input('delay') delay:string = '0'
    @Input('duration') duration:string

    //waypoint관련설정
    @Input('offset') wayPointOffset:string = '100'
    @Input('triggerOnce') triggerOnce:string = 'false'

    private elObj:any = null
    private windowH:number
    private elOffsetTop:number
    private check:boolean = false
    private oldY:number = 0

    constructor( private el:ElementRef, private renderer:Renderer2 ) { }

    @HostListener('window:scroll', ['$event']) onScrollAnimation(event:any) {
        this.elOffsetTop = this.elObj.getBoundingClientRect().y

        let wayPoint = this.windowH * Number(this.wayPointOffset) / 100
        if(this.elOffsetTop > -100 && this.elOffsetTop < wayPoint) {
            this.renderer.removeClass(this.elObj, 'wait-animation')
            this.check = true
        } else {
            if(this.check) {
                this.renderer.removeClass(this.elObj, 'animated')
                this.renderer.removeClass(this.elObj, this.animationClass)

                if(this.elOffsetTop < this.oldY && this.triggerOnce == 'false') {
                    this.renderer.addClass(this.elObj, 'wait-animation')
                    this.renderer.addClass(this.elObj, 'animated')
                    this.renderer.addClass(this.elObj, this.animationClass)
                }
            }
        }
        this.oldY = this.elOffsetTop
    }

    @HostListener('window:resize', ['$event']) onResizeWindow(event:any) {
        this.windowH = window.innerHeight
    }

    ngOnInit() {
        this.elObj = this.el.nativeElement
        this.windowH = window.innerHeight
        this.elOffsetTop = this.elObj.offsetTop

        if (Number(this.delay) > 0) {
            this.renderer.setStyle(this.elObj, '-webkit-animation-delay', this.delay +'ms')
            this.renderer.setStyle(this.elObj, 'animation-delay', this.delay + 'ms')
        }

        if (Number(this.duration) > 0) {
            this.renderer.setStyle(this.elObj, '-webkit-animation-duration', this.duration + 'ms')
            this.renderer.setStyle(this.elObj, 'animation-duration', this.duration + 'ms')
        }

        if(this.elOffsetTop > this.windowH * Number(this.wayPointOffset) / 100) {
            this.renderer.addClass(this.elObj, 'wait-animation')
        }
        this.renderer.addClass(this.elObj, 'animated')
        this.renderer.addClass(this.elObj, this.animationClass)
    }
}

