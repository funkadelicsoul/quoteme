/**
 * quoteme - Extract pieces of copy and add them as blockquotes to your page
 * @version v0.0.1
 * @link https://github.com/funkadelicsoul/quoteme
 * @license MIT
 */
;(function($) {
	'use strict'
function QuoteMe(regex) {
    this.regex = regex
}

QuoteMe.prototype._citation = function(citation) {
    if ( citation ) {

        if ( this.regex.exec(citation) ) {
            citation = citation.replace(this.regex, function(match, plainSubject, subjectGroup, subject, urlGroup, url) {
                var cite = ''

                if ( plainSubject ) {
                    cite = plainSubject
                } else {
                    subject = subject || url
                    cite = url ? '<a href="'+url+'">'+subject+'</a>' : subject
                }   

                return '<cite>'+cite+'</cite>'                     
            })
        } else {
            citation = '<cite>'+citation+'</cite>'
        }                    

        return '<footer>'+citation+'</footer>'
    }

    return ''
}

QuoteMe.prototype.setQuotes = function($parent) {
    var self    = this,
        quotes  = []

    $parent.find('.quoteme__select').each(function() {
        var $quote      = $(this),
            $html       = $('<div>'+$quote.html()+'</div>'),
            citation    = self._citation($quote.data('quotemeCitation')),
            quoteID     = $quote.data('quotemeBlockId'),
            blockquote  = ''

        $html.find('.quoteme__drop').replaceWith('[...]')

        blockquote = '<blockquote class="quoteme"><p class="quoteme__quote">'+$html.text()+'</p>'+citation+'</blockquote>'
        
        if ( quoteID ) {
            $('#'+quoteID).replaceWith(blockquote)
        } else {
            quotes.push(blockquote)
        }
    })

    quotes.length && $parent.after(quotes.join(''))
}
    $.fn.quoteme = function(options) {
        var defaults = {
            citationRegex:  /{{(.*?)(\[(.*?)\])?(\((.*?)\))?}}/,
            quoteWrapper:   'p'
        },
        opts = $.extend(defaults, options)

        this.each(function() {
            var $self   = $(this),
                qm      = new QuoteMe(opts.citationRegex)

            if ( $self.is(opts.quoteWrapper) ) {
                qm.setQuotes($self)
            } else {
                $self.find(opts.quoteWrapper).each(function() {
                    qm.setQuotes($(this))
                })
            }
        })        

        return this
    }

}(jQuery));