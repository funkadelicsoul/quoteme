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