# CSS font weight
When browsers do not have a font file for an exact weight, they will render text using the most similar available font file. Exact algorithm [here](https://www.w3.org/TR/css-fonts-3/#font-matching-algorithm).

Moreover, when bold fonts are required and not available, browsers may resort to synthesizing them, i.e. creating them based on the available variants. This can be prevented by using the [font-synthesis](https://www.w3.org/TR/css-fonts-3/#propdef-font-synthesis) property.

Browsers such as Firefox and Chrome will synthesize the equivalent of a 700 font weight for all bold fonts (600 and above) when none are available. The other Admin sites use a weight of 900, so the actual rendered glyphs are the browser's synthesized 700 weight version.

This means that this text's appearance won't be consistent since it depends on the specific synthesis alorithm used by each browser.

# Resources:

[W3C font weight](https://www.w3.org/TR/css-fonts-3/#font-weight-prop)

[MDN font weight](https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight)

[CSS Tricks font weight](https://css-tricks.com/almanac/properties/f/font-weight/)
