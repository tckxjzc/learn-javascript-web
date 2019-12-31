console.log('start web component');

//自定义元素需要使用 JavaScript 定义一个类
//InfoCard就是自定义元素的类。注意，这个类的父类是HTMLElement，因此继承了 HTML 元素的特性。
class InfoCard extends HTMLElement{

    constructor(){
        super();
        //Shadow DOM，即这部分 DOM 默认与外部 DOM 隔离，内部任何代码都无法影响外部。
        const shadow=this.attachShadow( { mode: 'closed' } );

        console.log('this is %O',this);
        console.log('shadow is %O',shadow);

        const infoCardTemplate=document.getElementById('infoCardTemplate');
        const content=infoCardTemplate.content.cloneNode(true);
        content.querySelector('img').src=this.getAttribute('src');
        content.querySelector('p').textContent=this.getAttribute('text');
        shadow.appendChild(content);
    }

}
//接着，使用浏览器原生的customElements.define()方法，告诉浏览器<user-card>元素与这个类关联。
customElements.define('info-card',InfoCard);

