# Countdown.js

This plugin let you add a countdown timer to your reveal.js presentations

## Usage

Using the plugin is easy. First, register it in your Reveal.js initialize block.

```javascript

    Reveal.initialize({
        dependencies: [
            ....
          { src: "plugin/countdown/countdown.js" },

        ],
        countdown: { defaultTime: 600, autostart: "no" }
      });

```

Then simply add an element into your presentation with a data-external or data-external-replace attribute.

## Example

```html
<section>
  <h1>5 minutes timer</h1>
  <countdown time="300" autostart="yes" />
</section>
```

## Configuration

The plugin can be configured with default values and settings in the initialize function:

```javascript
    countdown: { defaultTime: 600, autostart: "no" }
```

defaults are:

```javascript
{
  defaultTime: 300,
  autostart: "no"
}
```
