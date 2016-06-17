# CSS Components

![UserComponent](http://f.cl.ly/items/0s2x2x362p0O0K2L1828/Screen%20Shot%202016-06-17%20at%204.03.34%20PM.png)

This component is authored completely in the CSS you see below.

```css
.UserComponent {
  display: flex;
  font: 12px Helvetica;
  color: #333;
  max-width: 680px;
  margin: auto;

  .Avatar {
    @component avatar;
    padding-right: 16px;
  }

  .Details {
    .Name {
      font-size: 36px;
      padding-bottom: 8px;
      @component name;
    }

    .Extra {
      font-size: 12px;
      color: #999;
      padding-bottom: 8px;
      @component extra;
    }

    .Biography {
      font-size: 14px;
      @component biography;
    }
  }
}
```

However in your React codebase, it feels as if it is implemented first class.

```javascript
<UserComponent
  avatar={<img src='https://api.adorable.io/avatars/285/abott@adorable.io.png' />}
  name='Merrick Christensen'
  biography='I am a kind chap but I get distracted easily. This entire component is compiled at build time. It can also compile Angular 2 components. I am not sure but I think I took this idea too far.'
  extra='Age 26 & Location Utah'
/>
```

## Explain yourself!

CSS Components allows you to describe components completely in CSS. It uses nesting to to deterime DOM structure & automatically flattens and namespaces your CSS. It uses @rules to decide where certain properties should render to. It supports rendering to multiple frameworks, current React and Angular 2. 

What if you could author shared component libraries and target multiple frameworks for first class APIs?

Currently there is a ghetto CLI and a ghetto webpack loader for this proof of concept. This leverages PostCSS so adding additional post-processing plugins for the CSS would be fairly trivial.


## The Concept

```css
.User {
  background-color: #000;
  color: #FFF;
  @component children;
}
```

This can then be used in your codebase: 

```javascript
import User from 'css-component!User.css';

...
<User>Hello World!</User>
...

```

Compiles a component that will effectively render:

```html
<style>
.HashedClassName {
  background-color: #000;
  color: #FFF;
}
</style>
<div class="HashedClassName">
  Hello World!
</div>
```

It supports nesting, sibling elements and custom properties as well so you aren't stuck to just children. 




## Supports Multiple Rendering Targets


### React
Compiling the above example for React would return something like this:

```javascript
import React from 'react';

const UserComponent = ({avatar,name,extra,biography}) => (
  <div>
    <style dangerouslySetInnerHTML={{__html: ".file__-UserComponent__2FfYC {    display: flex;    font: 12px Helvetica;    color: #333;    max-width: 680px;    margin: auto}.file__-Avatar__3Zo_u {    padding-right: 16px}.file__-Details__lTaD6 {}.file__-Name__EAz28 {    font-size: 36px;    padding-bottom: 8px}.file__-Extra__25eoM {    font-size: 12px;    color: #999;    padding-bottom: 8px}.file__-Biography__3P0NG {    font-size: 14px}"}}></style>
    <div className='file__-UserComponent__2FfYC'>
<div className='file__-Avatar__3Zo_u'>
{avatar}
</div>
<div className='file__-Details__lTaD6'>
<div className='file__-Name__EAz28'>
{name}
</div>
<div className='file__-Extra__25eoM'>
{extra}
</div>
<div className='file__-Biography__3P0NG'>
{biography}
</div>
</div>
</div>
  </div>
);

export default UserComponent;
```

### Angular 2

And compiling the same file for Angular 2, would return something like this:

```javascript
import { Component } from '@angular/core';

@Component({
  selector: 'UserComponent',
  template: `
  <div>
    <style>
    .file__-UserComponent__2FfYC {
    display: flex;
    font: 12px Helvetica;
    color: #333;
    max-width: 680px;
    margin: auto
}
.file__-Avatar__3Zo_u {
    padding-right: 16px
}
.file__-Details__lTaD6 {}
.file__-Name__EAz28 {
    font-size: 36px;
    padding-bottom: 8px
}
.file__-Extra__25eoM {
    font-size: 12px;
    color: #999;
    padding-bottom: 8px
}
.file__-Biography__3P0NG {
    font-size: 14px
}
    </style>
    <div class="file__-UserComponent__2FfYC">
<div class="file__-Avatar__3Zo_u">
<ng-content select="avatar"></ng-content>
</div>
<div class="file__-Details__lTaD6">
<div class="file__-Name__EAz28">
<ng-content select="name"></ng-content>
</div>
<div class="file__-Extra__25eoM">
<ng-content select="extra"></ng-content>
</div>
<div class="file__-Biography__3P0NG">
<ng-content select="biography"></ng-content>
</div>
</div>
</div>
  </div>
`
})
export class UserComponent{ }
```


Prior Art: https://github.com/andreypopp/react-css-components
