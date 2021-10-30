/* 
   This file is part of GHtmlMail. Copyright 2021, Thomas Kleinbauer.

   GHtmlMail is free software: you can redistribute it and/or modify
   it under the terms of the GNU General Public License as published by
   the Free Software Foundation, either version 3 of the License, or
   (at your option) any later version.

   GHtmlMail is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU General Public License for more details.

   You should have received a copy of the GNU General Public License
   along with GHtmlMail. If not, see <https://www.gnu.org/licenses/>.
*/
const url_prefix = "https://mail.google.com/mail/u/0/";
const html_marker = "h/";

function listener(details) {
    url = details.url

    if (url.startsWith(url_prefix)) { // redundant check
	url_postfix = url.substring(url_prefix.length, url.length);
	
	if (!url_postfix.startsWith(html_marker)) {
	    return {redirectUrl:url_prefix + html_marker + url_postfix};
	}
    }

    return {};
}

browser.webRequest.onBeforeRequest.addListener(
    listener,
    {urls: [url_prefix + "*"], types: ["main_frame"]},
    ["blocking"]
);
