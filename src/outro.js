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