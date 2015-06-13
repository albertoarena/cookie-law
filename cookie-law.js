/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // CommonJS
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    var pluses = /\+/g;

    function encode(s) {
        return config.raw ? s : encodeURIComponent(s);
    }

    function decode(s) {
        return config.raw ? s : decodeURIComponent(s);
    }

    function stringifyCookieValue(value) {
        return encode(config.json ? JSON.stringify(value) : String(value));
    }

    function parseCookieValue(s) {
        if (s.indexOf('"') === 0) {
            // This is a quoted cookie as according to RFC2068, unescape...
            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        }

        try {
            // Replace server-side written pluses with spaces.
            // If we can't decode the cookie, ignore it, it's unusable.
            // If we can't parse the cookie, ignore it, it's unusable.
            s = decodeURIComponent(s.replace(pluses, ' '));
            return config.json ? JSON.parse(s) : s;
        } catch (e) {
        }
    }

    function read(s, converter) {
        var value = config.raw ? s : parseCookieValue(s);
        return $.isFunction(converter) ? converter(value) : value;
    }

    var config = $.cookie = function (key, value, options) {

        // Write

        if (value !== undefined && !$.isFunction(value)) {
            options = $.extend({}, config.defaults, options);

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setTime(+t + days * 864e+5);
            }

            return (document.cookie = [
                encode(key), '=', stringifyCookieValue(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path ? '; path=' + options.path : '',
                options.domain ? '; domain=' + options.domain : '',
                options.secure ? '; secure' : ''
            ].join(''));
        }

        // Read

        var result = key ? undefined : {};

        // To prevent the for loop in the first place assign an empty array
        // in case there are no cookies at all. Also prevents odd result when
        // calling $.cookie().
        var cookies = document.cookie ? document.cookie.split('; ') : [];

        for (var i = 0, l = cookies.length; i < l; i++) {
            var parts = cookies[i].split('=');
            var name = decode(parts.shift());
            var cookie = parts.join('=');

            if (key && key === name) {
                // If second argument (value) is a function it's a converter...
                result = read(cookie, value);
                break;
            }

            // Prevent storing a cookie that we couldn't decode.
            if (!key && (cookie = read(cookie)) !== undefined) {
                result[name] = cookie;
            }
        }

        return result;
    };

    config.defaults = {};

    $.removeCookie = function (key, options) {
        if ($.cookie(key) === undefined) {
            return false;
        }

        // Must not alter options, thus extending a fresh object...
        $.cookie(key, '', $.extend({}, options, { expires: -1 }));
        return !$.cookie(key);
    };

}));

/**
 * Cookie Law Library
 * https://github.com/albertoarena/cookie-law
 * Requires jQuery
 * @author Alberto Arena <arena.alberto@gmail.com>
 * @version 0.1
 */
var cookieLawLibrary = (function($) {
    return function (options) {

        var languages = {
            'it': {
                bannerText: 'Questo sito utilizza cookies, anche di terze parti. Chiudendo questo banner acconsenti al ' +
                    'loro impiego in conformità alla nostra Cookie Policy.',
                buttonLabel: 'Chiudi',
                moreInfoLabel: 'Maggiori informazioni'
            },
            'en': {
                bannerText: 'We use cookies to enhance your visit to our site and to bring you advertisements that might interest you. ' +
                    'Read our Privacy and Cookies policy to find out more.',
                buttonLabel: 'Close',
                moreInfoLabel: 'Privacy Policy'
            }
        };

        var settings = {
            language: 'en',
            name: 'cookie-accept',
            cookieValid: 'accepted',
            bannerId: 'cookie-bar',
            bannerText: languages.en.bannerText,
            buttonClass: 'cookie-bar-enable',
            buttonLabel: languages.en.buttonLabel,
            moreInfoLabel: languages.en.moreInfoLabel,
            url: 'informativa-privacy.html',
            style: {
                bar: 'position: fixed; top: auto; bottom: 0; left: 0; width: 100%; z-index: 9999; background: rgba(0,0,0,.7); height: auto; line-height: 24px; color: #eeeeee; text-align: center; padding: 3px 0; ',
                paragraph: 'margin: 0; padding: 0; font-size: 11px; color: #fff;',
                link: 'color: #ffffff; display: inline-block; border-radius: 3px; text-decoration: none; padding: 0px 6px; margin-left: 8px; line-height: 16px; text-decoration: underline;',
                button: 'background: #ccc; color: #333; text-decoration: none;'
            },
            googleAnalytics: null,
            auto: true
        };

        var self = {
            init: function (options) {
                // Set language
                if (languages[options.language] !== undefined) {
                    settings = $.extend(settings, languages[options.language]);
                }
                settings = $.extend(settings, options);
                var style = '#' + settings.bannerId + ' { ' + settings.style.bar + '} ' +
                    '#' + settings.bannerId + ' p { ' + settings.style.paragraph + '} ' +
                    '#' + settings.bannerId + ' a { ' + settings.style.link + '} ' +
                    '#' + settings.bannerId + ' a.' + settings.buttonClass + ' { ' + settings.style.button + '}';
                $('head').append($('<style></style>').text(style));
                if (settings.auto) {
                    if (!self.check()) {
                        self.showBanner();
                    }
                }
                if ($.isArray(settings.googleAnalytics)) {
                    this.setGoogleAnalytics();
                }
                return this;
            },
            check: function () {
                return $.cookie(settings.name) === settings.cookieValid;
            },
            setGoogleAnalytics: function() {

                // Prepare Google Analytics
                window._gaq = window._gaq || [];
                for (var i = 0; i < settings.googleAnalytics.length; i++ ) {
                    window._gaq.push(settings.googleAnalytics[i]);
                    if (settings.googleAnalytics[i][0] == '_setAccount') {
                        // Disable GA - http://stackoverflow.com/a/10721214/279262
                        window['ga-disable-' + settings.googleAnalytics[i][1]] = (this.check() ? false : true);
                    }
                }

                // Load Google Analytics
                (function() {
                    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
                    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
                    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
                })();
            },
            setCookie: function() {
                $.cookie(settings.name, settings.cookieValid);
                return this;
            },
            showBanner: function () {
                $('body').append(
                    $('<div></div>')
                        .attr('id', settings.bannerId)
                        .append(
                            $('<p></p>')
                                .append(
                                    $('<span></span>').text(settings.bannerText)
                                )
                                .append(
                                    $('<a></a>')
                                        .attr('href', settings.url)
                                        .text(settings.moreInfoLabel)
                                        .click(function(e) {
                                            e.preventDefault();
                                            self.acceptCookie();
                                            window.location.href = $(this).attr('href');
                                        })
                                )
                                .append(
                                    $('<a></a>')
                                        .attr('href', '#')
                                        .addClass(settings.buttonClass)
                                        .text(settings.buttonLabel)
                                        .click(function (e) {
                                            e.preventDefault();
                                            self.acceptCookie();
                                            window.location.reload();
                                        })
                                )
                        )
                );
                return this;
            },
            acceptCookie: function() {
                self.setCookie();
                $('#' + settings.bannerId).remove();
                return this;
            }
        };
        self.init(options);
        return self;
    }
})(jQuery);