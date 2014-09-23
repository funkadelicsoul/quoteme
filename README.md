# quoteme

Extract pieces of copy and add them as blockquotes to your page. 

A class of `.quoteme__select` to select text for use as a quote. 

A child element with a class of `.quoteme__drop` to remove parts of the text from  the rendered blockquote, this gets replaced with: [...]

A `data` attribute is used to provide citation information.

By default quotes are added directly after the quote's parent wrapper, usually a `<p/>`.  A `data` attribute can be used to place the quote inside a blockquote placeholder with a corresponding ID anywhere on the page you decide to place it.

## Usage

`$('body').quoteme({options})`

## Config

### Options

#### quoteWrapper
Type: `String`
Default: `p`

Element wrapper that contains the content that will be quoted. In 99% of situations this will be a `<p/>` element.

#### citationRegex
Type: `Regular Expression`
Default: `/{{(.*?)(\[(.*?)\])?(\((.*?)\))?}}/`

The regular expression used to identify a quote's citation if added using the `data-quoteme-citation` attribute. The format follows the same format as a Markdown link.

Braces can be used to find the citation subject and/or reference url from within extra information. 

```
data-quoteme-citation="Just subject"
data-quoteme-citation="{{[Just Subject]}}"
data-quoteme-citation="{{[Subject](url)}}"
data-quoteme-citation="{{[Subject](url)}}"
data-quoteme-citation="{{(just_url)}}"
data-quoteme-citation="By {{[Subject](url)}}, 2014"
```

## Examples

### Basic

Search all `p` elements in the `body` and extract the quoted content.

```
$('body').quoteme();
```

### Use different quoteWrapper

Search all `span` elements in the `.speech` class and extract the quoted content.

```
$('.speech').quoteme({
	quoteWrapper: 'span'
})
```

### Change Regular Expression

Change format of citation template to: `{[subject]<url>}`

```
$('.speech').quoteme({
	citationRegex: /{(.*?)(\[(.*?)\])?(\<(.*?)\>)?}/
})
```
