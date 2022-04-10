# lsJS
The LS framework allows you to work with custom HTML elements as components.

![image alt <](https://user-images.githubusercontent.com/69248396/162579558-086585bf-e05f-4e52-bc72-aabb3445cf1d.png)

[![](https://img.shields.io/badge/LS-Framework-red)](https://img.shields.io/badge/lsJS-library-red)
[![](https://badges.aleen42.com/src/javascript.svg)](https://badges.aleen42.com/src/javascript.svg)
[![](https://badges.aleen42.com/src/webpack.svg)](https://badges.aleen42.com/src/webpack.svg)

## Table of contents


- [Installation](#installation)
- [Usage](#usage)
- [Documentation](#documentation)
  * [Module](#module)
  * [Router](#router)
  * [Component](#component)
    + [Structure](#structure)
    + [Code](#code)
    + [Lifecycles](#lifecycles)
      - [OnInit](#oninit)
      - [OnChange](#onchange)
        * [Props](#props)
      - [OnDestroy](#ondestroy)
    + [Shadow DOM](#shadow-dom)
      - [Renderer](#renderer)
       * [Props](#props-1)
       * [Events](#events)

<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with markdown-toc</a></i></small>



## Installation
Clone repository
```console
git clone https://github.com/LubosSremanak/lsjs.git
```
Install dependencies
```console
npm install
```

## Usage
Development server
```console
webpack serve
```
Build for production
```console
webpack
```
Generator

[Component generator](https://lubossremanak.site/ls/generator/)

# Documentation

##  Module
Each component must be declared in the module.
```js
import Module from "../../ls/model/module";
import {RootComponent} from "./root/root.component";

let components = [
    RootComponent,
]
new Module(components);
```
##  Router
RootComponent
```html
<app-router></app-router>

```
RouterModule
```js
import RouterModule from "../../ls/model/router.module";
import {HomeComponent} from "./root/home/home.component";

let routes = [
    {path: '', component: HomeComponent},
]
new RouterModule(routes);

```
All elements with the navigate attribute are automatically bound to the onclick navigator
```html
<button navigate="generator">Generator</button>
```
Each component have injected Router
```js
this.router.navigate('home');
```

##  Component
All components are merged into the app-root component, located in index.html.

### Structure
* **selector**
  * **selector.component.html**
  * **selector.component.css**
  * **selector.component.js**

### Code
Each component must extend the Component class and pass a constant __dirname, in the super constructor.
```js
import {Component} from "../../../ls/model/component";


export class RootComponent extends Component {

    constructor() {
        super(__dirname);
    }

    async onInit() {

    }

    async onChange(change) {

    }

    async onDestroy() {

    }
}
```
### Lifecycles

#### OnInit
Method onInit is executed after shadow DOM initialization.
```js
async onInit() {
  console.log(this.dom) // in this moment, we can access elements in component
}

```
#### OnChange
Method onDestroy is executed after prop change.
```ts
change:{ name, oldValue, newValue, isFirst }    
```
##### Props
All props must be defined in static array 'props' to detect the change.
```js

static props=['name','color'];

```

#### OnDestroy
Method onDestroy is executed after component is removed from DOM.

### Shadow DOM
Component is represented by a shadow DOM that provides encapsulation.
The DOM object of component is stored in ```this.dom```.

#### Renderer 
[JSDOCS](https://lubossremanak.site/ls/docs/global.html)

We have injected Renderer service for work with component DOM.

Renderer service makes it easier to work with the DOM and reduces code.

**createComponent**
```js
const myComponent=this.renderer.createComponent(MyComponent);
//alternative
this.create('app-myComponent');

```
**getSelector**
```js
const selector = this.getSelector(MyComponent);
// return: 'app-myComponent'

```
**get**
```js
const element=this.renderer.get('elementId');
//alternative
this.get('elementId');

```
**append**
```js
// append <app-myComponent></app-myComponent> to div with id="containerId"
this.renderer.append('containerId',MyComponent);

```
**prepend**
```js
// prepend <app-myComponent></app-myComponent> to div with id="containerId"
this.renderer.prepend('containerId',MyComponent);

```
**change**
```js
// remove the inside of the container 
// append <app-myComponent></app-myComponent> to div with id="containerId"
this.renderer.change('containerId',MyComponent);

```
**remove**
```js
// remove HTML element"
this.renderer.remove(element);

```
**removeById**
```js
// remove HTML element with id="elementId"
this.renderer.removeById('elementId');

```
**removeAllByClass**
```js
// remove all HTML elements with class="image"
this.renderer.removeAllByClass('image');

```
### Props
Communication with child.

**getProp**
```js
 // Get prop passed to component
 const name=getProp('name');

```
**setProp**
```js
 //Set prop of component
 const component=this.get("id");
 this.renderer.setProp(component, 'name', 'yourName');

```
**bindProp**
```js
//prop name and set name must be same
//parent
<app-element name="Lubos"></app-element>
//app-element
<span set="name"></span>
// app-element
const name=this.renderer.bindProp('name');// return: 'Lubos'

```
**bindValue**
```js
//change inner text of span with set="variableName"
//template
<span set="variableName"></span>
// component
this.renderer.bindValue('variableName','value');

```

### Events
Communication with parent.

**createEmitter**
```js
//Create event to pass data to parent
const emmiter=this.renderer.createEmitter('removedSection',dataForParent);

```
**emit**
```js
//Fire event in component
this.renderer.emit(emmiter);

```
**createEmitterAndEmit**
```js
//Create and fire now event in component
this.renderer.createEmitterAndEmit('removedSection',dataForParent);

```

**subscribe**
```js
//Listen on event 
this.renderer.subscribe(eventArea,'removedSection',yourEventHandler);

```
**subscribeById**
```js
//Listen on event by id
this.renderer.subscribe('eventAreaId','removedSection',yourEventHandler);

```




















