# Triggering a call via a URI

In addition to making calls via the RingOut API, if the user has the RingCentral for Desktop softphone installed, it is possible to use a URI scheme to initiate a dial out from the application.

RingCentral supports the following URI schemes:

* `rcmobile://`
* `tel://`

We recommend using the `rcmobile` scheme as it will resolve the issue of competing applications using the same URI scheme.

## RingCentral Voice URI Scheme

The RingCentral `rcmobile` URI Scheme is specific to RingCentral and thus has a higher probability of working as intended. It utilizes the [E.164](https://en.wikipedia.org/wiki/E.164) format. 

**Example**

```html
<!-- HTML URI Scheme -->
<!-- See below for Google Chrome usage -->
<a href="rcmobile://call?number=16501112222">1-650-111-2222</a>
```

## Standard URI Scheme

The standard `tel` URI Scheme is also supported but since multiple applications can use this URI scheme, there may be competing applications resulting in a less desirable expeirence.

```html
<!-- HTML URI Scheme -->
<!-- See below for Google Chrome usage -->
<a href="tel:1-650-111-2222">1-650-111-2222</a>
<a href="tel:16501112222">1-650-111-2222</a>
```

## Google Chrome Note

Many browsers will support the native `rcmobile` and `tel` URI Schemes via a standard URL `href` described above, however, Google Chrome requires special handling using JavaScript. This is described in more detail [on Stack Overflow](http://stackoverflow.com/questions/2330545/is-it-possible-to-open-custom-url-scheme-with-google-chrome).

```javascript
// Use the following for Google Chrome only
var w = (window.parent)?window.parent:window;
w.location.assign('rcmobile://call?number=16501112222');
```

## Learn more

Access a full list of [URI and URI schemes](../basics/uri-schemes.md)
